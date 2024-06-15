export const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Calculate a simple shading effect based on the normal and position
    float depth = abs(vPosition.z) / 200.0; // Adjust the divisor to match the depth of your scene
    vec3 color = vec3(0.3, 0.5, 1.0) * (1.0 - depth); // Gradient color effect
    gl_FragColor = vec4(color, 1.0);
  }
`;