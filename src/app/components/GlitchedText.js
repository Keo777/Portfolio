// components/GlitchedText.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import GlitchShaderMaterial from './GlitchShaderMaterial';

const GlitchedText = ({ children }) => {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.getElapsedTime();
    }
  });

  return (
    <Text fontSize={1} anchorX="center" anchorY="middle">
      {children}
      <glitchShaderMaterial ref={materialRef} attach="material" />
    </Text>
  );
};

export default GlitchedText;