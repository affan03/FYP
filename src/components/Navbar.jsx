import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import title3 from '../images/title3.png';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  useEffect(() => {
    // You can log here to see if the component reacts to changes.
    console.log("Auth state changed: ", auth);
  }, [auth]); // Listening on auth object itself to catch any changes
  

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { id: 1, link: "Home", path: '/' },
    { id: 2, link: "How It Works", path: '/howitworks' },
    { id: 3, link: "My Profile", path: '/profile' },
  ];

  return (
    <div className="flex justify-between items-center w-full h-14 bg-white text-white fixed top-0 z-30">
      <div className='-mx-20'>
        <img src={title3} alt='' className='cursor-pointer w-96 h-80' />
      </div>

      <ul className="hidden md:flex">
        {links.slice(0, auth.isAuthenticated ? 3 : 2).map(({ id, link, path }) => (
          <li key={id} className="px-4">
            <Link to={path} className='cursor-pointer capitalize font-medium text-lg text-gray-700 hover:scale-105 duration-200'>
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        {auth.isAuthenticated ? (
          <>
            <span className="mr-4 text-black text-lg font-bold">Hello {auth.userName.toUpperCase()} </span> {/* Display the correct user's name */}
            <button onClick={handleLogOut} className="rounded-md text-white bg-blue-800 px-3 font-semibold mr-4 text-sm border py-1 hover:bg-white hover:text-black">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="rounded-md text-white bg-blue-800 px-3 font-semibold mr-4 text-sm border py-1 hover:bg-white hover:text-black">Log In</button>
            <button onClick={() => navigate('/login?signup=true')} className="rounded-md text-black px-3 font-semibold mr-4 text-sm border py-1 border-black hover:bg-blue-800 hover:text-white">Sign Up</button>
          </>
        )}
      </div>

      <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 md:hidden z-10 text-black">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black">
          {links.slice(0, auth.isAuthenticated ? 3 : 2).map(({ id, link, path }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl" onClick={() => setNav(!nav)}>
              <Link to={path} className='cursor-pointer capitalize py-6 text-4xl'>{link}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
