import { motion } from 'framer-motion';

export const VisorImage = ({ imgAmpliar, setViewImage }) => {
  return (
    <>
      <div className='fixed inset-0 z-20 bg-black bg-opacity-20 backdrop-blur-sm' onClick={() => setViewImage((prev) => !prev)}></div>
      <motion.div layout className='absolute top-0 bottom-0 left-0 right-0 z-30 m-auto w-max h-max'>
        <motion.img animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0.1, opacity: 0 }} src={imgAmpliar} alt='Zoom de la imagen de la nota' />
      </motion.div>
    </>
  );
};
