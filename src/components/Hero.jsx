import { motion } from 'framer-motion'
import { useState } from 'react'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

const Hero = () => {
  const [showFallback, setShowFallback] = useState(false);

  // Fonction pour gérer les erreurs du Canvas
  const handleCanvasError = () => {
    console.warn("Erreur Canvas détectée, passage au mode fallback");
    setShowFallback(true);
  };

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* Background avec image hero */}
      <div 
        className="absolute inset-0 w-full h-full bg-hero-pattern bg-cover bg-center bg-no-repeat"
        style={{
          // Fallback gradient seulement si vraiment nécessaire
          background: showFallback 
            ? 'linear-gradient(135deg, #050816 0%, #151030 50%, #050816 100%)' 
            : undefined,
          // Assurer une hauteur minimale sur mobile
          minHeight: '100vh',
          // Améliorer les performances
          willChange: 'auto',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />
      
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
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
      
      {/* Canvas avec positionnement correct */}
      {!showFallback ? (
        <div className="absolute inset-0 z-0">
          <ComputersCanvas onError={handleCanvasError} />
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

      {/* Indicateur de scroll */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
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