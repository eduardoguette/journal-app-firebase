import React from 'react'; 
import { motion } from 'framer-motion';
import hamburger from '../../assets/icons/hamburger.svg'; 
import sun from '../../assets/icons/sun.svg';
import plus from '../../assets/icons/plus.svg';
import fav from '../../assets/icons/fav.svg';
import home from '../../assets/icons/home.svg'; 

export const SideBar = ({ setViewSideBar, viewSideBar }) => {


  return (
    <>
      <div onClick={() => setViewSideBar((prev) => !prev)} className='fixed top-0 z-10 w-full min-h-screen bg-gray-900 bg-opacity-50 md:hidden '></div>
      <motion.aside
        className='shadow-md pt-3 left-0 top-0 min-h-screen z-20 bg-gray-100 min-w-[200px] md:min-w-[250px]  absolute lg:relative'
        initial={{ translateX: '-100%' }}
        animate={{ translateX: '0%' }}
        transition={{ type: 'spring', duration: 0.4 }}
        exit={{ translateX: '0' }}
      >
        <header className='flex items-center justify-between p-5 '>
          <button onClick={() => setViewSideBar((prev) => !prev)}>
            {viewSideBar && <img src={hamburger} alt='Icono de luna' className='w-6 h-6 -ml-1' />}
          </button>
        </header>
        <nav className=''>
          <ul className='flex flex-col'>
            <li>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm transition-all ease-linear hover:bg-indigo-200'>
                <img src={sun} alt='Icono sol' height={20} width={20} />
                My day
              </button>
            </li>
            <li>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm transition-all ease-linear hover:bg-indigo-200'>
                <img src={fav} alt='Icono sol' height={20} width={20} />
                Important
              </button>
            </li>
            <li>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm transition-all ease-linear hover:bg-indigo-200'>
                <img src={home} alt='Icono sol' height={20} width={20} />
                Tasks
              </button>
            </li>
            <li className=''>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm text-indigo-500 transition-all ease-linear'>
                <img src={plus} alt='Icono sol' height={20} width={20} />
                Nueva lista
              </button>
            </li>
          </ul>
        </nav>
      </motion.aside>
    </>
  );
};
