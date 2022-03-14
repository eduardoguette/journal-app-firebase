import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hamburger from '../../assets/icons/hamburger.svg';
import sun from '../../assets/icons/sun.svg';
import plus from '../../assets/icons/plus.svg';
import user from '../../assets/icons/user.svg';
import { startLogOut } from '../../actions/auth';

export const SideBar = ({ setViewSideBar }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogOut());
  };

  return (
    <>
      <div onClick={() => setViewSideBar((prev) => !prev)} className='fixed top-0 z-10 w-full min-h-screen bg-gray-900 bg-opacity-50 md:hidden '></div>
      <aside className='shadow-md pt-1 left-0 top-0 min-h-screen z-20 bg-gray-100 min-w-[200px] md:min-w-[250px]  absolute lg:relative'>
        <header className='flex items-center justify-between p-5 '>
          <button onClick={() => setViewSideBar((prev) => !prev)}>
            <img src={hamburger} alt='Icono de luna' height={24} width={24} />
          </button>
          <button onClick={handleLogout} className='text-sm hover:text-indigo-500'>
            Cerrar sesión
          </button>
        </header>
        <nav className=''>
          <ul className='flex flex-col'>
            <li>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm transition-all ease-linear hover:bg-indigo-200'>
                <img src={user} alt='Icono sol' height={20} width={20} />
                {name}
              </button>
            </li>
            <li>
              <button className='flex items-center w-full gap-2 px-4 py-3 text-sm transition-all ease-linear hover:bg-indigo-200'>
                <img src={sun} alt='Icono sol' height={20} width={20} />
                Mi día
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
      </aside>
    </>
  );
};
