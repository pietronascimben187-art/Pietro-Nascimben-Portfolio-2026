// @ts-nocheck
'use client';
// export const dynamic = 'force-dynamic'; // Removed to avoid conflict with 'use client' in Next.js 15
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

import { useRef, useState, useEffect, useLayoutEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import Link from 'next/link';

import { useLenis } from '@studio-freight/react-lenis';

// Using the Bisous structural flow extracted by the Agent
const PROJECT_DB = {
  '1': {
    title: 'THE BLISTER',
    client: 'BVA Academy',
    director: ['Pietro Nascimben', 'Michele Martelloni'],
    type: 'Product Design',
    description: "The Blister is a project carried out through a joint collaboration with the BVA Academy sports association, which aims to enable children aged 8 to 18 with physical or cognitive disabilities to enter the world of sport.",
    bvaDescription: "The Bebe Vio Academy is a project conceived by Bebe in partnership with Nike; it is organized and managed by the art4sport ONLUS Association. It is an inclusive program that aims to promote Paralympic sport and is centered on Bebe's vision: to make sport accessible to all. Children with and without physical disabilities who join the project will have the opportunity to experience five different Paralympic sports disciplines.",
    secondaryDescription: "The project constraints aimed to combine the widest possible range of disabilities into the target audience, starting either from a sport already practiced within the gym environment, or by introducing a new one.\n\nTo achieve this goal, it was clear from the start that the final product had to possess a series of fundamental adjustments, while simulating realistic movements and responses of a surfboard following a wave.",
    secondaryImage: '/images/projects/AdobeStock_398248758.jpeg',
    overlays: ['/images/projects/MONITOR GAME 1.png', '/images/projects/MONITOR GAME 2.png'],
    cover: '/images/projects/seduta_aperta_black.png',
    gallery: [
      { src: '/images/projects/chiusura centrale tre quarti senza sfondo.png', format: 'slide-left-mirror' },
      { src: '/images/projects/the_blister_home.png', format: 'natural' },
      { 
        src: '/images/projects/seduta chiusa.png', 
        overlaySrc: '/images/projects/seduta_aperta_black.png', 
        format: 'compare',
        description: "The seat is also removable and was designed to best wrap the user, in fact the elastic armrests with the cover in the center wrap the user while keeping them stable and adhering firmly.\n\nThe seat core is rigid, but the elastic fiber shell has been created around it, which restores softness and a greater sense of envelopment, intertwining around the structure and covering it."
      },
      {
        format: 'interactive-slider',
        slides: [
          {
            src: '/images/projects/MANIGLIONE  SEDUTO.png',
            title: 'PS.K and PS.SIT',
            text: 'This category of athletes has impediments that do not allow\nthem to have sufficient control of the lower limbs to be able\nto perform activities standing. However, they are sufficiently in\ncontrol to be able to surf on their knees, with a good level of\nsafety. So the upper limbs in question do not need an accompaniment\nunless special cases, but only specific adaptations depending\non the difficulties of control or the possible lack of a part of the\nlower limbs.'
          },
          {
            src: '/images/projects/MANIGLIONE IN PIEDI.png',
            title: 'PS.S1 e PS.S2',
            text: 'This category includes athletes with relatively limited partial\namputation, who therefore manage to control the board with\nnot too invasive adapters performing the activity in an upright\nposition on the lower limbs. The two different categories are\ndefined by the differnt difficulty of the athlets in the control\nof their bodies and the ability to keep the balance during the\nactivity.'
          },
          {
            src: '/images/projects/MANIGLIONE  SDRAIATO.png',
            title: 'PS.P1 and PS.P2',
            text: 'The athletes belonging to these two categories have in common\nthe prone position on the board, with some possible adjustments\nto stabilize the body where necessary.\nThe fundamental difference is that in the first category the\nathlete still needs a companion to carry out the row phase, while\nin the second it can move the upper limbs independently.'
          }
        ]
      }
    ],
    pdfPresentation: '/images/projects/Nascimben - Martelloni - BVA.pdf'
  },
  '2': {
    title: 'SERVE.FLOW',
    client: 'Restoration',
    director: 'Pietro Nascimben',
    type: 'Techno Bodies',
    description: "Serve flow aim to reduce fatigue and give a support through an essential approach and avoiding heavy electronic and components. The product is based on the mechanics of the elastic material and the mechanical joint.",
    heroBg: 'black',
    heroColor: 'white',
    cover: '/images/projects/colored_2.png',
    gallery: [
      {
        format: 'grid-5-black-right',
        images: [
          '/images/projects/7.png',
          '/images/projects/10 2.png',
          '/images/projects/11.png',
          '/images/projects/11b.png'
        ],
        captions: [
          {
            title: "Bending",
            text: "Given the need for dynamic weight support, an alternative is to use a joint that rearms after each lowering, freeing itself only when necessary through quick user input. The spring in the joint offers sufficient strength and allows for smooth lowering until the weight is released onto the lower support."
          },
          {
            title: "Support",
            text: "The totality of the bands and supports can be adjusted so as to have maximum adhesion but ensuring a high level of customization. Each band can be lengthened and shortened, and the lower support core lengthens and shortens as needed quickly. A single lower core also makes the exoskeleton less visible and more discreet, difficult to notice for example if the worker is behind the bar counter."
          },
          {
            title: "The Soul",
            text: "The lower part provides personalized support and blends perfectly with typical clothes of the environment without being noticeable. The support of the spine provides both support and correct posture, also thanks to the direct attachment with the dynamic seat. The elastic bands slide between the seams of the clothes, ensuring discretion, and then magnetically attach to complete the positioning of the support."
          }
        ]
      },
      { 
        src: '/images/projects/3.png', 
        overlaySrc: '/images/projects/10.png', 
        format: 'side-by-side',
        hotspots: [
          { 
            x: 50, 
            y: 15, 
            radius: 12, 
            detailSrc: '/images/projects/serve dettaglio 1.png',
            title: "Fast closing",
            text: "Magnetic fasteners with push buttons have some fundamental advantages, the magnets guarantee excellent resistance, in addition to the ferrules, and they release quickly and easily. Furthermore, the button on par with the ring prevents it from being pressed by mistake if you hit objects during rapid movements."
          },
          { 
            x: 50, 
            y: 35, 
            radius: 12, 
            detailSrc: '/images/projects/Serve dett 2.png',
            title: "Easy to use",
            text: "To tighten the elastic bands, you can use simple loops on the straps, while for the belt, where greater precision is required, the ring itself rotates to ensure a compact closure. To release the lock at the end of the shift, simply press two buttons together with the sides of the ring. The central button in this case, given its size, is not physical but haptic, and activates and deactivates the micro sitting system with a quick double tap.",
            objectPosition: 'center 20%'
          }
        ]
      },
      { 
        format: 'description',
        text: "The project explores how a soft, wearable exoskeleton can support workers in the hospitality sector by reducing physical fatigue during long shifts spent standing, walking, and performing repetitive movements.",
        text2: "Rather than replacing the human body functionalities, the device enhances natural posture and movement, enabling greater endurance, comfort, and accessibility for people with physical limitations."
      },
      { 
        src: '/images/projects/12.png?v=2', 
        overlaySrc: '/images/projects/13.png?v=2', 
        format: 'compare',
        aspect: 'aspect-auto',
        objectPosition: 'center'
      },
    ],
    pdfPresentation: '/images/projects/Serve flow pres.pdf'
  },
  '3': {
    title: 'HASU',
    client: 'Gandino Ecosystem',
    director: ['Pietro Nascimben', 'Andrea Giglio'],
    type: 'Product and Systemic Design',
    description: "Hasu is a passive, modular wool‑based surface designed to mediate indoor air through geometry and material chemistry. This concept is based on a porous skin where petal‑like modules slow, diffuse, and redirect airflow, allowing it to interact with wool over time. Hasu works as a breathable architectural field that conditions air naturally and passively.",
    secondaryDescription: "Hasu works as a distributed field of thin modules. Performance is achieved through repeated contact: the scaled geometry slows, deflects, and diffuses airflow so that air interacts multiple times with different materials across the surface.\n\nEach Hasu unit keeps the same outer shell for visual coherence, while the internal cartridge changes according to function. By distributing modules strategically, Hasu creates a graded filtering landscape, more open where air needs to pass, more reactive where pollutants need to be treated, remaining compatible with passive airflow and low-pressure conditions.",
    introImage: ['/images/projects/hasu/3.png', '/images/projects/hasu/4.png'],
    introKeywords: ['ARCHITECTONIC', 'DYNAMIC', 'SYSTEM'],
    cover: '/images/projects/hasu/1.png?v=3',
    heroBg: 'white',
    heroTextColor: 'black',
    heroImageScale: 0.875,
    heroImageFit: 'contain',
    gallery: [
      { src: '/images/projects/hasu/2.png', format: 'full' },
      { 
        src: '/images/projects/hasu/7.png', 
        format: 'components-section',
        hotspots: [
          {
            x: 45,
            y: 75,
            radius: 12,
            detailSrc: '/images/projects/hasu/8.png',
            title: 'CLOSING HEAD',
            text: 'The closing head acts as the structural core of the module. Through a threaded connection, it locks all components together and defines the final tension of the wool surface. Its countersunk geometry slightly bends the wool sheet when tightened, introducing a controlled three‑dimensional curvature that enhances both airflow deflection and spatial depth. In the TiO₂ version, this element also integrates the UV lamp, making the reactive function fully contained within the module.'
          },
          {
            x: 65,
            y: 25,
            radius: 12,
            detailSrc: '/images/projects/hasu/6.png',
            title: 'WOOL ELEMENT',
            text: 'The wool element represents the active surface of the Hasu module. Depending on the cartridge type, this layer is composed of pure wool, lanolin‑rich wool, carbon‑loaded media or TiO₂‑treated wool. Its thin profile of 15mm is designed to remain breathable while maximizing contact through repeated exposure across the field. Rather than relying on thickness, performance is achieved through material chemistry, surface interaction and repetition.',
            scale: 1.15
          },
          {
            x: 55,
            y: 50,
            radius: 12,
            detailSrc: '/images/projects/hasu/5.png',
            title: 'ATTACHMENT SYSTEM',
            text: 'The attachment system connects each module to the tensioned cable structure. A tubular element with internal counter‑thread receives the closing head, while the opposite end terminates in a carabiner, allowing quick attachment and removal. This solution enables easy maintenance, replacement and reconfiguration, reinforcing Hasu’s logic as a reversible and adaptable system rather than a fixed installation.'
          }
        ]
      },
      { 
        src: '',
        format: 'specs-table',
        tableTitle: 'Module Distribution',
        tableCaption: 'Hasu does not apply a single filtering function uniformly across its surface. Instead, different modules are distributed across the field to create zones with varying levels of openness, absorption and reactivity.',
        tableData: [
          { title: 'Lanolin Wool', desc: 'Modules in raw wool with lanolin are placed where air first encounters the system, acting as a pre‑filter for coarse particles and oily aerosols.' },
          { title: 'Carbon Wool', desc: 'Pure wool modules are spread throughout the surface to support particulate capture and humidity buffering while maintaining breathability.' },
          { title: 'Base Wool', desc: 'Activated carbon modules are positioned in more enclosed or stagnant areas, where odours and residual VOCs tend to accumulate.' },
          { title: 'TiO₂ Wool', desc: 'TiO₂ modules with integrated UV activation introduce localized reactive zones without defining the behaviour of the entire system.' }
        ]
      },
      {
        src: '/images/projects/hasu/9.png',
        format: 'text-section',
        title: 'Color Strategy',
        text: 'Hasu can operate without any additional colouring process, relying on the natural tones of wool. By avoiding dyeing, the system reduces production steps, energy consumption and costs at an early stage of the supply chain. Natural shades reinforce the material‑driven identity of the project, keeping the focus on performance, texture and biomimetic logic rather than surface appearance. In this configuration, Hasu is presented primarily as a passive air‑mediating system, where colour is a direct consequence of the material itself.'
      },
      { 
        format: 'interactive-slider', 
        slides: [
          { src: '/images/projects/hasu/10.png' },
          { src: '/images/projects/hasu/11.png' },
          { src: '/images/projects/hasu/12.jpeg' },
          { src: '/images/projects/hasu/13.png' }
        ]
      }
    ],
    pdfPresentation: '/images/projects/hasu/HASU_GiglioNascimben.pdf'
  },
  '4': {
    title: 'TAKE A BREATH',
    client: 'connected world',
    director: 'Pietro Nascimben',
    type: 'Product and UX Design',
    description: "Take a Breath is a project based on the design of a series of air filters that allow people to take care of their homes and health through the correct application of new technologies such as AI. The purpose is not only functional but also to create a personal experience.",
    secondaryDescription: "The daily air is something fundamental, we talk about the basis of life. Every day we breathe, but what do we breathe? If we live in a big city maybe not such a good air.\n\nNot everyone knows that in 2024, for a few days, Milan was the third most polluted city in the world after megalopolises like New Delhi and Mexico City, which are extremely more populous and less developed.",
    systemFeatures: {
      'AIR CONTROL': "Thanks to a centralized AI system, the filters not only automatically adjust the filtration intensity as needed, but also learn the habits and needs of users.\n\nFor example, they can predict a peak in pollen on spring days or reduce activity when the house is empty, optimizing energy consumption. Connected to an intuitive app, users can receive personalized recommendations and notifications on air quality, creating a healthy, safe and technologically cutting-edge home environment.",
      'EXPERIENCE': "An intelligent air diffuser system that learns from user habits and preferences, automatically adjusting airflow, temperature, and intensity for optimal comfort and efficiency. Users experience a seamless blend of personalization and convenience, with the added ability to modify and customize the scents in their environment.\n\nBy selecting from a range of fragrances or programming scent cycles, the system creates an immersive, multi-sensory experience that evolves to suit changing moods, activities, or times of day. This tailored approach not only elevates comfort and well-being but also promotes energy savings by adapting its performance to actual needs.",
      'MODULARITY': "The system features modular components with distinct capabilities, including a central “master” module that controls and synchronizes the operation of all connected units. Additional modules, tailored for specific functions, can be placed in different rooms, allowing users to create a fully customized setup.\n\nEach module communicates seamlessly with the master unit, ensuring consistent performance while adapting to the unique requirements of each space. This flexible design enables personalized comfort and environmental control throughout the entire home.",
      'MACHINE LEARNING': "An intelligent air diffuser system designed to learn from the user’s habits and preferences. Through advanced sensors and adaptive algorithms, it analyzes usage patterns and environmental conditions, automatically adjusting airflow, temperature, and intensity to create the ideal atmosphere.\n\nThis personalized approach not only maximizes user comfort but also promotes energy savings by tailoring its performance to actual needs."
    },
    extraTitle: ['MODULE', 'SPACES', 'FEATURES'],
    introImage: '/images/projects/take-a-breath/4.png',
    cover: '/images/projects/take-a-breath/copertina.png',
    gallery: [
      { src: '/images/projects/take-a-breath/3.png', format: 'slide-left-mirror', mirrored: false },
      { 
        src: '/images/projects/take-a-breath/1.png', 
        format: 'hotspot-natural',
        hotspots: [
          {
            x: 40,
            y: 10,
            radius: 12,
            detailSrc: '/images/projects/take-a-breath/5.png',
            title: 'Wireless Charging',
            text: 'In some of the modules in addition to the sisetma of autospeakers you can load all kinds of devices that support contact charging. The module covers have a series of small terminations that allow to support the device where you prefer, also avoiding dimensional problems of the devices.'
          },
          {
            x: 50,
            y: 30,
            radius: 12,
            detailSrc: '/images/projects/take-a-breath/6.png',
            title: 'Fragrance Core',
            text: 'The system allows to open the filters and extend the core to change the filter component, in the moment where this change takes place is possible to choose a different fragrance. That is released at the discretion of the user, that can require to have it in a specific room.'
          },
          {
            x: 35,
            y: 85,
            radius: 12,
            detailSrc: '/images/projects/take-a-breath/7.png',
            title: 'Autonomous Motion',
            text: 'To allow the module to move freely in space, a system has been added that allows it to move according to the needs of the environment. The ability to move combined with the sensors should allow the system to move the various modules in a way that makes their operation as effective and efficient as possible.'
          }
        ]
      },
      { 
        format: 'interactive-slider', 
        slides: [
          { src: '/images/projects/take-a-breath/8.jpg' },
          { src: '/images/projects/take-a-breath/9.png' },
          { src: '/images/projects/take-a-breath/10.png' },
          { src: '/images/projects/take-a-breath/11.png' }
        ]
      }
    ],
    pdfPresentation: '/images/projects/take-a-breath/Nascimben-Zang Air Filter.pdf'
  },
  '5': {
    title: 'MOLD.E',
    client: 'Jewelry and watches',
    director: 'Pietro Nascimben',
    type: 'R&D',
    description: "MOLD.E is a smart screwdriver that explores the integration of metamaterial engineering and tactile interaction within a familiar hand tool. Its grip is made from a programmable lattice structure that deforms to fit the unique contour of the user’s hand, ensuring comfort, precision, and improved torque control.",
    heroBg: 'white',
    heroImageFit: 'contain',
    heroImageScale: 1.2,
    heroImageOffsetY: -80,
    cover: '/images/projects/Mold.e/1.png',
    gallery: [
      { 
        src: '/images/projects/Mold.e/half sx.png', 
        overlaySrc: '/images/projects/Mold.e/half dx.png', 
        format: 'compare',
        hasBg: true
      },
      {
        format: 'two-col-images',
        src: '/images/projects/Mold.e/7.png',
        overlaySrc: '/images/projects/Mold.e/6.png',
        caption: 'The classic grip of precision screwdrivers has some critical issues arising from the fact that they generally have to be held with one hand. The maximum load is concentrated on the index finger, which applies the force and holds in place. The rotary motion, on the\nother hand, comes from the movement of the thumb and middle finger.',
        captionRight: 'At the pressure and tension level, the classic position and grip tend to be effective but very challenging when used repetitively. Furthermore, the forces at play can be quite large in the case of some operations, and are difficult to control. Tendons and joints must withstand prolonged pressure and very sensitive micro-movements.'
      },
      {
        src: '/images/projects/Mold.e/BASE.png',
        format: 'components-section',
        detailBg: 'white',
        baseWidth: 'w-[195%] min-w-[195%]',
        maskEdges: true,
        hotspots: [
          {
            x: 50,
            y: 50,
            radius: 8,
            detailSrc: '/images/projects/Mold.e/5.png',
            title: 'The Grip Lattice',
            text: 'The handle is built around a compliant lattice structure designed to locally deform under pressure, adapting to the user’s grip while maintaining overall stability. Embedded micro-actuation enables controlled variation of stiffness within the structure: when activated, selected zones become more compliant, allowing the lattice to conform to the hand. Once the desired shape is reached, the system stabilizes the structure, preserving the configuration without continuous energy input. This approach allows the screwdriver to combine adaptability and precision, ensuring a stable and repeatable grip tailored to the user.'
          },
          {
            x: 50,
            y: 20,
            radius: 8,
            detailSrc: '/images/projects/Mold.e/detail 2.png',
            title: 'Switch System',
            scale: 1.3,
            offsetX: 80,
            text: 'The various modes can be quickly changed using the forward and reverse buttons on the top of the screwdriver, and the position in the sequence is also highlighted by turning on a segment of the side light bar.'
          }
        ]
      },
      {
        format: 'setup-timeline',
        src: '',
        steps: [
          {
            number: 1,
            label: 'Push and hold for 3 seconds',
            image: '/images/projects/Mold.e/Timeline/1.png'
          },
          {
            number: 2,
            label: 'Put the fingers on the grip',
            image: '/images/projects/Mold.e/Timeline/2.png'
          },
          {
            number: 3,
            label: 'Let the grip inflate',
            image: '/images/projects/Mold.e/Timeline/3.png'
          },
          {
            number: 4,
            label: '1st position recorded',
            image: '/images/projects/Mold.e/Timeline/4.png'
          }
        ]
      },
      {
        format: 'description',
        title: 'Tips and Regulations',
        text: 'The tip is magnetically inserted into place, and when necessary an element is added which is inserted with regulated force. This element snaps once a certain force has been won, to ensure the correct closing torque.',
        text2: 'Given the difficulty of distinguishing tips from slightly different thicknesses with the naked eye, especially when working with the precision monocle, **conventions have been devised that associate a specific color with a unique tip thickness.**'
      },
      {
        src: '/images/projects/Mold.e/2.png',
        format: 'natural',
        mt: -250,
        innerY: -25
      }
    ],
    pdfPresentation: '/images/projects/Mold.e/V3.pdf'
  }
};


function SetupTimeline({ steps }: { steps: Array<{ number: number; label: string; image: string }> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 15%']
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={sectionRef} style={{ width: '100%', position: 'relative', paddingTop: '25px' }}>
      {/* 3-col grid via inline style to ensure correct compilation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr', width: '100%', alignItems: 'stretch' }}>

        {/* LEFT: stacked images centered in their half */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ width: '100%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {i < 3 ? (
                /* Steps 1-3: natural image height, no bottom padding, box ends at subject */
                <div style={{ width: '100%', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                  <img
                    src={step.image}
                    alt={step.label}
                    style={{ width: '100%', height: 'auto', display: 'block', padding: '1.5rem 1.5rem 0 1.5rem' }}
                  />
                </div>
              ) : (
                /* Step 4: fixed aspect ratio, centered */
                <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                  <img src={step.image} alt={step.label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CENTER: bar + numbered nodes */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Background track — always visible */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'rgba(0,0,0,0.12)', marginLeft: '-0.5px' }} />
          {/* Scroll-driven fill — marginLeft instead of translateX to avoid transform conflict with scaleY */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '2px',
              marginLeft: '-1px',
              left: '50%',
              backgroundColor: '#000',
              transformOrigin: 'top',
              scaleY
            }}
          />
          {/* Nodes evenly distributed */}
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -5% 0px' }}
                transition={{ type: 'spring', stiffness: 250, damping: 20, delay: i * 0.15 }}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: '#000', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'monospace', fontWeight: 'bold', fontSize: 14,
                  flexShrink: 0, position: 'relative', zIndex: 10
                }}
              >
                {step.number}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: descriptions aligned with nodes via justify-around */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '2rem' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                {step.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function AnimatedImageWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ParallaxImage({ src, aspectRaw, innerY = 0 }: { src: string, aspectRaw: string, innerY?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);
  
  return (
    <AnimatedImageWrapper className={`w-full relative ${aspectRaw} z-10`}>
      <div ref={ref} className="w-full h-full relative overflow-hidden">
         <motion.div className="absolute inset-0 w-full h-[115%] top-[-7.5%]" style={{ y, scale, translateY: innerY }}>
            <Image src={src} alt="Gallery image" fill unoptimized className="object-cover" />
         </motion.div>
      </div>
    </AnimatedImageWrapper>
  );
}

function NaturalImage({ src }: { src: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.img
        src={src}
        alt="Gallery image"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}

interface Hotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  radius: number; // percentage width
  detailSrc: string;
  title?: string;
  text?: string;
  objectPosition?: string;
  scale?: number;
}

function HotspotImage({ 
  src, 
  hotspots, 
  onActiveHSChange, 
  hideOverlay = false,
  className = "",
  style
}: { 
  src: string, 
  hotspots: Hotspot[], 
  onActiveHSChange?: (hs: Hotspot | null) => void,
  hideOverlay?: boolean,
  className?: string,
  style?: React.CSSProperties
}) {
  const [activeHS, setActiveHS] = useState<Hotspot | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -5% 0px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative cursor-crosshair overflow-visible ${className || 'w-full'}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveHS(null)}
    >
      <motion.img
        src={src}
        alt="Gallery image"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* Red Circle Hotspots (Halved size) */}
      {hotspots.map((hs, i) => (
        <div
          key={i}
          className="absolute rounded-full z-30 pointer-events-auto cursor-pointer"
          style={{
            left: `${hs.x}%`,
            top: `${hs.y}%`,
            width: `${hs.radius}%`,
            aspectRatio: '1/1',
            transform: 'translate(-50%, -50%)',
            border: '2px dashed rgba(255,0,0,0.6)',
            backgroundColor: 'rgba(255,0,0,0.08)',
          }}
          onMouseEnter={() => {
            setActiveHS(hs);
            if (onActiveHSChange) onActiveHSChange(hs);
          }}
          onMouseLeave={() => {
            setActiveHS(null);
            if (onActiveHSChange) onActiveHSChange(null);
          }}
        />
      ))}

      {/* Fixed Detail Overlay - Centered in view */}
      {!hideOverlay && (
        <AnimatePresence>
          {activeHS && (
            <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-6 md:p-12">
              {/* Subtle Backdrop Dim */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative bg-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-sm border border-neutral-100 overflow-hidden w-full max-w-[320px] md:max-w-[600px] flex flex-col pointer-events-auto"
              >
                {/* Standardized Image Frame */}
                <div className="w-full aspect-[16/10] bg-neutral-50 relative overflow-hidden">
                  <img 
                    src={activeHS.detailSrc} 
                    alt="Detail" 
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ 
                      objectPosition: activeHS.objectPosition || 'center center',
                      transform: `scale(${activeHS.zoom || 1})`
                    }}
                  />
                </div>

                <div className="p-6 md:p-10 flex flex-col gap-4 bg-white">
                   {activeHS.title && (
                     <h4 className="text-[10px] md:text-xs font-mono font-bold text-black uppercase tracking-[0.3em] border-b border-black/10 pb-3">
                       {(activeHS as any).title}
                     </h4>
                   )}
                   {(activeHS as any).text && (
                     <p className="text-xs md:text-sm text-black/70 leading-relaxed font-sans">
                       {(activeHS as any).text}
                     </p>
                   )}
                </div>
                <div className="py-2 px-4 bg-black flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold text-white uppercase tracking-[0.2em]">Mechanical Insight</span>
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Hover out to close</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function InteractiveSystemFeatures({ features }: { features: Record<string, string> }) {
  const [activeKey, setActiveKey] = useState(Object.keys(features)[0]);
  const keys = Object.keys(features);

  return (
    <div className="flex flex-col md:flex-row items-start pt-16 pb-16 gap-16 md:gap-32 px-6 md:px-12 border-t border-black/5 mt-16">
      {/* Left Column: Titles */}
      <div className="md:w-1/3 xl:w-1/4 flex flex-col gap-4">
        {keys.map((key) => (
          <motion.h3
            key={key}
            onMouseEnter={() => setActiveKey(key)}
            className="text-sm font-mono font-bold uppercase tracking-[0.3em] border-b border-black/10 pb-4 cursor-pointer relative px-2 -mx-2"
            animate={{ 
              backgroundColor: activeKey === key ? "#000" : "rgba(0,0,0,0)",
              color: activeKey === key ? "#fff" : "#000",
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1] // Quintic ease out for a "softer" feel
            }}
          >
            {key}
          </motion.h3>
        ))}
      </div>
      
      {/* Right Column: Dynamic Text */}
      <div className="md:w-2/3 max-w-4xl grid grid-cols-1 items-start">
        {keys.map((key) => (
          <div 
            key={key} 
            className="grid-area-1-1 col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
            style={{ 
              opacity: activeKey === key ? 1 : 0,
              pointerEvents: activeKey === key ? 'auto' : 'none',
              zIndex: activeKey === key ? 10 : 0
            }}
          >
            <div className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80 whitespace-pre-line py-4 md:py-0">
              {features[key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideInFromLeft({ src, mirrored = false, extraTitle }: { src: string, mirrored?: boolean, extraTitle?: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative w-full"
      >
        <img
          src={src}
          alt="Project visual"
          className="w-full h-auto block"
          style={{
            transform: mirrored ? 'scaleX(-1)' : 'none',
          }}
        />

        {/* Overlay Texts — Top, White, Single Line, Right-Column Start Aligned */}
        {extraTitle && (
          <div className="absolute inset-0 flex flex-col justify-start pt-[2%] md:pt-[4%] px-6 md:px-12 pointer-events-none z-50">
             <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
               {/* Left column spacer */}
               <div className="md:w-1/3 xl:w-1/4" />

               {/* Right column: DIFFERENT + Ticker (Aligned Left within the column) */}
               <div className="md:w-2/3 max-w-4xl flex items-baseline gap-4 md:gap-6">
                 <div className="text-3xl md:text-5xl lg:text-[3.8rem] font-bold tracking-tighter text-white uppercase leading-none shrink-0">
                   DIFFERENT
                 </div>
                 <div className="relative overflow-hidden h-[3.8rem] md:h-[5rem] lg:h-[8rem] flex items-center justify-center min-w-[10rem] md:min-w-[16rem] lg:min-w-[22rem] border border-white/30 rounded-sm">
                   <Rotating3DText texts={extraTitle} textColor="text-white" />
                 </div>
               </div>
             </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Rotating3DText({ texts, textColor = "text-black" }: { texts: string[], textColor?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateX: 90, opacity: 0, y: 20 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className={`text-3xl md:text-5xl lg:text-[3.8rem] font-bold tracking-tight ${textColor} uppercase leading-none origin-center`}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ImageComparisonSlider({ 
  srcBase, 
  srcOverlay, 
  aspect = "aspect-auto", 
  objectPosition = "center" 
}: { 
  srcBase: string, 
  srcOverlay: string, 
  aspect?: string, 
  objectPosition?: string 
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const onMouseMove = (e: ReactMouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: ReactTouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <AnimatedImageWrapper>
      <div 
        ref={containerRef}
        className={`w-full relative cursor-ew-resize select-none overflow-hidden ${aspect}`}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
      {/* Immagine di base che definisce l'altezza del contenitore se aspect è auto */}
      <img 
        src={srcBase} 
        alt="Comparison Base" 
        className={`w-full block ${aspect === 'aspect-auto' ? 'h-auto' : 'h-full object-cover'}`}
        style={{ objectPosition }}
      />
      <img 
        src={srcOverlay} 
        alt="Comparison Overlay" 
        className="absolute top-0 left-0 w-full h-full block object-cover"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          pointerEvents: 'none',
          objectPosition
        }} 
      />
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
           <div className="flex gap-1 md:gap-2">
             <div className="w-0 h-0 border-t-[4px] md:border-t-[5px] border-t-transparent border-b-[4px] md:border-b-[5px] border-b-transparent border-r-[5px] md:border-r-[6px] border-r-black"></div>
             <div className="w-0 h-0 border-t-[4px] md:border-t-[5px] border-t-transparent border-b-[4px] md:border-b-[5px] border-b-transparent border-l-[5px] md:border-l-[6px] border-l-black"></div>
           </div>
        </div>
      </div>
    </div>
    </AnimatedImageWrapper>
  );
}

function InteractiveImageSlider({ slides, interval = 8000 }: { slides: { src: string, title?: string, text?: string }[], interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const next = (e: ReactMouseEvent) => { e.preventDefault(); setCurrentIndex((prev) => (prev + 1) % slides.length); };
  const prev = (e: ReactMouseEvent) => { e.preventDefault(); setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length); };

  return (
    <AnimatedImageWrapper className="w-full flex justify-center pb-0">
      <div className="w-full max-h-screen relative bg-transparent overflow-hidden group flex items-center justify-center">
        
        {/* Spacer neutrale: obbliga il contenitore flessibile ad assumere la medesima proporzione intrinseca delle foto a width:100% */}
        <img 
          src={slides[0].src} 
          alt="spacer" 
          onLoad={() => window.dispatchEvent(new Event('resize'))}
          style={{ width: '100%', height: 'auto', display: 'block', visibility: 'hidden' }} 
        />

        {/* Images with crossfade presence */}
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={slide.src} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}

        {/* Dynamic Text Descriptions Overlay */}
        {slides.map((slide, i) => (
          <div 
            key={`text-${i}`}
            className={`absolute top-8 md:top-16 right-6 md:right-16 max-w-[260px] md:max-w-sm lg:max-w-md transition-opacity duration-700 ease-in-out pointer-events-none flex flex-col items-end gap-2 md:gap-4 text-right ${i === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}
          >
            {slide.title && (
               <>
                 <h4 className="text-xs md:text-sm font-bold tracking-widest text-black/90 uppercase">{slide.title}</h4>
                 <p className="text-[10px] md:text-xs text-black/60 leading-[1.6] whitespace-pre-line">{slide.text}</p>
               </>
            )}
          </div>
        ))}

        {/* Floating Controls matching the Brutalist MORE style */}
        <motion.button 
          onClick={prev}
          whileTap={{ x: -20, opacity: 0, transition: { duration: 0.2 } }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-start w-24 h-24 md:w-32 md:h-32 transition-all duration-500 ease-out hover:italic group/btn cursor-pointer"
        >
          <span className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none text-black scale-[0.33] group-hover/btn:scale-100 origin-left transition-transform duration-500">←</span>
        </motion.button>
        <motion.button 
          onClick={next}
          whileTap={{ x: 20, opacity: 0, transition: { duration: 0.2 } }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-end w-24 h-24 md:w-32 md:h-32 transition-all duration-500 ease-out hover:italic group/btn cursor-pointer"
        >
          <span className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none text-black scale-[0.33] group-hover/btn:scale-100 origin-right transition-transform duration-500">→</span>
        </motion.button>

        {/* Progress Bar Indicator replacing dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-48 md:w-64 h-[2px] bg-black/10 overflow-hidden">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-full bg-black/80"
          />
        </div>
      </div>
    </AnimatedImageWrapper>
  );
}

function BoldArrow({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}


function LensFocusWords({ words }: { words: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Fixed slot dimensions — must match the rendered height for precise alignment
  const ITEM_H = 52;   // px — height of each word row (doubled from 28)
  const GAP     = 32;  // px — gap between rows
  const SLOT    = ITEM_H + GAP; // total slot height per word

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [words.length]);

  const totalH = words.length * ITEM_H + (words.length - 1) * GAP;

  return (
    <div className="relative flex flex-col items-center" style={{ gap: `${GAP}px`, height: `${totalH}px` }}>

      {/* Lens: two thin horizontal rules that track the active word */}
      <motion.div
        className="absolute left-1/2 pointer-events-none"
        style={{ width: '200%', transform: 'translateX(-50%)' }}
        animate={{ top: activeIndex * SLOT }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Top rule */}
        <div className="w-full h-px bg-black/30" />
        {/* Bottom rule */}
        <div className="w-full h-px bg-black/30" style={{ marginTop: `${ITEM_H}px` }} />
      </motion.div>

      {words.map((word, i) => {
        const dist = Math.abs(i - activeIndex);
        const isActive = i === activeIndex;
        return (
          <motion.div
            key={word}
            animate={{
              opacity: isActive ? 1 : dist === 1 ? 0.22 : 0.07,
              filter: isActive ? 'blur(0px)' : `blur(${dist * 2}px)`,
              scale: isActive ? 1 : dist === 1 ? 0.82 : 0.65,
            }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="font-mono font-bold text-black uppercase origin-center select-none"
            style={{
              fontSize: '1.2rem',
              letterSpacing: '0.3em',
              height: `${ITEM_H}px`,
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {word}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const proj = PROJECT_DB[slug as keyof typeof PROJECT_DB] || PROJECT_DB['1'];
  const lenis = useLenis();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Force scroll to top on slug change or initial load
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    };

    resetScroll();
    
    // Safety frames for certain browsers or Next.js scroll restoration
    const rafId = requestAnimationFrame(resetScroll);
    const timeoutId = setTimeout(resetScroll, 50); // Increased timeout for Lenis initialization

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [slug, lenis]);

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans cursor-none pb-0 overflow-x-hidden">
      
      {/* 1. Hero Full Screen 100vh with Massive Bleeding Typography */}
      <section className={`relative w-full h-[100svh] ${(proj as any).heroBg === 'black' ? 'bg-black text-white' : 'bg-white text-black'} pointer-events-none`}>
        
        <Image 
          src={proj.cover} 
          alt={proj.title} 
          fill 
          unoptimized 
          className={`pointer-events-none ${(proj as any).heroImageFit === 'contain' ? 'object-contain' : 'object-cover'}`} 
          style={{ transform: `scale(${(proj as any).heroImageScale || 1}) translateY(${(proj as any).heroImageOffsetY || 0}px)` }}
          priority 
        />
        
        {/* Architecturally scaled huge overlap text bleeding slightly into white. */}
        <motion.h1 
          initial={{ opacity: 0, x: "-50%", y: 100 }}
          animate={{ opacity: 1, x: "-50%", y: 0 }}
          transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1], delay: 1.2 }}
          className={`absolute -bottom-4 md:-bottom-12 left-1/2 text-[13vw] md:text-[18.5vw] leading-[0.70] font-bold tracking-tighter uppercase ${(proj as any).heroTextColor === 'black' ? 'text-black' : 'text-[#b3b3b3] mix-blend-difference'} z-20 pointer-events-none whitespace-nowrap`}
        >
          {proj.title}
        </motion.h1>
      </section>

      {/* 2. Pure White Project Brief block */}
      <section className="relative w-full pt-32 px-6 md:px-12 pb-24 bg-white flex flex-col gap-16 pointer-events-auto z-10">
         {/* Top row: specs + description */}
         <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
            {/* Monospace Architectural Specs */}
            <div className="font-mono text-[10px] md:text-[0.65rem] tracking-[0.2em] uppercase text-black/50 flex flex-col gap-1 md:w-1/3 xl:w-1/4 mt-1.5">
               <div className="flex justify-between w-full border-b border-black/10 pb-1 mb-1"><span>:CLIENT</span> <span className="font-bold text-black">{proj.client}</span></div>
               <div className="flex justify-between w-full border-b border-black/10 pb-1 mb-1"><span>:CATEGORY</span> <span className="font-bold text-black">{proj.type}</span></div>
               <div className="flex justify-between w-full border-b border-black/10 pb-1 mb-1 items-start">
                  <span>:DESIGNER</span> 
                  <div className="flex flex-col items-end font-bold text-black text-right">
                     {Array.isArray(proj.director) ? proj.director.map((d, i) => <span key={i}>{d}</span>) : <span>{proj.director}</span>}
                  </div>
               </div>
            </div>
           {/* Minimalist Editorial Descriptive Text */}
           <div className="md:w-2/3 max-w-4xl text-2xl md:text-4xl lg:text-[2.7rem] font-bold tracking-tight leading-[1.25]">
             {proj.description}
           </div>
          </div>
       </section>

       {/* 3. Specialized Detail Section (Intro Image + Secondary Description) */}
        {(proj as any).introImage && (
          <section className="relative w-full bg-white pointer-events-auto z-10 overflow-hidden">
            {Array.isArray((proj as any).introImage) ? (
              // Two images: image 1 flush-left, center keywords, image 2 flush-right (mirrored)
              <div className="w-full pt-16 flex items-center overflow-x-hidden">
                {/* Left image — flush with left page edge */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[90vh] flex-1 flex justify-start items-center origin-left"
                >
                  <img
                    src={`${(proj as any).introImage[0]}?v=2`}
                    alt="Intro Detail 1"
                    className="h-full w-auto object-contain"
                  />
                </motion.div>

                {/* Center: Lens Focus Keywords */}
                {(proj as any).introKeywords && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="flex-shrink-0 flex items-center justify-center px-4 md:px-8"
                    style={{ width: 'clamp(140px, 15vw, 260px)' }}
                  >
                    <LensFocusWords words={(proj as any).introKeywords} />
                  </motion.div>
                )}

                {/* Right image — flush with right page edge, mirrored */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[90vh] flex-1 flex justify-end items-center origin-right"
                >
                  <img
                    src={`${(proj as any).introImage[1]}?v=2`}
                    alt="Intro Detail 2"
                    className="h-full w-auto object-contain"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                </motion.div>
              </div>
            ) : (
              // Single image — flush with both edges
              <div className="w-full pt-16 overflow-hidden">
                <motion.div
                  initial={{ x: -100, opacity: 0, scale: 1.05 }}
                  whileInView={{ x: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-[90vh]"
                >
                  <img
                    src={`${(proj as any).introImage}?v=2`}
                    alt="Intro Detail"
                    className="w-full h-full object-cover object-left"
                  />
                </motion.div>
              </div>
            )}
          </section>
        )}

        {(proj as any).secondaryDescription && (proj as any).introImage && (
          <section className="relative w-full px-6 md:px-12 bg-white flex flex-col pointer-events-auto z-10 pt-16 pb-24">
            <div className="flex flex-col md:flex-row items-start gap-16 md:gap-32">
              {/* Left Column (1/2): First Paragraph */}
              <div className="md:w-1/2 text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80">
                  {(proj as any).secondaryDescription.split('\n\n')[0]}
              </div>
              
              {/* Right Column (1/2): Second Paragraph */}
              <div className="md:w-1/2">
                  {(proj as any).secondaryDescription.split('\n\n')[1] && (
                    <div className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80 whitespace-pre-line py-4 md:py-0">
                        {(proj as any).secondaryDescription.split('\n\n')[1]}
                    </div>
                  )}
              </div>
            </div>
          </section>
        )}

       <section className="relative w-full px-6 md:px-12 bg-white flex flex-col pointer-events-auto z-10">

          {/* BVA Logo Section — Left Column Logo (Slide Left), Right Column Text (Slide Right) */}
          {((proj as any).bvaDescription || (proj as any).bvaLogo) && (
            <div className="flex flex-col md:flex-row items-start pt-8 pb-16 gap-16 md:gap-32 overflow-hidden">
              {/* Left Column: BVA Logo */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/3 xl:w-1/4 flex justify-center px-6 md:px-0"
              >
                  <div className="w-2/3 md:w-full max-w-[350px]" style={{ transform: 'translate(15%, -7%)' }}>
                    <img src="/images/projects/logo bva.png" alt="BVA Academy Logo" className="w-full h-auto object-contain" />
                  </div>
              </motion.div>
              
              {/* Right Column: BVA Description */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="md:w-2/3 max-w-4xl flex flex-col justify-center"
              >
                {(proj as any).bvaDescription && (
                  <div className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80 whitespace-pre-line py-4 md:py-0">
                    {(proj as any).bvaDescription}
                  </div>
                )}
              </motion.div>
            </div>
          )}



          {/* Slide-in mirrored image — al vivo */}
          {proj.gallery.some(img => img.format === 'slide-left-mirror') && (
            <div className="-mx-6 md:-mx-12">
               <SlideInFromLeft
                 src={`${proj.gallery.find(img => img.format === 'slide-left-mirror')!.src}?v=2`}
                 mirrored={(proj.gallery.find(img => img.format === 'slide-left-mirror') as any).mirrored !== false}
                 extraTitle={(proj as any).extraTitle}
               />
            </div>
          )}

          {/* Interactive System Features Section — Below SlideIn Image */}
          {(proj as any).systemFeatures && (
            <InteractiveSystemFeatures features={(proj as any).systemFeatures} />
          )}
         

          {/* Context Image Left, Description Right */}
          {! (proj as any).introImage && ((proj as any).secondaryDescription || (proj as any).secondaryImage) && (
            <div className="flex flex-col-reverse md:flex-row items-stretch pt-8 pb-16 gap-8 md:gap-16">
              {/* Left Column: Context Image */}
              <div className="w-full md:w-1/3 relative -mx-6 md:-ml-12 md:mr-0 min-h-[60vw] md:min-h-0 overflow-hidden">
                {(proj as any).secondaryImage && (
                   <Image src={(proj as any).secondaryImage} alt="Context visualization" fill unoptimized className="object-cover" />
                )}
              </div>
              
              {/* Right Column: Description */}
              {(proj as any).secondaryDescription && (
                <div className="md:w-2/3 max-w-3xl flex flex-col justify-center">
                  <div className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black whitespace-pre-line py-4 md:py-0">
                    {(proj as any).secondaryDescription}
                  </div>
                </div>
              )}
            </div>
          )}
      </section>

      {/* 2. Hotspot Natural — Asymmetric Split Layout (Used by Take a Breath) */}
      {proj.gallery.some(img => img.format === 'hotspot-natural') && (
        <AnimatedImageWrapper>
          {(() => {
            const img = proj.gallery.find(i => i.format === 'hotspot-natural')!;
            return (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-white py-12 md:py-24 px-6 md:px-12">
                <div className="flex justify-center items-center relative">
                    <div className="w-full max-h-[85vh] flex justify-center items-center overflow-hidden">
                       <HotspotImage 
                         src={`${img.src}?v=2`} 
                         hotspots={(img as any).hotspots || []} 
                         className="max-w-full max-h-[85vh] w-auto h-auto"
                         onActiveHSChange={setActiveHotspot}
                         hideOverlay={true}
                       />
                    </div>
                </div>

                {/* Right half: Detail View */}
                <div className="hidden md:flex justify-center items-center px-12 relative min-h-[50vh]">
                   <AnimatePresence>
                     {activeHotspot && (
                       <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: 20 }}
                         className="w-full max-w-md flex flex-col gap-6"
                       >
                          <div className="w-full h-auto flex items-center justify-center">
                             <img src={`${activeHotspot.detailSrc}?v=2`} alt="Detail" className="w-full h-auto object-contain" />
                          </div>
                          <div className="flex flex-col gap-4">
                             {activeHotspot.title && (
                               <h4 className="text-xs font-mono font-bold text-black uppercase tracking-[0.3em] border-b border-black/10 pb-3">
                                 {activeHotspot.title}
                               </h4>
                             )}
                             {activeHotspot.text && (
                               <p className="text-sm text-black/70 leading-relaxed font-sans">
                                 {activeHotspot.text}
                               </p>
                             )}
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            );
          })()}
        </AnimatedImageWrapper>
      )}

      {/* 3. Cinematic High-Gap Gallery Flow */}
      <section className="w-full flex flex-col gap-12 md:gap-32 pb-40">
        {proj.gallery.map((img, idx) => {
          if (img.format === 'grid-5-black-right') {
            const images = (img as any).images;
            const captions = (img as any).captions || [];
            
            return (
              <div key={idx} className="w-full px-6 md:px-12 mt-10 md:mt-20 flex flex-col gap-20">
                {/* First Row: 7.png and 10 2.png */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  {images.slice(0, 2).map((src: string, i: number) => {
                    const is7 = src.includes('7.png');
                    const is10_2 = src.includes('10 2.png');
                    const widthClass = is7 ? 'w-[110%] max-w-none' : is10_2 ? 'w-[55%]' : 'w-full';
                    const caption = captions[i];

                    return (
                      <div key={i} className="w-full flex flex-col items-center gap-8">
                        <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative">
                          <img src={src} alt="Detail" className={`h-auto object-contain ${widthClass}`} />
                          {is7 && (
                            <img 
                              src="/images/projects/9.png" 
                              alt="Overlay Detail" 
                              className="absolute left-[75%] md:left-[65%] top-0 w-[36%] h-auto drop-shadow-2xl z-30"
                            />
                          )}
                        </div>
                        {caption && (
                          <div className="w-full max-w-sm md:max-w-md flex flex-col gap-3 self-center mt-4 relative z-20">
                             <h4 className="text-[10px] md:text-xs font-mono font-bold text-black uppercase tracking-[0.3em] border-b border-black/10 pb-2">
                               {caption.title}
                             </h4>
                             <p className="text-xs md:text-sm text-black/70 leading-relaxed font-sans whitespace-pre-line">
                               {caption.text}
                             </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Second Row: 15.png, [11.png + 11b.png], 14.png */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-[100vw] mx-auto w-full px-6 md:px-12 mt-10 md:mt-20">
                  {/* Left: 15.png */}
                  <motion.div 
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                    className="md:col-span-4 flex items-center justify-center order-2 md:order-1"
                  >
                    <div className="p-4 md:p-6 bg-white border border-black/5 shadow-sm w-[85%] origin-left">
                      <img src="/images/projects/15.png?v=2" alt="Detail Left" className="w-full h-auto object-contain" />
                    </div>
                  </motion.div>

                  {/* Center: The Overlapping Pair + Caption */}
                  <div className="md:col-span-4 flex flex-col order-1 md:order-2 relative z-20">
                    <div className="flex-1 flex flex-row justify-center items-center w-full gap-[40px] translate-y-[15%]">
                      {images.slice(2, 4).map((src: string, i: number) => {
                        const is11 = src.includes('11.png');
                        const is11b = src.includes('11b.png');
                        // Scaled width and translate to match previous col-span-6 impact + reduction for 11
                        const widthClass = is11 ? 'w-[127%] translate-y-[-10%]' : is11b ? 'w-[207%] max-w-none translate-y-[-15%]' : 'w-full';

                        return (
                          <div key={i+2} className={`w-1/2 flex flex-col items-center gap-8 ${is11b ? 'relative z-10' : ''}`}>
                            <div className="w-full flex items-center justify-center relative">
                              <img src={src} alt="Detail" className={`h-auto max-w-none ${widthClass}`} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Aligned Caption (matches side frames bottom) */}
                    {captions[2] && (
                      <div className="w-full flex justify-center mt-auto pb-4 md:pb-6">
                        <div className="w-full max-sm md:max-w-md flex flex-col gap-3 text-center relative z-20">
                           <h4 className="text-[10px] md:text-xs font-mono font-bold text-black uppercase tracking-[0.3em] border-b border-black/10 pb-2 mx-auto w-full">
                             {captions[2].title}
                           </h4>
                           <p className="text-xs md:text-sm text-black/70 leading-relaxed font-sans whitespace-pre-line">
                             {captions[2].text}
                           </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: 14.png */}
                  <motion.div 
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                    className="md:col-span-4 flex items-center justify-center order-3"
                  >
                    <div className="p-4 md:p-6 bg-white border border-black/5 shadow-sm w-[85%] origin-right">
                      <img src="/images/projects/14.png?v=2" alt="Detail Right" className="w-full h-auto object-contain" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          } else if (img.format === 'slide-left-mirror') {
             return null;
          } else if (img.format === 'natural') {
             return (
                <div key={idx} className="-mx-6 md:-mx-12 relative z-0" style={{ marginTop: (img as any).mt || 0 }}>
                  <div style={{ transform: (img as any).innerY ? `translateY(${(img as any).innerY}px)` : 'none' }}>
                    <div style={{ lineHeight: 0, position: 'relative' }} className="flex justify-center bg-white py-12 md:py-24">
                      <div className="max-w-full max-h-[85vh] w-auto h-auto">
                        <NaturalImage src={`${img.src}?v=2`} />
                      </div>
                      
                      {/* Overlays (Specific for projects like The Blister) */}
                      {(proj as any).overlays && (proj as any).overlays.map((overlay: string, i: number) => (
                        <div 
                          key={i} 
                          className="absolute z-20 drop-shadow-2xl"
                          style={{ 
                            left: i === 0 ? '0' : '32%', 
                            top: '5%', 
                            width: '32%', 
                          }}
                        >
                          <img 
                            src={overlay} 
                            alt={`Overlay ${i + 1}`} 
                            style={{ width: '100%', height: 'auto', display: 'block' }} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             );
          } else if (img.format === 'compare') {
             return (
               <div key={idx} className="w-full px-6 md:px-12 flex flex-col gap-12 md:gap-16 pt-8">
                 {(img as any).description && (
                   <div className="w-full flex justify-end">
                     <div className="md:w-2/3 max-w-3xl text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black whitespace-pre-line">
                       {(img as any).description}
                     </div>
                   </div>
                 )}
                 <div className={`w-full ${ (img as any).hasBg ? 'bg-[#f7f7f7]' : '' }`}>
                   <ImageComparisonSlider 
                      srcBase={img.src} 
                      srcOverlay={(img as any).overlaySrc} 
                      aspect={(img as any).aspect || "aspect-auto"}
                      objectPosition={(img as any).objectPosition || "center"}
                    />
                 </div>
               </div>
             );
          } else if (img.format === 'two-col-images') {
             return (
               <div key={idx} className="w-full px-6 md:px-12 py-12 md:py-20" style={{ paddingBottom: "calc(5rem + 40px)" }}>
                 <div className="w-full flex">
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                     transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                     style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                   >
                     <img src={img.src} alt="Visual" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                     {(img as any).caption && (
                       <div className="w-full mt-4">
                         <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black whitespace-pre-line">
                           {(img as any).caption}
                         </p>
                       </div>
                     )}
                   </motion.div>
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                     transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                     style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                   >
                     <img src={(img as any).overlaySrc} alt="Visual" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                     {(img as any).captionRight && (
                       <div className="w-full mt-4">
                         <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black">
                           {(img as any).captionRight}
                         </p>
                       </div>
                     )}
                   </motion.div>
                 </div>
               </div>
             );
          } else if (img.format === 'interactive-slider') {
             return <InteractiveImageSlider key={idx} slides={(img as any).slides} interval={(img as any).interval} />;
          } else if (img.format === 'side-by-side') {
             return (
               <div key={idx} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-6 md:px-12 mt-10 md:mt-20">
                 <HotspotImage src={img.src} hotspots={(img as any).hotspots || []} />
                 <HotspotImage src={(img as any).overlaySrc} hotspots={(img as any).hotspots || []} />
               </div>
             )
          } else if (img.format === 'description') {
            return (
              <div key={idx} className="w-full px-6 md:px-12 mt-6 md:mt-12 mb-10 md:mb-20 relative z-10">
                {(img as any).title && (
                  <div className="w-full mb-8 md:mb-12">
                    <h2 className="font-bold tracking-tighter uppercase leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                      {(img as any).title}
                    </h2>
                    <div className="w-full h-px bg-black/10 mt-8 mb-12" />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                  <div>
                    <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black whitespace-pre-line">
                      {img.text?.split(/(\*\*.*?\*\*)/g).map((part: string, i: number) => 
                        part.startsWith('**') && part.endsWith('**') 
                          ? <strong key={i} className="font-bold">{part.slice(2, -2)}</strong> 
                          : part
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black whitespace-pre-line md:text-right">
                      {(img as any).text2?.split(/(\*\*.*?\*\*)/g).map((part: string, i: number) => 
                        part.startsWith('**') && part.endsWith('**') 
                          ? <strong key={i} className="font-bold">{part.slice(2, -2)}</strong> 
                          : part
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )
          } else if (img.format === 'full') {
             return (
                <div key={idx} className="-mx-6 md:-mx-12" style={{ marginTop: (img as any).mt !== undefined ? (img as any).mt : -20 }}>
                  <ParallaxImage 
                    src={img.src} 
                    aspectRaw="aspect-[4/5] md:aspect-video lg:aspect-[16/7]" 
                    innerY={(img as any).innerY}
                  />
                </div>
             )
          } else if (img.format === 'components-section') {
             return (
               <div key={idx} className="w-full flex flex-col px-6 md:px-12 -mt-[110px]">
                 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                   <div className="flex justify-center items-center">
                     <HotspotImage 
                       src={img.src} 
                       hotspots={(img as any).hotspots || []} 
                       className={`${(img as any).baseWidth || 'w-[130%] min-w-[130%]'} shrink-0 max-w-none h-auto object-contain`}
                       style={(img as any).maskEdges ? { maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)', WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)' } : undefined}
                       onActiveHSChange={setActiveHotspot}
                       hideOverlay={true}
                     />
                   </div>
                   <div className="hidden md:flex justify-center items-center px-12 relative min-h-[50vh]">
                     <AnimatePresence>
                       {activeHotspot && (
                         <motion.div
                           key={activeHotspot.title}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: 20 }}
                           className={`w-full max-w-md flex flex-col ${ (img as any).detailBg === 'white' ? 'bg-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-sm border border-neutral-100 overflow-hidden' : 'gap-6' }`}
                         >
                            {activeHotspot.detailSrc && (
                              <div className={(img as any).detailBg === 'white' ? "w-full aspect-[16/10] bg-neutral-50 relative overflow-hidden" : "w-full h-auto flex items-center justify-center"}>
                                 <img 
                                   src={`${activeHotspot.detailSrc}?v=2`} 
                                   alt="Detail" 
                                   className={(img as any).detailBg === 'white' ? "absolute inset-0 w-full h-full object-cover" : "w-full h-auto object-contain"} 
                                   style={{ 
                                     objectPosition: activeHotspot.objectPosition || 'center center',
                                     transform: `${activeHotspot.scale ? `scale(${activeHotspot.scale})` : ''} ${(activeHotspot as any).offsetX ? `translateX(${(activeHotspot as any).offsetX}px)` : ''} ${(activeHotspot as any).offsetY ? `translateY(${(activeHotspot as any).offsetY}px)` : ''}`.trim() || 'none', 
                                     transformOrigin: 'center' 
                                   }}
                                 />
                              </div>
                            )}
                            <div className={(img as any).detailBg === 'white' ? "p-6 md:p-10 flex flex-col gap-4 bg-white" : "flex flex-col gap-4"}>
                               {activeHotspot.title && (
                                 <h4 className={`${(img as any).detailBg === 'white' ? 'text-[10px] md:text-xs' : 'text-xs'} font-mono font-bold text-black uppercase tracking-[0.3em] border-b border-black/10 pb-3`}>
                                   {activeHotspot.title}
                                 </h4>
                               )}
                               {activeHotspot.text && (
                                 <p className={`${(img as any).detailBg === 'white' ? 'text-xs md:text-sm' : 'text-sm'} text-black/70 leading-relaxed font-sans`}>
                                   {activeHotspot.text}
                                 </p>
                               )}
                            </div>
                            {(img as any).detailBg === 'white' && (
                              <div className="py-2 px-4 bg-black flex justify-between items-center mt-auto">
                                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-[0.2em]">Mechanical Insight</span>
                                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Detail View</span>
                              </div>
                            )}
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 </div>
               </div>
             )
          } else if (img.format === 'specs-table') {
             return (
               <div key={idx} className="w-full px-6 md:px-12 py-20 -mt-[50px]">
                 <div className="w-full max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                   {/* Left Column: Title and Caption */}
                   <div className="flex flex-col">
                     {(img as any).tableTitle && (
                       <h3 className="font-bold tracking-tighter uppercase leading-none mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                         {(img as any).tableTitle}
                       </h3>
                     )}
                     {(img as any).tableCaption && (
                       <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80 max-w-md mt-2">
                         {(img as any).tableCaption}
                       </p>
                     )}
                   </div>

                   {/* Right Column: Table */}
                   <div className="flex flex-col w-full">
                     {(img as any).tableData?.map((row: any, i: number) => (
                       <div key={i} className="flex flex-col md:flex-row py-6 border-t border-black/10 first:border-t-2 last:border-b last:border-b-2 gap-4 md:gap-8">
                         <div className="w-full md:w-1/3 shrink-0">
                           <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">{row.title}</h4>
                         </div>
                         <div className="w-full md:w-2/3">
                           <p className="text-sm md:text-base text-black/70 leading-relaxed font-sans">{row.desc}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             )
          } else if (img.format === 'text-section') {
             return (
               <div key={idx} className="w-full px-6 md:px-12 py-20">
                 <div className="w-full max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                   {/* Left Column: Image */}
                   <div className="w-full">
                     {img.src ? (
                       <img src={img.src} alt={(img as any).title || "Section Image"} className="w-[160%] max-w-none h-auto object-cover -ml-[30%] relative z-0" />
                     ) : (
                       <div className="hidden md:block" />
                     )}
                   </div>
                   
                   {/* Right Column: Title and Text */}
                   <div className="w-full flex flex-col relative z-10 pointer-events-none">
                     {(img as any).title && (
                       <h3 className="font-bold tracking-tighter uppercase leading-none mb-6 text-right w-full pointer-events-auto" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                         {(img as any).title}
                       </h3>
                     )}
                     {img.text && (
                       <div className="w-full pointer-events-auto">
                         <p className="text-xl md:text-3xl font-medium tracking-tight leading-[1.3] text-black/80 whitespace-pre-line text-right">
                           {img.text}
                         </p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )
          } else if (img.format === 'half-L') {
             return (
               <div key={idx} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-12">
                 <ParallaxImage src={img.src} aspectRaw="aspect-square md:aspect-[3/4]" />
                 <div className="hidden md:block"/>
               </div>
             )
          } else if (img.format === 'half-R') {
             return (
               <div key={idx} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-12">
                 <div className="hidden md:block"/>
                 <ParallaxImage src={img.src} aspectRaw="aspect-square md:aspect-[3/4]" />
               </div>
             )
          } else if (img.format === 'asym-left') {
             return (
               <div key={idx} className="w-full grid grid-cols-1 md:grid-cols-12 px-6 md:px-12">
                 <div className="md:col-span-8">
                   <ParallaxImage src={img.src} aspectRaw="aspect-[4/3] md:aspect-[16/9]" />
                 </div>
               </div>
             )
          } else if (img.format === 'setup-timeline') {
             return (
               <div key={idx} className="w-full px-6 md:px-12 py-20 md:py-32">
                 <div className="w-full flex items-end justify-between mb-16" style={{ paddingBottom: '25px' }}>
                   <h2 className="font-bold tracking-tighter uppercase leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginTop: '-25px' }}>SET UP</h2>
                   <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-40 mb-1">4 steps</span>
                 </div>
                  <div className="w-full h-px bg-black/10 mb-16" />
                  <SetupTimeline steps={(img as any).steps || []} />
               </div>
             );
          } else if (img.format === 'asym-right') {
             return (
               <div key={idx} className="w-full grid grid-cols-1 md:grid-cols-12 px-6 md:px-12 md:pt-32">
                 <div className="md:col-start-6 md:col-span-7">
                   <ParallaxImage src={img.src} aspectRaw="aspect-square md:aspect-[4/3]" />
                 </div>
               </div>
             )
          }
        })}
      </section>

      {/* PDF Presentation Animated Link Slider */}
      {(proj as any).pdfPresentation && (
        <a 
          href={(proj as any).pdfPresentation} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block w-full bg-white text-black py-8 md:py-16 overflow-hidden cursor-none relative border-t border-black/10 hover:bg-black hover:text-white transition-colors duration-500"
        >
          <motion.div 
            className="flex gap-16 md:gap-32 items-center whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            {/* Duplicated massive text array to create an infinite loop impression */}
            {[...Array(12)].map((_, i) => (
              <span key={i} className="text-5xl md:text-[6.5rem] lg:text-[8.5rem] font-bold tracking-tighter leading-none mix-blend-difference group-hover:italic transition-all duration-700 ease-out flex items-center gap-2 md:gap-4">
                MORE <BoldArrow className="w-[0.7em] h-[0.7em] translate-y-[0.02em]" />
              </span>
            ))}
          </motion.div>
        </a>
      )}

      {/* 4. Project Selection Carousel Footer */}
      <div className="w-full bg-black text-white relative pointer-events-auto py-24 md:py-32">
         {/* Decorative blurred background orb */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white opacity-[0.02] blur-3xl rounded-full mix-blend-screen" />
         </div>
         
         <div className="w-full relative z-10 flex flex-col gap-12">
           <div className="px-6 md:px-12 flex justify-between items-end">
             <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-50">MORE PROJECTS</span>
             <span className="font-mono text-xs opacity-30">SCROLL TO EXPLORE</span>
           </div>
           
           <div className="w-full flex gap-4 md:gap-8 px-6 md:px-12 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar cursor-ew-resize">
             {Object.entries(PROJECT_DB).map(([pid, p]) => {
               if (pid === slug) return null; // Nascondi il progetto corrente
               
               return (
                 <Link 
                   href={`/projects/${pid}`} 
                   key={pid}
                   className="snap-center shrink-0 w-[70vw] h-[87.5vw] md:w-[350px] md:h-[437px] lg:w-[450px] lg:h-[562px] relative group bg-neutral-900 rounded-sm overflow-hidden"
                 >
                   <div className="w-full h-full relative overflow-hidden transition-all duration-700 ease-out group-hover:scale-[0.98] opacity-60 group-hover:opacity-100">
                     <Image 
                       src={p.cover} 
                       alt={p.title} 
                       fill 
                       unoptimized 
                       className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                     />
                     {/* Overlay gradient for text legibility */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     {/* Text content revealed on hover */}
                     <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 transform translate-y-4 group-hover:translate-y-0">
                       <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">{p.title}</h3>
                       <p className="font-mono text-xs tracking-widest uppercase opacity-70 mt-2">{p.client}</p>
                     </div>
                   </div>
                 </Link>
               );
             })}
           </div>
         </div>
      </div>
    </div>
  );
}
