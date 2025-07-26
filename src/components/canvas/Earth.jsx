import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  // Validation pour éviter les erreurs NaN
  React.useEffect(() => {
    if (earth.scene) {
      try {
        earth.scene.traverse((child) => {
          if (child.geometry) {
            try {
              // Vérifier et corriger tous les attributs de géométrie
              Object.keys(child.geometry.attributes).forEach(attributeName => {
                const attribute = child.geometry.attributes[attributeName];
                if (attribute && attribute.array) {
                  for (let i = 0; i < attribute.array.length; i++) {
                    if (isNaN(attribute.array[i]) || !isFinite(attribute.array[i])) {
                      attribute.array[i] = 0;
                    }
                  }
                  attribute.needsUpdate = true;
                }
              });
              
              // Recalculer les bounding sphere et box de manière sécurisée
              child.geometry.computeBoundingSphere();
              child.geometry.computeBoundingBox();
            } catch (geometryError) {
              console.warn("Erreur lors de la correction de géométrie:", geometryError);
            }
          }
        });
      } catch (error) {
        console.warn("Erreur lors du traitement du modèle Earth:", error);
      }
    }
  }, [earth.scene]);

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onError={(error) => {
        console.warn("Erreur Three.js dans EarthCanvas:", error);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;