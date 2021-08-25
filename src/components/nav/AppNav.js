import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AppNav = () => {
  const [optionSelected, setOptionSelected] = useState('/');
  return (
    <>
      <div className="app-logo">
        <Link className={optionSelected === '/' ? 'selected-link ' : ''} onClick={() => setOptionSelected('/')} to="/">Macaco Logo</Link>
      </div>
      <ul>
        <li>
          <Link className={optionSelected === '/comics' ? 'selected-link ' : ''}  onClick={() => setOptionSelected('/comics')} to="/comics">Comics</Link>
        </li>
        <li>
          <Link className={optionSelected === '/characters' ? 'selected-link ' : ''}  onClick={() => setOptionSelected('/characters')} to="/characters">Characters</Link>
        </li>
      </ul>
    </>
  );
};

export default AppNav;
