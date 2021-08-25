import React from 'react';
import HeaderCharacters from './HeaderCharacters';
import HeaderComics from './HeaderComics';

const AppHeader = () => {
  return (
    <div className="app-header">
      <HeaderComics />
      <HeaderCharacters /> 
    </div>
  );
};

export default AppHeader;
