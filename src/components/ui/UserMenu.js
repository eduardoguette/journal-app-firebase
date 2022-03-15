import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../actions/auth';
import user from '../../assets/icons/user.svg';

export const UserMenu = () => {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogOut());
  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div layout className='relative ' onHoverEnd={() => setShowMenu(!showMenu)} onHoverStart={() => setShowMenu(!showMenu)}>
      <button className='flex items-center gap-2 px-4 py-3 text-sm transition-all ease-linear'>
        <img src={user} alt='Icono sol' height={20} width={20} />
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.ul
            initial={{ scale: 0, translateY:"-50%" }}
            animate={{ scale: 1,translateY:"0%"}}
            exit={{ scale: 0,translateY:"-50%" }}
            transition={{ type: 'spring', duration: 0.4 }}
            className='absolute -bottom-[160%]   flex-col gap-1 pt-2 pb-1 bg-white border rounded shadow-md position right-[3%] w-max'
          >
            <li>
              <span className='px-4 py-2 text-sm font-light '> {name}</span>
            </li>
            <li>
              <button onClick={handleLogout} className='w-full px-4 py-2 text-sm font-light text-left hover:bg-indigo-200'>
                Logout
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
