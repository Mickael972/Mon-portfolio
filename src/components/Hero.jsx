import { motion } from 'framer-motion'
import { useState } from 'react'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour gérer les erreurs du Canvas
  const handleCanvasError = () => {
    console.warn("Erreur Canvas détectée, passage au mode fallback");
    setShowFallback(true);
    setIsLoading(false);
  };

  // Fonction pour gérer la fin du chargement
  const handleCanvasReady = () => {
    setIsLoading(false);
  };

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* Background principal - toujours présent pour éviter les flashs */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          // Background de base toujours présent
          background: 'linear-gradient(135deg, #050816 0%, #151030 50%, #050816 100%)',
          minHeight: '100vh',
          willChange: 'auto',
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Background pattern qui se superpose */}
      <div 
        className="absolute inset-0 w-full h-full bg-hero-pattern bg-cover bg-center bg-no-repeat"
        style={{
          opacity: showFallback ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          minHeight: '100vh',
        }}
      />
      
      {/* Overlay de chargement pour éviter les flashs sur Android */}
      {isLoading && !showFallback && (
        <div 
          className="absolute inset-0 z-5"
          style={{
            background: 'linear-gradient(135deg, #050816 0%, #151030 50%, #050816 100%)',
            opacity: 0.8,
            transition: 'opacity 0.5s ease-out',
          }}
        />
      )}
      
      {/* Contenu principal - amélioré pour petits écrans */}
      <div className={`${styles.paddingX} absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto flex flex-col sm:flex-row items-start gap-3 sm:gap-5 z-10 px-4 sm:px-6`}>
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5 flex-shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className='w-1 h-20 sm:h-40 md:h-80 violet-gradient' />
        </div>

        <div className="flex-1 w-full overflow-hidden">
          <h1 className="font-black text-white text-[28px] xs:text-[40px] sm:text-[60px] lg:text-[80px] leading-[32px] xs:leading-[45px] sm:leading-[70px] lg:leading-[98px] mt-2">
            <span className="block sm:inline">Bonjour, je suis </span>
            <span className="text-[#915eff] block sm:inline">Mickael</span>
          </h1>
          <p className="text-[#dfd9ff] font-medium text-[14px] xs:text-[16px] sm:text-[26px] lg:text-[30px] leading-[18px] xs:leading-[20px] sm:leading-[32px] lg:leading-[40px] mt-2 max-w-full">
            Développeur junior passionné <br className="hidden sm:block" />
            <span className="block sm:inline">en recherche de stage pour m'épanouir.</span>
          </p> 
        </div>
      </div>
      
      {/* Canvas avec positionnement correct */}
      {!showFallback ? (
        <div className="absolute inset-0 z-0">
          <ComputersCanvas 
            onError={handleCanvasError}
            onReady={handleCanvasReady}
          />
        </div>
      ) : (
        // Fallback uniquement si WebGL ne fonctionne pas du tout
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div 
            className="w-full h-full opacity-20"
            style={{
              background: `
                radial-gradient(circle at 70% 60%, rgba(145, 94, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 30% 80%, rgba(145, 94, 255, 0.2) 0%, transparent 40%)
              `,
            }}
          />
        </div>
      )}

      {/* Indicateur de scroll - amélioré pour petits écrans */}
      <div className="absolute bottom-8 xs:bottom-10 w-full flex justify-center items-center z-20">
        <a href='#about'>
          <div className='w-[28px] h-[50px] xs:w-[35px] xs:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2 h-2 xs:w-3 xs:h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero