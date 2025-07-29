import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

// Fonction pour détecter le support WebGL
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

// Fonction pour détecter Android
const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

const Hero = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isAndroidDevice, setIsAndroidDevice] = useState(false);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
    setIsAndroidDevice(isAndroid());
  }, []);

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* Version améliorée pour mobile avec fallback */}
      <div 
        className="absolute inset-0 w-full h-full bg-hero-pattern bg-cover bg-center bg-no-repeat"
        style={{
          // Fallback pour les appareils qui ne chargent pas l'image correctement
          background: !webGLSupported || isAndroidDevice 
            ? 'linear-gradient(135deg, #050816 0%, #151030 50%, #050816 100%)' 
            : undefined,
          // Assurer une hauteur minimale sur Android
          minHeight: isAndroidDevice ? '100vh' : 'auto',
          // Améliorer les performances sur mobile
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
      
      {/* Canvas avec détection WebGL et fallback */}
      {webGLSupported && !isAndroidDevice ? (
        <ComputersCanvas />
      ) : (
        // Fallback pour Android ou appareils sans WebGL
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

      {/* Indicateur de scroll amélioré pour mobile */}
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