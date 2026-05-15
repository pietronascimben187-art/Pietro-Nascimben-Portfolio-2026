'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Center } from '@react-three/drei';

interface ModelProps {
  url: string;
}

function GltfModel({ url }: ModelProps) {
  // useGLTF is a much more optimized and robust way to load models in React Three Fiber
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ModelViewer({ url }: ModelProps) {
  return (
    <div className="w-full h-[60vh] bg-neutral-100 rounded-xl overflow-hidden relative group">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 text-neutral-400 font-mono text-xs uppercase tracking-widest">
          LOADING 3D ENGINE...
        </div>
      }>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <Stage intensity={0.5} environment="city" shadows={false} adjustCamera={1.2}>
            <GltfModel url={url} />
          </Stage>
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0.5}
            enableZoom={true}
            makeDefault 
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] font-mono text-neutral-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        DRAG TO ROTATE / SCROLL TO ZOOM
      </div>
    </div>
  );
}

// Preload the specific model for performance
// useGLTF.preload('/images/projects/3D SERVE.glb');
