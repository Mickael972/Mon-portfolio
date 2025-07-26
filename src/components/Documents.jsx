import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const DocumentCard = ({ index, title, description, icon, downloadLink, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full cursor-pointer hover:scale-105 transition-transform duration-300'
      onClick={handleDownload}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='text-white text-4xl'>{icon}</div>
          <div>
            <h3 className='text-white font-bold text-[20px]'>{title}</h3>
            <p className='text-secondary text-[14px] mt-1'>{description}</p>
          </div>
        </div>
        <div className='text-white text-2xl'>⬇️</div>
      </div>
    </motion.div>
  );
};

const Documents = () => {
  const documents = [
    {
      title: "CV Mickael Juste",
      description: "Curriculum Vitae - Développeur Junior",
      icon: "📄",
      downloadLink: "/documents/Mickael Juste CV.pdf",
      fileName: "Mickael-Juste-CV.pdf"
    },
    {
      title: "Lettre de recommandation 1",
      description: "Recommandation - Ludovic Butet (AtooSystem)",
      icon: "📋",
      downloadLink: "/documents/lettre-recommandation-1.pdf",
      fileName: "Lettre-Recommandation-1.pdf"
    },
    {
      title: "Lettre de recommandation 2", 
      description: "Recommandation - Charlotte Dressayre (DCSeasyware)",
      icon: "📋",
      downloadLink: "/documents/lettre-recommandation-2.pdf",
      fileName: "Lettre-Recommandation-2.pdf"
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Mes Documents</p>
        <h2 className={`${styles.sectionHeadText}`}>CV & Recommandations.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Téléchargez mon CV et mes lettres de recommandation pour en savoir plus sur mon parcours et mes compétences.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {documents.map((document, index) => (
          <DocumentCard key={`document-${index}`} index={index} {...document} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Documents, "documents"); 