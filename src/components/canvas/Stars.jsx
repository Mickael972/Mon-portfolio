import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => {
    try {
      // Générer des positions de manière plus sûre
      // 4998 = 1666 points * 3 coordonnées (nombre divisible par 3)
      const positions = new Float32Array(4998);
      
      // Méthode alternative sans maath pour éviter les NaN
      for (let i = 0; i < positions.length; i += 3) {
        // Générer une position aléatoire dans une sphère
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 1.2; // Radius 1.2
        
        positions[i] = r * Math.sin(phi) * Math.cos(theta);     // x
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i + 2] = r * Math.cos(phi);                   // z
        
        // Vérification de sécurité
        if (isNaN(positions[i]) || !isFinite(positions[i])) positions[i] = 0;
        if (isNaN(positions[i + 1]) || !isFinite(positions[i + 1])) positions[i + 1] = 0;
        if (isNaN(positions[i + 2]) || !isFinite(positions[i + 2])) positions[i + 2] = 0;
      }
      
      return positions;
    } catch (error) {
      console.warn("Erreur lors de la génération des étoiles, utilisation de valeurs par défaut:", error);
      // Fallback : positions fixes
      const fallbackPositions = new Float32Array(4998);
      for (let i = 0; i < fallbackPositions.length; i += 3) {
        fallbackPositions[i] = (Math.random() - 0.5) * 2.4;
        fallbackPositions[i + 1] = (Math.random() - 0.5) * 2.4;
        fallbackPositions[i + 2] = (Math.random() - 0.5) * 2.4;
      }
      return fallbackPositions;
    }
  });

  useFrame((state, delta) => {
    if (ref.current) {
      try {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
      } catch (error) {
        console.warn("Erreur lors de l'animation des étoiles:", error);
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        onError={(error) => {
          console.warn("Erreur Three.js dans StarsCanvas:", error);
        }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;