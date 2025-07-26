import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { github } from '../assets'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const isInDevelopment = name === "Projet Web3" || name === "Projet IoT";

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full min-h-[500px] flex flex-col'
      >
        <div className='relative w-full h-[230px] cursor-pointer'>
          {isInDevelopment ? (
            <div className='w-full h-full bg-black-100 rounded-2xl flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-white text-4xl mb-2'>🚧</div>
                <p className='text-white text-lg font-bold'>En cours de</p>
                <p className='text-white text-lg font-bold'>développement</p>
                <p className='text-secondary text-sm mt-2'>Projet en construction</p>
              </div>
            </div>
          ) : (
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
          )}

          {!isInDevelopment && (
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          )}
        </div>

        <div className='mt-5 flex-1 flex flex-col'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] flex-1'>{description}</p>
          {isInDevelopment && (
            <p className='mt-2 text-[#915eff] text-[12px] font-medium'>
              ⏳ Projet en cours de développement
            </p>
          )}
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

export default ProjectCard 