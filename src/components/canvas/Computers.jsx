import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, onReady }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Validation pour éviter les erreurs NaN
  React.useEffect(() => {
    if (computer.scene) {
      try {
        computer.scene.traverse((child) => {
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
        
        // Signaler que le modèle est prêt après traitement
        if (onReady) {
          setTimeout(() => onReady(), 100); // Petit délai pour s'assurer que tout est rendu
        }
      } catch (error) {
        console.warn("Erreur lors du traitement du modèle Computer:", error);
      }
    }
  }, [computer.scene, onReady]);

  return (
    <mesh>
      <hemisphereLight intensity={3} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ onError, onReady }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    console.log("Mobile detected:", mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Gestion d'erreurs qui remonte au parent
  const handleCanvasError = (error) => {
    console.error("❌ Erreur WebGL détectée:", error);
    if (onError) {
      onError(error);
    }
  };

  // Callback quand le modèle est prêt
  const handleModelReady = () => {
    console.log("✅ Modèle 3D prêt");
    setModelReady(true);
    if (onReady) {
      onReady();
    }
  };

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: false, // Désactiver l'antialiasing pour les performances sur mobile
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={({ gl, scene, camera }) => {
        console.log("🎮 Canvas créé");
        // Test WebGL au moment de la création
        try {
          const extension = gl.getExtension('WEBGL_debug_renderer_info');
          if (extension) {
            const renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
            console.log('GPU Renderer:', renderer);
          }
          console.log('WebGL Version:', gl.getParameter(gl.VERSION));
          console.log('Canvas size:', gl.canvas.width, 'x', gl.canvas.height);
        } catch (error) {
          console.warn("Impossible de détecter le GPU:", error);
          // Ne pas déclencher onError pour ça, c'est juste informatif
        }
      }}
      onError={handleCanvasError}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          enableDamping={true}
          dampingFactor={0.1}
          autoRotate={false}
          enableRotate={true}
          enablePan={false}
        />
        <Computers 
          isMobile={isMobile} 
          onReady={handleModelReady}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;