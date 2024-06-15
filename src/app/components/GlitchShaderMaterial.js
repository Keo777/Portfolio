// components/GlitchShaderMaterial.js
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const GlitchShaderMaterial = shaderMaterial(
  { u_time: 0 },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader with glitch effect
  `
    uniform float u_time;
    varying vec2 vUv;

    // Simple random function
    float random(float x) {
      return fract(sin(x) * 43758.5453123);
    }

    // 2D random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;

      // Glitch effect parameters
      float strength = 0.5;
      float distortion = sin(uv.y * 10.0 + u_time * 5.0) * strength;

      // Offset UV coordinates
      uv.x += distortion * random(uv.y * u_time);
      uv.y += distortion * random(uv.x * u_time);

      // Glitched color
      vec3 color = vec3(uv.x, uv.y, 0.5);
      
      // Apply glitch effect with color shift
      if (random(uv + u_time) < 0.1) {
        color = vec3(1.0, 0.0, 0.0); // Red glitch
      } else if (random(uv + u_time) < 0.2) {
        color = vec3(0.0, 1.0, 0.0); // Green glitch
      } else if (random(uv + u_time) < 0.3) {
        color = vec3(0.0, 0.0, 1.0); // Blue glitch
      }

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ GlitchShaderMaterial });

export default GlitchShaderMaterial;