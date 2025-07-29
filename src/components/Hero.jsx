import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Diagnostic WebGL
  useEffect(() => {
    const testWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.warn("WebGL non supporté - passage en mode fallback");
          setShowFallback(true);
          setIsLoading(false);
          return false;
        }
        console.log("WebGL supporté ✓");
        return true;
      } catch (e) {
        console.warn("Erreur WebGL - passage en mode fallback:", e);
        setShowFallback(true);
        setIsLoading(false);
        return false;
      }
    };

    // Test WebGL avec délai pour Android
    setTimeout(testWebGL, 100);
  }, []);

  // Fonction pour gérer les erreurs du Canvas
  const handleCanvasError = () => {
    console.warn("Erreur Canvas détectée, passage au mode fallback");
    setShowFallback(true);
    setIsLoading(false);
  };

  // Fonction pour gérer la fin du chargement
  const handleCanvasReady = () => {
    console.log("Canvas 3D prêt ✓");
    setIsLoading(false);
  };

  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col justify-between">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary" />
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat"
        style={{ opacity: showFallback ? 0.7 : 1 }}
      />
      
      {/* Loading overlay */}
      {isLoading && !showFallback && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-tertiary to-primary opacity-80 z-5" />
      )}

      {/* Fallback background pour Android */}
      {showFallback && (
        <div className="absolute inset-0 z-1">
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 70% 60%, rgba(145, 94, 255, 0.4) 0%, transparent 60%),
                radial-gradient(circle at 30% 80%, rgba(145, 94, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(145, 94, 255, 0.2) 0%, transparent 40%)
              `,
            }}
          />
        </div>
      )}
      
      {/* Main content - simplified layout */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-20 pb-10">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
            {/* Left indicator */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-[#915eff]" />
              <div className="w-1 h-20 sm:h-40 lg:h-80 violet-gradient" />
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-4">
              <h1 className="font-black text-white leading-tight">
                <span className="block text-[24px] xs:text-[32px] sm:text-[48px] lg:text-[72px]">
                  Bonjour, je suis
                </span>
                <span className="block text-[28px] xs:text-[36px] sm:text-[52px] lg:text-[80px] text-[#915eff]">
                  Mickael
                </span>
              </h1>
              
              <p className="text-[#dfd9ff] font-medium max-w-2xl leading-relaxed">
                <span className="block text-[14px] xs:text-[16px] sm:text-[20px] lg:text-[26px]">
                  Développeur junior passionné
                </span>
                <span className="block text-[14px] xs:text-[16px] sm:text-[20px] lg:text-[26px]">
                  en recherche de stage pour m'épanouir.
                </span>
              </p>

              {/* Debug info - à supprimer après test */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-400 mt-4">
                  Debug: WebGL={showFallback ? '❌' : '✅'} | Loading={isLoading ? '⏳' : '✅'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      {!showFallback && (
        <div className="absolute inset-0 z-0">
          <ComputersCanvas 
            onError={handleCanvasError}
            onReady={handleCanvasReady}
          />
        </div>
      )}

      {/* Scroll indicator */}
      <div className="relative z-20 pb-8 flex justify-center">
        <a href='#about'>
          <div className='w-[28px] h-[50px] xs:w-[35px] xs:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-secondary'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero