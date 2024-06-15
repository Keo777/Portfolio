// components/Scene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MovingSpotLight from './SpotLight';

const Scene = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.2} />
      <MovingSpotLight />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;