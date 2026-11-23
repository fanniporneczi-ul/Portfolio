/** Renders project cards plus expandable details, blog dialogs, and photo lightboxes. */
import { useEffect, useRef, useState } from 'react';
import CrayonStars from '../CrayonStars';

import escapeRoomImg1 from '../../assets/EscapeRoom.png';
import escapeRoomImg2 from '../../assets/example_room_diagram_eng.svg';
import escapeRoomImg3 from '../../assets/sequence_diagram_roomgeneratormodel_eng.svg';
import hardwareProgrammingImg1 from '../../assets/arduino.gif';
import hardwareProgrammingImg2 from '../../assets/HardwareProgramming.png';
import hardwareProgrammingImg3 from '../../assets/code.png';
import spatialDesignImg1 from '../../assets/3d_1.png';
import spatialDesignImg2 from '../../assets/3d_2.png';
import wearableDesignImg1 from '../../assets/DSC_0014.jpg';
import wearableDesignImg2 from '../../assets/bag_rembg.png';
import wearableDesignImg3 from '../../assets/bag_inside.jpg';
import physicalPrototypingImg1 from '../../assets/flower_1.jpg';
import physicalPrototypingImg2 from '../../assets/flower_2.png';
import physicalPrototypingImg3 from '../../assets/ivy_1.jpg';
import animationVideo from '../../assets/Adventures_of_a_city_pigeon.mp4';
import animationImg1 from '../../assets/pigeon_shot1.png';
import animationImg2 from '../../assets/rigging_pigeon_front.png';
import animationImg3 from '../../assets/shot3_initial_setup.png';
import cheetahPerfumeVideo from '../../assets/Cheetah_perfume.mp4';
import commercialImg1 from '../../assets/filming1.jpg';
import commercialImg2 from '../../assets/filming2.jpg';
import commercialImg3 from '../../assets/title_card.jpg';
import headshotThumb from '../../assets/Headshot_thumbnail_edited.jpg';
import headshotFull from '../../assets/Headshot_full_edited.jpg';
import passionThumb from '../../assets/Passion_shot_thumbnail_edited.jpg';
import passionFull from '../../assets/Passion_shot_full_edited.jpg';
import aestheticThumb from '../../assets/Aesthetic_shot_thumbnail_edited.jpg';
import aestheticFull from '../../assets/Aesthetic_shot_full_edited.jpg';

interface Project {
  id: string;
  label: string;
  title: string;
  image: string;
  imageAlt: string;
  video?: string;
  videoPoster?: string;
  summary: string;
  details: string[];
  tools: string[];
  gallery?: { src: string; alt: string}[];
  blogs?: ProjectBlog[];
}

interface ProjectBlog {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  video?: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
    thumbnail?: {
      thumbSrc: string;
      fullSrc: string;
      alt: string;
      specs?: string;
    };
  }[];
}

interface LightboxImage {
  src: string;
  alt: string;
}

// Project content and media stay in one typed collection for consistent cards.
const projects: Project[] = [
  {
    id: 'project-1',
    label: 'PROJECT 01',
    title: 'Escape Room',
    image: escapeRoomImg1,
    imageAlt: 'Main view of the escape room',
    summary: 'A Computer Science BSc thesis project.',
    details: [
      'A multiplayer educational escape room in Unity aimed at making learning fun for children and easily manageable for teachers.',
      'The core engineering challenge was developing a dynamic clue generation system to guarantee that every playthrough results in a unique room configuration. The accompanying documentation details the procedural logic used to solve this problem, showcasing my expertise in scalable and well-documented game design.',
    ],
    tools: ['C#', 'Unity', 'Github'],
    gallery: [
      {
        src: escapeRoomImg2,
        alt: 'Clue dependency graph',
      },
      {
        src: escapeRoomImg3,
        alt: 'Room generation diagram',
      },
    ],
  },
  {
    id: 'project-2',
    label: 'PROJECT 02',
    title: 'Hardware Programming',
    image: hardwareProgrammingImg1,
    imageAlt: 'HTML interface refreshing upon user input',
    summary: 'An interactive environmental monitor bridging physical hardware with a live web interface.',
    details: [
      'Co-developed during an international Erasmus exchange in Italy, this interactive environmental monitor was my introduction to Arduino. Having no prior experience with the platform, I tackled the challenge autodidactically, learning from scratch how to bridge physical hardware with software.',
      'The project features a local web interface to display live readings, paired with a Python script for data visualization. My role was designing the circuit layout and developing the Arduino firmware to handle sensor readings, user input and network requests.',
    ],
    tools: ['Arduino', 'C++', 'Python'],
    gallery: [
      {
        src: hardwareProgrammingImg2,
        alt: 'Materials used for building the hardware',
      },
      {
        src: hardwareProgrammingImg3,
        alt: 'Handling rotary encoder input',
      },
    ],
  },
  {
    id: 'project-3',
    label: 'PROJECT 03',
    title: 'Spatial Design',
    image: spatialDesignImg1,
    imageAlt: '3D architectural model',
    summary: '3D architectural models translated from 2D cross-sections for micro-scale 3D printing.',
    details: [
      'A collection of 3D architectural models developed in Tinkercad, translated from 2D architectural cross-sections provided by an architecture student. The primary challenge of this project was the demand for extreme precision, because the final models were destined for micro-scale 3D printing, every single millimeter was critical.',
      'This project highlights my ability to interpret technical reference material and construct accurate 3D geometry that survives the transition from screen to physical object.',
    ],
    tools: ['Tinkercad', '3D Modeling'],
    gallery: [
      {
        src: spatialDesignImg2,
        alt: '3D architectural model',
      }
    ],
  },
  {
    id: 'project-4',
    label: 'PROJECT 04',
    title: 'Wearable Design',
    image: wearableDesignImg1,
    imageAlt: 'Everyday usage of the goose bag',
    summary: 'A custom-crocheted goose bag self-drafted and prototyped from a single reference photo.',
    details: [
      'A custom-crocheted goose bag self-drafted and prototyped entirely from a single reference photo. With no existing pattern to follow, I reverse-engineered the exterior design to bring the concept to life as a fully functional physical product. The accessory also features a custom interior lining with organizational pockets and a key clip.',
      'The accompanying photos highlight my crochet fabrication and pattern drafting skills.',
    ],
    tools: ['Pattern Drafting', 'Crochet', 'Prototyping'],
    gallery: [
      {
        src: wearableDesignImg2,
        alt: 'Exterior view of the goose bag',
      },
      {
        src: wearableDesignImg3,
        alt: 'Interior view of the goose bag',
      },
    ],
  },
  {
    id: 'project-5',
    label: 'PROJECT 05',
    title: 'Physical Prototyping',
    image: physicalPrototypingImg1,
    imageAlt: 'Beauty and the Beast flower',
    summary: 'Hand-crafted physical props translating animated concepts and natural forms into tangible objects.',
    details: [
      'This collection of hand-crafted physical props, created as personalised gifts, translates both animated concepts and natural forms into tangible objects. The central challenge was capturing the distinct character of animated flowers and mimicking the organic complexity of real ivy.',
      'The accompanying pieces incorporate physical scaling and material state changes (such as fluorescent beads that react to light and darkness), demonstrating my ability to craft detailed, responsive physical models.',
    ],
    tools: ['Prototyping', 'Crochet'],
    gallery: [
      {
        src: physicalPrototypingImg2,
        alt: 'Tangled glow-in-the-dark flower',
      },
      {
        src: physicalPrototypingImg3,
        alt: 'Ivy plant',
      },
    ],
  },
  {
    id: 'project-6',
    label: 'PROJECT 06',
    title: 'Adventures of a City Pigeon',
    image: animationImg1,
    imageAlt: 'First shot of the Adventures of a City Pigeon animation',
    video: animationVideo,
    videoPoster: animationImg1,
    summary: "A comedic 3D animated short following a city pigeon from a sunflower-seed feast to an unexpected office window crash.",
    details: [
      "Created for a 3D modelling and animation module, Adventures of a City Pigeon is a dialogue-free animated short told across three shots: pecking at sunflower seeds from beneath a glass tabletop, flying above a city skyline, and smashing flat against an office window before sliding down the glass.",
      "I modeled and rigged the pigeon from scratch in Maya, setting up IK handles for the legs, FK controls for the head, neck, wings, and tail, and a lattice deformer to flatten the bird against the glass. For the final look, I swapped the materials to aiToon shaders with dark outlines, rendered the full HD frame sequences in Arnold, and put the final video together with sound effects in DaVinci Resolve.",
    ],
    tools: ['Maya', 'DaVinci Resolve'],
    gallery: [
      {
        src: animationImg2,
        alt: 'Rigging the pigeon model in Maya',
      },
      {
        src: animationImg3,
        alt: 'Setup for the final shot of the animation',
      },
    ],
  },
  {
    id: 'project-7',
    label: 'PROJECT 07',
    title: 'Cheetah Perfume Commercial',
    image: physicalPrototypingImg1,
    imageAlt: 'Cheetah perfume commercial',
    video: cheetahPerfumeVideo,
    videoPoster: commercialImg3,
    summary:
      "A co-produced comedic perfume commercial following a wife’s suspicion over an unfamiliar scent.",
    details: [
      "Co-developed with a six-person team for an interactive media module at the University of Limerick, this commercial for Cheetah perfume builds a dramatic yet comedic story around a wife’s growing suspicion over an unfamiliar scent on her husband. Structured around a setup, investigation, and reveal, the ad turns a simple misunderstanding into a playful product pitch ending with the tagline, “Cheetah for her, makes your husband go wild.”",
      "As scriptwriter, I organized our brainstorming ideas into a structured Two-Column AV script with numbered shots, audio cues, and all assignment requirements. During filming across dorm, classroom, and campus locations, I tracked every shot against the script and storyboard, and later reviewed the rough cut to suggest trims so the final video stayed under the 120-second limit.",
    ],
    tools: ['Scriptwriting', 'Video Production'],
    gallery: [
      {
        src: commercialImg1,
        alt: 'Filming inside',
      },
      {
        src: commercialImg2,
        alt: 'Filming outside',
      },
    ],
    blogs: [
      {
        id: 'group-blog',
        label: 'Group blog',
        title: 'Perfume Advertisement Videography — Group Production Report',
        subtitle: 'University of Limerick',
        video: cheetahPerfumeVideo,
        sections: [
          {
            heading: 'Group Members',
            paragraphs: [
              'Grace Muthoni Kamau, Fanni Pörneczi, Lena Maria Semmler, Aaron King, Atharva Predeshi, Rohith Sunil',
            ],
          },
          {
            heading: 'Concept and Purpose',
            paragraphs: [
              'We developed an advertisement for Cheetah perfume around a wife who notices an unfamiliar scent on her husband and becomes suspicious. The idea began with a perfume that a group member could provide. We included humour and built the story around the wife misunderstanding her husband’s interest in the perfume. The scent causes the suspicion and eventually explains his behaviour. Our aim was to communicate the perfume’s appeal through the characters’ reactions.',
              'We chose a home as a main location because it suited the relationship story and gave us access to furniture, props and space for filming. Working with resources already available to the group made the concept practical and affordable to produce.',
            ],
          },
          {
            heading: 'Script and Storyboard',
            paragraphs: [
              'We organised the script around a setup, an investigation and a reveal. The greeting introduces the unfamiliar scent, the investigation develops the wife’s suspicion, and the ending reveals the husband’s interest in the perfume. It allowed us to build the misunderstanding before explaining it through the product.',
              'The storyboard translates that structure into framing and action. The closer view of the wife noticing the scent directs attention to her expression. Later, the view of the package from her perspective gives the audience access to the clue she sees. The planned ending shows the husband applying the perfume, followed by the wife taking it and a product shot. These choices connect the story back to the item being advertised.',
              'The script recorded the actions and audio, and the storyboard gave us a visual reference during production. We returned to it when part of the sequence seemed unclear thus helped us discuss how adjacent scenes connected.',
            ],
          },
          {
            heading: 'Camera and Lighting',
            paragraphs: [
              'We used an iPhone 16 Pro and mainly selected the 2x view to frame the subjects more tightly and reduce distractions around them. We also experimented with tighter product details. The filming approach combined wider compositions to establish the setting with closer views to draw attention to the perfume and its branding.',
              'We used a tripod for several shots to keep the framing steady, particularly when working with tighter views. The Blackmagic Camera app allowed us to adjust exposure and shutter speed for different lighting conditions. For outdoor filming, we preferred warmer, softer natural light. Indoors, we checked that the subjects were sufficiently illuminated and used additional lighting when needed. These decisions supported the dramatic, slightly mysterious mood described in our shooting plan while keeping the people and product visible.',
            ],
          },
          {
            heading: 'Editing and Audio',
            paragraphs: [
              'Before editing began, we discussed using sharp cuts instead of extended transitions or fades between scenes. We felt that elaborate transitions would add time without helping explain the story. The initial rough cut was too long, so we reviewed the footage and removed pauses, still frames and sequences that did not communicate their intended meaning clearly.',
              'This review exposed a difference between knowing the story and seeing it communicated on screen. A scene could make sense to us because we knew its purpose yet still be unclear to someone watching. We therefore prioritised the actions needed to reduce the misunderstanding, painting as clear of a picture as possible without filler.',
              'During editing we also added in the musical pieces to better communicate the feelings and emotions of the story. We wanted something that had a bit of a tempo to it during the investigation scenes to give the audience a sense of drama, but then ending with a soft melody upon the reveal of the husband using the perfume on himself. This really added to the story by helping the audience understand what they were supposed to get from each scene. The final addition was the audio clip with our tagline “Cheetah for her, makes your husband go wild” to advertise the product but also add a bit of a comedic aspect to it since the husband went wild in the sense that he used the perfume himself.',
            ],
          },
          {
            heading: 'Final Review',
            paragraphs: [
              'The main lesson from the production was that a shared idea still needs to be tested through performance, framing and editing. Reviewing the storyboard during filming and questioning the rough cut helped us identify where our intentions were not clear enough. Having audio and music decided upon ahead of time would also be helpful as we could use it during our filming to assist with pacing. A fuller walkthrough before recording would help us resolve those problems earlier in a future production and lessen the strain on the editor.',
            ],
          },
          {
            heading: 'References',
            paragraphs: ['Music references and links attached separately.'],
          },
        ],
      },
      {
        id: 'personal-blog',
        label: 'Personal blog',
        title: 'Personal Blog on Video Production',
        subtitle: 'University of Limerick',
        sections: [
          {
            heading: 'Pre-production',
            paragraphs: [
              'We got together for a brainstorming session on Wednesday during Week 8 to come up with a topic for our commercial. We had already decided we wanted to create a perfume ad, and we divided the roles among us: Aaron as director/actor, Atharva as cameraman, Rohith as editor, Mutoni as actor, Lena as storyboard artist, and me as scriptwriter. During this session, we quickly agreed that we wanted a funny, dramatic story to make the ad memorable. After a while, Aaron pitched the idea of the “not cheating husband,” and everyone started throwing in ideas to bring the story to life. We also decided to ask Aaron’s girlfriend, Minoucha, to join us as an actor. We wrote down the rough timeline for our story and went home.',
              'Since my role was writing the script, I went home and started organizing our ideas into numbered shots with video and audio for each one. I looked up commercial script formats online and followed a standard Two-Column AV layout. At this stage, I also put down some initial suggestions for music and sound effects, and I made sure to include every relevant requirement from the rubric directly in the script (like the 3-second title, corner ident, credits, references, and 1-second fade-out) to make the editor’s job easier later on. Once I finished the first draft, I shared it with the group for feedback.',
              'We met for a second brainstorming session on Monday during Week 9, where we explored a couple of different endings and settled on the exact timeline we wanted. We also worked out what days to film so everyone could make it, settling on Tuesday afternoon, Wednesday afternoon, and Thursday morning. We decided to shoot all the indoor scenes in Mutoni’s dorm in Cappavilla on Tuesday, the hero shot after class on Wednesday at the university, and the outdoor and hallway shots around the Computer Science building on Thursday morning. After our discussion, I went home, updated the script with all the changes, and shared it with the group.',
            ],
          },
          {
            heading: 'During Production',
            paragraphs: [
              'On Tuesday, we met at Mutoni’s dorm around 3:00 PM, started filming around 3:30 PM, and finished around 5:30 PM. In those two hours, we managed to get all the indoor scenes we needed (Scenes 1–2 and 8–18). During the first hour, we didn’t use any extra lighting because there was still plenty of sunlight and the indoor lights were enough. Toward the end, it started getting darker outside, so we used a ring light for the last few shots. On set, I helped set up the scenes, but my main focus was making sure we didn’t skip any shots and followed the script and storyboard. I kept track of everything on my iPad and sent a progress update to the group chat after getting home.',
              'On Wednesday around 12:00 PM, we stayed for about 20–30 minutes after class to film the hero shot (Scene 19). We tested a few different backgrounds and lighting angles before settling on the final shot.',
              'On Thursday morning, we started filming around 10:15 AM and finished around 11:00 AM, wrapping up all the remaining scenes at the university (Scenes 3–7) both outside the building and inside our classroom. Once we finished, Lena uploaded all the clips to our shared Drive so Rohith could start editing.',
            ],
          },
          {
            heading: 'Post-production',
            paragraphs: [
              'I didn’t have as many tasks during post-production since my main work was done before filming. After the first rough cut came back over the 120-second limit, I went through it and suggested specific trims and double-checked that all the assignment requirements were included. Rohith edited the video and added the music and sound effects, while Lena created the graphical ident, and then our video was ready to submit.',
            ],
          },
          {
            heading: 'Reflection',
            paragraphs: [
              'We started filming a week later than suggested, so I was a bit worried about leaving enough time for our editor, though he managed to finish everything on time. I think this was a really good task for me since I am very organized, which helped a lot when structuring the script and keeping track of all our shots during filming. Overall, I think our group worked really well together, got on the same page easily, and actually had fun during filming rather than treating it like just another assignment.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'project-8',
    label: 'PROJECT 08',
    title: 'Photography Series',
    image: headshotThumb,
    imageAlt: 'Edited headshot portrait sitting on a wooden table with a laptop',
    summary:
      "A three-photo series exploring manual camera settings, natural lighting, and editing across a headshot, an aesthetic shot and a passion shot.",
    tools: ["Photo Editing", "Manual Camera Settings"],
    details: [
      "Created for an interactive media module, this assignment features three edited photographs: an informal headshot aimed at EdTech roles, a top-down breakfast shot in bright morning sunlight, and an organized flat-lay of my crochet tools and yarn.",
      "Depending on the weather, I shot with a Panasonic Lumix DMC-TZ40 camera and the ReLens phone app to manually set the ISO, shutter speed, and aperture for each scene. Afterward, I edited all three images with S-curves, cropping, object cleanup, and warmth and sharpening adjustments to give them a clean, consistent look.",
    ],
    gallery: [
      {
        src: aestheticThumb,
        alt: 'Aesthetic breakfast flat-lay photograph',
      },
      {
        src: passionThumb,
        alt: 'Crochet tools and yarn flat-lay photograph',
      },
    ],
    blogs: [
      {
        id: 'photography-blog',
        label: 'Photography blog',
        title: 'Photography Assignment',
        subtitle: 'University of Limerick',
        sections: [
          {
            heading: 'Device Choice',
            paragraphs: [
              'For my aesthetic shot I used my pocket-sized travel camera (Panasonic Lumix DMC-TZ40) because the lighting was amazing that day and the morning sun shining through my kitchen window was very bright.',
              'Unfortunately, the weather turned gloomy after that and since my camera requires immaculate lighting to take good quality pictures, I made the decision to switch to my phone for the passion and headshot. On my phone there is only one physical aperture setting so I could not control the aperture manually, but I was able to download an application called ReLens which allows you to control the speed and ISO while you are taking the picture and lets you apply the aperture setting after taking the picture.',
              'The only disadvantage of ReLens was that it does leave a watermark, that you can see on the original pictures, but I removed these while editing.',
            ],
          },
          {
            heading: 'Camera Settings',
            paragraphs: [
              'Since both my headshot and my passion shot were taken on a gloomy day, my priority was maximizing the light. For both of these shots I set the ISO to 1600 and lowered the speed (since both of them are still images) to let in as much light as possible. For the passion shot I chose 1/100, to avoid blurriness from my hand shaking. For the headshot I chose 1/60 because the phone was stable, I was staying extremely still and this allowed for more light to be let in. For the passion shot I set the aperture to f/8, because I wanted the head of the hook and the stitches around it to be very sharp because those are the focus of the image. For the headshot I set the aperture to f/4, because I wanted the focus to be more on me and less on the background.',
              'For my aesthetic shot I had excellent lighting so I set the ISO to 100 and the speed to 1/400 to balance out the sunlight mainly on the yogurt. I set the aperture to f/5 to keep all the objects sharp but make the background a bit blurry towards the edges.',
            ],
          },
          {
            heading: 'Editing',
            paragraphs: [
              'I started with applying a bit of an S-curve to all my pictures to balance out the light and shadows.',
              'For the headshot I cropped the picture to make the framing better (it was necessary because I took this by myself) and remove the legs of the table that were slightly visible. After that I removed the outlets that were visible behind the table, smoothed out a couple imperfections/marks on the wall and my face. Then I increased the exposure and sharpened the picture a bit. Finally, I slightly increased the temperature to make it look more warm.',
              'For the aesthetic shot I cropped the picture to have the same 4:3 ratio as all the others. Then I removed some imperfections from the background, increased the saturation a bit, to make it look warmer and sharpened the picture a bit to make the cereal more defined.',
              'For the passion shot I removed the watermark, removed some marks from the pin cushion and chair. After that I increased the saturation a bit to make it warmer and increased the exposure to brighten the image.',
            ],
          },
          {
            heading: 'Picture Choices — Headshot',
            paragraphs: [
              'For my headshot I chose this setup because my goal is to land a job in developing tools for EdTech or even teaching in that field. In my opinion, a regular passport type shot would lack the creativity, warmth and approachability this job requires, so I chose a different perspective. The pose and the fact that I am sitting on a table establish accessibility and an informal teaching style, while the collared shirt, glasses, shoes and laptop establish academic and technical credibility. I think this picture shows that I am all for unconventional, new, fun ways of learning and thinking outside the box while maintaining the fact that I am an educated professional.',
            ],
            thumbnail: {
              thumbSrc: headshotThumb,
              fullSrc: headshotFull,
              alt: 'Edited headshot portrait sitting on a wooden table with a laptop',
              specs: 'Aperture: f/4 · Shutter Speed: 1/60 · ISO: 1600',
            },
          },
          {
            heading: 'Picture Choices — Aesthetic Shot',
            paragraphs: [
              'For my aesthetic shot, I chose this top-down setup because it looks straight off Pinterest, with the dramatic light and shadow making the food feel almost like a still from a film set, instantly making me crave this breakfast. The sharp morning shadows create a really nice contrast against the round bowl and mug, and I love how the different textures of the breakfast, the smooth yogurt, the crunchy cereal, and the juicy apple slices come together into a satisfying composition.',
            ],
            thumbnail: {
              thumbSrc: aestheticThumb,
              fullSrc: aestheticFull,
              alt: 'Edited top-down aesthetic shot of yogurt with apples, cereal, and coffee in morning sunlight',
              specs: 'Aperture: f/5 · Shutter Speed: 1/400 · ISO: 100',
            },
          },
          {
            heading: 'Picture Choices — Passion Shot',
            paragraphs: [
              'For my passion shot I chose to take a picture of all my crochet tools, the only ball of yarn I currently have with me and the half finished hat I am currently making with it for my sister. I placed all these in my cosy chair neatly to capture my hobby in a clean and organized way because it is rarely seen like that.',
            ],
            thumbnail: {
              thumbSrc: passionThumb,
              fullSrc: passionFull,
              alt: 'Edited flat-lay passion shot of blue yarn, crochet hook, sunflower pincushion, measuring tape, and scissors',
              specs: 'Aperture: f/8 · Shutter Speed: 1/100 · ISO: 1600',
            },
          },
        ],
      },
    ],
  },
];

function ProjectPreview({ image, imageAlt }: Pick<Project, 'image' | 'imageAlt'>) {
  return (
    <div className="project-preview">
      <img src={image} alt={imageAlt} />
    </div>
  );
}

function ProjectVideo({
  title,
  video,
  videoPoster,
}: Pick<Project, 'title' | 'video' | 'videoPoster'>) {
  if (!video) {
    return null;
  }

  return (
    <div className="project-video-frame">
      <video
        aria-label={`${title} video`}
        className="project-video"
        controls
        playsInline
        poster={videoPoster}
        preload="metadata"
        src={video}
      />
    </div>
  );
}

interface ActiveBlog {
  blog: ProjectBlog;
  projectTitle: string;
}

function Projects() {
  // Expanded project IDs are kept in a Set so multiple cards can stay open.
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [activeBlog, setActiveBlog] = useState<ActiveBlog | null>(null);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  // Refs preserve focus as users open and close the nested dialogs.
  const blogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const blogDialogRef = useRef<HTMLElement | null>(null);
  const blogCloseRef = useRef<HTMLButtonElement | null>(null);
  const lightboxImageRef = useRef<LightboxImage | null>(null);
  const lightboxDialogRef = useRef<HTMLDivElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Move keyboard focus into the lightbox and return it to its thumbnail on close.
    if (lightboxImage) {
      lightboxCloseRef.current?.focus();
    } else {
      lightboxTriggerRef.current?.focus();
    }
  }, [lightboxImage]);

  useEffect(() => {
    if (!activeBlog) {
      return;
    }

    // Keep the page behind the blog still and focus the dialog's close control.
    const previousBodyOverflow = document.body.style.overflow;
    blogCloseRef.current?.focus();
    document.body.style.overflow = 'hidden';

    function handleDialogKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        // Escape closes only the topmost layer when a photo lightbox is open.
        if (lightboxImageRef.current) {
          lightboxImageRef.current = null;
          setLightboxImage(null);
        } else {
          setActiveBlog(null);
        }
        return;
      }

      const activeDialog = lightboxImageRef.current
        ? lightboxDialogRef.current
        : blogDialogRef.current;

      if (event.key !== 'Tab' || !activeDialog) {
        return;
      }

      const focusableElements = Array.from(
        activeDialog.querySelectorAll<HTMLElement>(
          'button, a[href], video, [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Wrap Tab at the dialog boundaries instead of moving focus behind it.
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener('keydown', handleDialogKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleDialogKeyDown);
      // Restore focus to the button that opened the blog.
      blogTriggerRef.current?.focus();
    };
  }, [activeBlog]);

  function toggleExpanded(id: string) {
    // Clone the Set so React observes each expand/collapse update.
    setExpandedIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  return (
    <main className="page page--crimson projects-page">
      {/* Decorative project-page stars sit behind the project content. */}
      <CrayonStars count={50} seed="projects" variant="crimson" edgeOnly />
      <div className="page-content projects-content">
        <h1 className="eyebrow">SELECTED WORK</h1>
        {/* Each data entry becomes a card with optional media and gallery content. */}
        <div className="projects-list">
          {projects.map((project) => {
            const isExpanded = expandedIds.has(project.id);
            const detailsId = `${project.id}-details`;
            const galleryId = `${project.id}-gallery`;
            const controlledIds = project.gallery?.length
              ? `${detailsId} ${galleryId}`
              : detailsId;

            return (
              <article className="project-card" key={project.id}>
                <div className="project-media">
                  {project.video ? (
                    <ProjectVideo
                      title={project.title}
                      video={project.video}
                      videoPoster={project.videoPoster}
                    />
                  ) : (
                    <ProjectPreview image={project.image} imageAlt={project.imageAlt} />
                  )}
                  {/* Galleries share the card's expansion state. */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div
                      aria-hidden={!isExpanded}
                      className={`project-details${isExpanded ? ' is-expanded' : ''}`}
                      id={galleryId}
                    >
                      <div className="project-details__inner">
                        <div className="project-gallery">
                          {project.gallery.map((image) => (
                            <div
                              className="project-gallery__item"
                              key={image.alt}
                            >
                              <img src={image.src} alt={image.alt} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <p className="eyebrow">{project.label}</p>
                  <h2 className="page-title">{project.title}</h2>
                  <p className="page-copy">{project.summary}</p>
                  <p
                    aria-label={`Skills: ${project.tools.join(', ')}`}
                    className="tools-used"
                  >
                    <span>Skills:</span>
                    {project.tools.map((tool, index) => (
                      <span className="project-tool" key={tool}>
                        <span className="tool-badge">{tool}</span>
                        {index < project.tools.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </p>
                  {/* The same per-card state reveals the written project details. */}
                  <div
                    aria-hidden={!isExpanded}
                    className={`project-details${isExpanded ? ' is-expanded' : ''}`}
                    id={detailsId}
                  >
                    <div className="project-details__inner">
                      {project.details.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {project.blogs && project.blogs.length > 0 && (
                    <div aria-label="Project blogs" className="project-blog-links">
                      {project.blogs.map((blog) => (
                        <button
                          aria-haspopup="dialog"
                          className="project-blog-link"
                          key={blog.id}
                          onClick={(event) => {
                            // Remember the opener so the modal can return keyboard focus.
                            blogTriggerRef.current = event.currentTarget;
                            setActiveBlog({ blog, projectTitle: project.title });
                          }}
                          type="button"
                        >
                          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5zM4 5.5v12M8 7h8M8 11h8" />
                          </svg>
                          {blog.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    aria-controls={controlledIds}
                    aria-expanded={isExpanded}
                    className="project-toggle"
                    onClick={() => toggleExpanded(project.id)}
                    type="button"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                    <svg
                      aria-hidden="true"
                      className={`project-toggle__chevron${isExpanded ? ' is-expanded' : ''}`}
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {/* The blog dialog overlays the project list while retaining its scroll position. */}
      {activeBlog && (
        <div
          className="blog-modal-backdrop"
          onClick={(event) => {
            // Only a click directly on the backdrop dismisses the dialog.
            if (event.target === event.currentTarget) {
              setActiveBlog(null);
            }
          }}
        >
          <section
            aria-labelledby={`${activeBlog.blog.id}-title`}
            aria-modal="true"
            className="blog-modal"
            ref={blogDialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <div className="blog-modal__body">
              {/* This control complements Escape and backdrop dismissal. */}
              <button
                aria-label="Close blog"
                className="blog-modal__close"
                onClick={() => setActiveBlog(null)}
                ref={blogCloseRef}
                type="button"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                  <path d="m3 3 10 10M13 3 3 13" />
                </svg>
              </button>
              <div className="blog-modal__content">
                <p className="eyebrow">{activeBlog.blog.label} · {activeBlog.projectTitle}</p>
                <h2 className="blog-modal__title" id={`${activeBlog.blog.id}-title`}>
                  {activeBlog.blog.title}
                </h2>
                {activeBlog.blog.subtitle && (
                  <p className="blog-modal__subtitle">{activeBlog.blog.subtitle}</p>
                )}
                {activeBlog.blog.video && (
                  <video
                    aria-label={`${activeBlog.blog.title} video`}
                    className="blog-modal__video"
                    controls
                    playsInline
                    preload="metadata"
                    src={activeBlog.blog.video}
                  />
                )}
                <div className="blog-modal__sections">
                  {activeBlog.blog.sections.map((section, index) => (
                    <section key={`${activeBlog.blog.id}-section-${index}`}>
                      {section.heading && <h3>{section.heading}</h3>}
                      <div
                        className={`blog-modal__section-content${section.thumbnail ? ' has-thumbnail' : ''}`}
                      >
                        {section.thumbnail && (
                          <div className="blog-modal__thumbnail-block">
                            <button
                              aria-label={`View full-size image: ${section.thumbnail.alt}`}
                              className="blog-modal__thumbnail-button"
                              onClick={(event) => {
                                const thumbnail = section.thumbnail;

                                if (!thumbnail) {
                                  return;
                                }

                                const image = {
                                  src: thumbnail.fullSrc,
                                  alt: thumbnail.alt,
                                };
                                // Keep the image and opener so closing restores focus.
                                lightboxImageRef.current = image;
                                lightboxTriggerRef.current = event.currentTarget;
                                setLightboxImage(image);
                              }}
                              type="button"
                            >
                              <img
                                alt={section.thumbnail.alt}
                                className="blog-modal__thumbnail"
                                src={section.thumbnail.thumbSrc}
                              />
                            </button>
                            <span className="blog-modal__thumbnail-hint">
                              Click to view full size
                            </span>
                            {section.thumbnail.specs && (
                              <span className="blog-modal__specs">
                                {section.thumbnail.specs}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="blog-modal__section-copy">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                          {section.image && (
                            <img
                              alt={section.imageAlt ?? ''}
                              className="blog-modal__image"
                              src={section.image}
                            />
                          )}
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* The lightbox is layered above the blog dialog and shows one full-size photo. */}
      {lightboxImage && (
        <div
          aria-label="Full-size photograph"
          aria-modal="true"
          className="photo-lightbox"
          onClick={(event) => {
            // Ignore clicks inside the image or close button; only the backdrop closes.
            if (event.target === event.currentTarget) {
              lightboxImageRef.current = null;
              setLightboxImage(null);
            }
          }}
          ref={lightboxDialogRef}
          role="dialog"
          tabIndex={-1}
        >
          {/* This control closes the topmost full-size image view. */}
          <button
            aria-label="Close full-size image"
            className="photo-lightbox__close"
            onClick={() => {
              lightboxImageRef.current = null;
              setLightboxImage(null);
            }}
            ref={lightboxCloseRef}
            type="button"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
              <path d="m3 3 10 10M13 3 3 13" />
            </svg>
          </button>
          <img
            alt={lightboxImage.alt}
            className="photo-lightbox__image"
            src={lightboxImage.src}
          />
        </div>
      )}
    </main>
  );
}

export default Projects;
