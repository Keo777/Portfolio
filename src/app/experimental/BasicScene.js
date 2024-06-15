import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const BasicScene = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default BasicScene;