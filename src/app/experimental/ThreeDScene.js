import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/shaders';

function BoxWithCutout({ onBoxMove }) {
  const boxRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 700, height: 700, depth: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      const { innerWidth, innerHeight } = window;
      const aspectRatio = innerWidth / innerHeight;
      setDimensions({ width: aspectRatio * 700, height: 700, depth: 400 });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial call to set dimensions
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (event.clientX / innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / innerHeight) * 2 + 1;
    
      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY); // Calculate distance from the center
    
      // Adjust the scale factor dynamically based on the distance from the center
      const scale = 0.2 + 0.3 * distanceFromCenter; // Adjust the constants as needed
    
      if (boxRef.current) {
        boxRef.current.rotation.y = mouseX * scale;
        boxRef.current.rotation.x = mouseY * scale;
        onBoxMove(boxRef.current.rotation);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onBoxMove]);

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
  });

  return (
    <group ref={boxRef}>
      <mesh position={[0, 0, -dimensions.depth / 2]} geometry={new THREE.BoxGeometry(dimensions.width, dimensions.height, 10)} material={shaderMaterial} />
      <mesh position={[-dimensions.width / 2, 0, 0]} geometry={new THREE.BoxGeometry(10, dimensions.height, dimensions.depth)} material={shaderMaterial} />
      <mesh position={[dimensions.width / 2, 0, 0]} geometry={new THREE.BoxGeometry(10, dimensions.height, dimensions.depth)} material={shaderMaterial} />
      <mesh position={[0, -dimensions.height / 2, 0]} geometry={new THREE.BoxGeometry(dimensions.width, 10, dimensions.depth)} material={shaderMaterial} />
      <mesh position={[0, dimensions.height / 2, 0]} geometry={new THREE.BoxGeometry(dimensions.width, 10, dimensions.depth)} material={shaderMaterial} />
    </group>
  );
}

export default function ThreeDScene() {
  const [divTransform, setDivTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleBoxMove = (rotation) => {
    const scale = 1; // Adjust the scale factor to control the sensitivity of movement
    setDivTransform({
      rotateX: THREE.MathUtils.radToDeg(rotation.x) * scale,
      rotateY: THREE.MathUtils.radToDeg(rotation.y) * scale
    });
  };

  return (
    <>
      <Canvas style={{ height: '100vh', width: '100vw' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 1000]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BoxWithCutout onBoxMove={handleBoxMove} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          left: '50.5%',
          bottom: '19%',
          width: '63.5%', // Match the bottom face width
          height: '62%', // Match the bottom face depth
          transform: `translate(-50%, 0) rotate3d(1, 0, 0, ${divTransform.rotateX}deg) rotate3d(0, 1, 0, ${divTransform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '5px',
          pointerEvents: 'none', // Allow mouse events to pass through
        }}
      >
        Follow Me
      </div>
    </>
  );
}