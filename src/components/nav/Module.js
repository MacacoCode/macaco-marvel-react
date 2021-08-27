import React from 'react';
import { useParams } from 'react-router';
import CharactersPage from '../../pages/CharactersPage';
import ComicsPage from '../../pages/ComicsPage';
import HomePage from '../../pages/HomePage';

const Module = () => {
  const { module } = useParams();
  switch (module) {
    case 'comics': return <ComicsPage />;
    case 'characters': return <CharactersPage />;
    default: return <HomePage />;
  }
};

export default Module;
