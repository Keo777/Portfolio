import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

const GlitchedImage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera;
    let composer, glitchPass;
    let planeMesh, imageTexture;

    const init = () => {
      // Create renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Create scene
      scene = new THREE.Scene();

      // Create camera
      camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.z = 1;

      // Load image texture
      imageTexture = new THREE.TextureLoader().load('/images/keoniis-25.png', (texture) => {
        imageTexture = texture;

        // Create shader material
        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            tDiffuse: { value: imageTexture },
            time: { value: 0.0 }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D tDiffuse;
            uniform float time;
            void main() {
              vec2 uv = vUv;
              uv.x += sin(uv.y * 100.0 + time * 10.0) * 0.01;
              vec4 color = texture2D(tDiffuse, uv);
              gl_FragColor = color;
            }
          `
        });

        // Create plane geometry
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
        scene.add(planeMesh);

        // Resize plane to fill container
        resizePlaneToFit();

        // Create composer and glitch pass
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        glitchPass = new GlitchPass();
        composer.addPass(glitchPass);

        // Event listener for hover effect
        containerRef.current.addEventListener('mouseenter', () => {
          glitchPass.enabled = true;
        });

        containerRef.current.addEventListener('mouseleave', () => {
          glitchPass.enabled = false;
        });

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          shaderMaterial.uniforms.time.value += 0.01;
          composer.render();
        };

        animate();
      });

      // Handle window resize
      window.addEventListener('resize', onWindowResize, false);
    };

    const onWindowResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      resizePlaneToFit();
    };

    const resizePlaneToFit = () => {
      if (!imageTexture) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const imageAspect = imageTexture.image.width / imageTexture.image.height;
      const containerAspect = containerWidth / containerHeight;

      let scaleX, scaleY;
      if (containerAspect > imageAspect) {
        scaleX = containerAspect / imageAspect;
        scaleY = 1;
      } else {
        scaleX = 1;
        scaleY = imageAspect / containerAspect;
      }

      planeMesh.scale.set(scaleX, scaleY, 1);
    };

    init();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default GlitchedImage;