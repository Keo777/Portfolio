import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Import necessary modules
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const ThreeDText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load font
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
      // Create text geometry
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 1,
        height: 0.1,
      });

      // Center the geometry
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      textGeometry.translate(-textWidth / 2, 0, 0);

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);

      // Calculate mouse position relative to the window
      const mouse = new THREE.Vector2();
      const maxRotationX = 0.2; // Maximum rotation on X axis (in radians)
      const maxRotationY = 0.2; // Maximum rotation on Y axis (in radians)
      const onMouseMove = event => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Limit the mouse position to a maximum rotation
        mouse.x = Math.max(-maxRotationX, Math.min(maxRotationX, mouse.x));
        mouse.y = Math.max(-maxRotationY, Math.min(maxRotationY, mouse.y));
      };
      window.addEventListener('mousemove', onMouseMove, false);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the text mesh based on the mouse position
        textMesh.rotation.y = mouse.x;
        textMesh.rotation.x = mouse.y;

        renderer.render(scene, camera);
      };

      animate();

      // Clean up
      return () => {
        renderer.dispose();
        scene.remove(textMesh);
        window.removeEventListener('mousemove', onMouseMove);
      };
    });
  }, [text]);

  return <div ref={containerRef} />;
};

export default ThreeDText;