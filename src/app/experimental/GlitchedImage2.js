import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

// Extend the objects into the React Three Fiber namespace
extend({ GlitchPass, EffectComposer, RenderPass });

function GlitchEffect({ image }) {
  const { gl, scene, camera } = useThree();
  const composer = useRef();
  const texture = useLoader(TextureLoader, image);

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));
    const glitchPass = new GlitchPass();
    composer.current.addPass(glitchPass);
  }, [gl, scene, camera]);

  useFrame(() => {
    composer.current.render();
  }, 1);

  return (
    <>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
      <OrbitControls />
    </>
  );
}

function GlitchCanvas({ image }) {
  return (
    <Canvas style={{ background: 'transparent' }} gl={{ alpha: true }}>
      <GlitchEffect image={image} />
    </Canvas>
  );
}

export default GlitchCanvas;