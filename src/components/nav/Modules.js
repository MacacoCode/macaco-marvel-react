import React from 'react';
import { useParams } from 'react-router';
import CharactersPage from '../../pages/CharactersPage';
import ComicsPage from '../../pages/ComicsPage';
import FavoritesPage from '../../pages/FavoritesPage';
import HomePage from '../../pages/HomePage';

const Modules = () => {
  const { module } = useParams();
  switch (module) {
    case 'comics': return <ComicsPage />;
    case 'characters': return <CharactersPage />;
    case 'favorites': return <FavoritesPage />;
    default: return <HomePage />;
  }
};

export default Modules;
