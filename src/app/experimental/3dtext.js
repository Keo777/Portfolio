import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDTextThree = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Add OrbitControls for better interaction
    const controls = new OrbitControls(camera, renderer.domElement);

    // Load the font
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      // Create text geometry
      const geometry = new TextGeometry('3D Text', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      // Create a material
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      // Create a mesh and add it to the scene
      const text = new THREE.Mesh(geometry, material);
      scene.add(text);

      // Animation loop
      const animate = () => {
        
        renderer.render(scene, camera);
      };
      animate();
    });

    // Handle window resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
};

export default ThreeDTextThree;