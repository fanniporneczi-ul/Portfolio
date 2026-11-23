/** Renders a deterministic, decorative arrangement of reusable crayon stars. */
import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import star1Url from '../assets/star1.svg';
import star2Url from '../assets/star2.svg';
import star3Url from '../assets/star3.svg';

type StarName = 'star1' | 'star2' | 'star3';
type StarPalette = 'crimson' | 'cream';

interface StarProps {
  style?: CSSProperties;
}

interface InlineStarProps extends StarProps {
  variant: StarName;
}

interface GeneratedStar {
  shape: StarName;
  centerX: number;
  centerY: number;
  clearanceRadius: number;
  style: CSSProperties;
}

interface CanvasSize {
  width: number;
  height: number;
}

const starNames: StarName[] = ['star1', 'star2', 'star3'];
const starAspectRatios: Record<StarName, number> = {
  star1: 818 / 656,
  star2: 1056 / 960,
  star3: 1000 / 1194,
};

const starAssets: Record<StarName, { url: string; viewBox: string }> = {
  star1: { url: star1Url, viewBox: '0 0 656 818' },
  star2: { url: star2Url, viewBox: '0 0 960 1056' },
  star3: { url: star3Url, viewBox: '0 0 1194 1000' },
};

const paletteColors: Record<StarPalette, readonly [string, string]> = {
  crimson: ['#F3EAE0', '#BFD1E5'],
  cream: ['#6B141A', '#6E93B8'],
};

function InlineStar({ style, variant }: InlineStarProps) {
  const { url, viewBox } = starAssets[variant];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={style}
      viewBox={viewBox}
    >
      <use href={`${url}#${variant}`} />
    </svg>
  );
}

export function Star1(props: StarProps) {
  return <InlineStar variant="star1" {...props} />;
}

export function Star2(props: StarProps) {
  return <InlineStar variant="star2" {...props} />;
}

export function Star3(props: StarProps) {
  return <InlineStar variant="star3" {...props} />;
}

const starComponents = { star1: Star1, star2: Star2, star3: Star3 };

function createSeededRandom(seed: string) {
  let state = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    state ^= seed.charCodeAt(index);
    state = Math.imul(state, 16777619);
  }

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(values: T[], random: () => number) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
}

function createStarLayout(
  count: number,
  seed: string,
  palette: StarPalette,
  edgeOnly: boolean,
  canvasSize: CanvasSize,
): GeneratedStar[] {
  const random = createSeededRandom(seed);
  const colors = paletteColors[palette];
  const horizontalBands = Array.from({ length: count }, (_, index) => index);
  const edgeSides = Array.from({ length: count }, (_, index) => index % 2 === 0);

  shuffle(horizontalBands, random);
  shuffle(edgeSides, random);

  const stars: GeneratedStar[] = [];
  const maxAttempts = 50;

  for (let index = 0; index < count; index += 1) {
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const top =
        attempt === 0
          ? 2 + ((index + random()) / count) * 96
          : 2 + random() * 96;
      const isLeftEdge = edgeSides[index] ?? index % 2 === 0;
      const left = edgeOnly
        ? isLeftEdge
          ? 1 + random() * 15
          : 82 + random() * 15
        : attempt === 0
          ? 2 + ((horizontalBands[index] + random()) / count) * 94
          : 2 + random() * 94;
      const size = 12 + Math.pow(random(), 2.4) * 103;
      const rotation = random() * 360;
      const opacity = 0.08 + Math.pow(random(), 2.2) * 0.47;
      const color = colors[random() < 0.5 ? 0 : 1];
      const shape = starNames[Math.floor(random() * starNames.length)] ?? 'star1';
      const starHeight = size * starAspectRatios[shape];
      const centerX = (left / 100) * canvasSize.width + size / 2;
      const centerY = (top / 100) * canvasSize.height + starHeight / 2;
      const clearanceRadius = Math.hypot(size, starHeight) / 2 + 4;
      const overlapsExistingStar = stars.some((star) => {
        const horizontalDistance = centerX - star.centerX;
        const verticalDistance = centerY - star.centerY;
        return (
          Math.hypot(horizontalDistance, verticalDistance) <
          clearanceRadius + star.clearanceRadius
        );
      });

      if (overlapsExistingStar) {
        continue;
      }

      stars.push({
        shape,
        centerX,
        centerY,
        clearanceRadius,
        style: {
          position: 'absolute',
          top: `${top.toFixed(2)}%`,
          left: `${left.toFixed(2)}%`,
          width: `${size.toFixed(1)}px`,
          height: 'auto',
          transform: `rotate(${rotation.toFixed(1)}deg)`,
          opacity,
          color,
        },
      });
      break;
    }
  }

  return stars;
}

interface CrayonStarsProps {
  count?: number;
  seed?: string;
  variant?: StarPalette;
  edgeOnly?: boolean;
}

function CrayonStars({
  count = 20,
  seed = 'default',
  variant = 'crimson',
  edgeOnly = false,
}: CrayonStarsProps) {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 20;
  const layerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize | null>(null);

  useLayoutEffect(() => {
    const parent = layerRef.current?.parentElement;
    if (!parent) return;

    const updateCanvasSize = () => {
      const { width, height } = parent.getBoundingClientRect();
      setCanvasSize((current) =>
        current?.width === width && current.height === height ? current : { width, height },
      );
    };

    updateCanvasSize();
    const observer = new ResizeObserver(updateCanvasSize);
    observer.observe(parent);

    return () => observer.disconnect();
  }, []);

  const stars = useMemo(
    () =>
      canvasSize && canvasSize.width > 0 && canvasSize.height > 0
        ? createStarLayout(safeCount, seed, variant, edgeOnly, canvasSize)
        : [],
    [safeCount, seed, variant, edgeOnly, canvasSize],
  );

  return (
    <div aria-hidden="true" className="crayon-stars-layer" ref={layerRef}>
      {stars.map(({ shape, style }, index) => {
        const Star = starComponents[shape];
        return <Star key={`${seed}-${index}`} style={style} />;
      })}
    </div>
  );
}

export default CrayonStars;
