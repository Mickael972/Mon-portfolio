import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ProjectCard from "./ProjectCard";

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Mes Projets </p>
        <h2 className={`${styles.sectionHeadText}`}>Projets.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Les projets suivants illustrent mes compétences et mon expérience à travers des exemples concrets de mon travail.
          Chaque projet est brièvement décrit et accompagné de liens vers des dépôts de code et des démonstrations en direct.
          Il reflète ma capacité à résoudre des problèmes complexes, à travailler avec différentes technologies et à gérer des projets efficacement.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");