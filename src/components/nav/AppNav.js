import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../Logo';

const AppNav = () => {
  const { module } = useParams();
  return (
    <>
      <div className="app-logo">
        <Link className={module === 'home' ? 'selected-link ' : ''} to="/"><Logo /> </Link>
      </div>
      <ul>
        <li>
          <Link className={module === 'comics' ? 'selected-link ' : ''} to="/comics">Comics</Link>
        </li>
        <li>
          <Link className={module === 'characters' ? 'selected-link ' : ''}  to="/characters">Characters</Link>
        </li>
        <li>
          <Link className={module === 'favorites' ? 'selected-link ' : ''}  to="/favorites">Favorites</Link>
        </li>
      </ul>
    </>
  );
};

export default AppNav;
