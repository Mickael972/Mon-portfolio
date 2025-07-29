import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);

  // Diagnostic WebGL simplifié
  useEffect(() => {
    const testWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.warn("⚠️ WebGL non supporté - mode fallback activé");
          setShowFallback(true);
          setIsLoading(false);
          return false;
        }
        console.log("✅ WebGL disponible");
        return true;
      } catch (e) {
        console.warn("⚠️ Erreur WebGL:", e.message);
        setShowFallback(true);
        setIsLoading(false);
        return false;
      }
    };

    setTimeout(testWebGL, 100);
  }, []);

  // Fonction pour gérer les erreurs du Canvas
  const handleCanvasError = () => {
    if (!showFallback) {
      console.warn("❌ Erreur Canvas - passage en mode fallback");
      setShowFallback(true);
      setIsLoading(false);
    }
  };

  // Fonction pour gérer la fin du chargement (éviter les doublons)
  const handleCanvasReady = () => {
    if (!canvasReady) {
      console.log("✅ Canvas 3D prêt");
      setCanvasReady(true);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Bonjour, je suis <span className="text-[#915eff]">Mickael</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Développeur junior passionné <br className="sm:block hidden" />
            en recherche de stage pour m'épanouir.
          </p>
        </div>
      </div>

      {/* Canvas 3D */}
      {!showFallback && (
        <ComputersCanvas 
          onError={handleCanvasError}
          onReady={handleCanvasReady}
        />
      )}

      {/* Fallback visuel pour Android */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-full h-full opacity-20"
            style={{
              background: `
                radial-gradient(circle at 70% 60%, rgba(145, 94, 255, 0.4) 0%, transparent 60%),
                radial-gradient(circle at 30% 80%, rgba(145, 94, 255, 0.3) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero