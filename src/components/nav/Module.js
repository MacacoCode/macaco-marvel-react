import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CharactersPage from '../../pages/CharactersPage';
import ComicsPage from '../../pages/ComicsPage';
import HomePage from '../../pages/HomePage';

const Module = () => {
  const { module } = useParams();
  const [child, setChild] = useState(null);
  const switchChild = (mod) => {
    switch (mod) {
      case 'comics': return ComicsPage;
      case 'characters': return CharactersPage;
      default: return HomePage;
    }
  }
  useEffect(() => {
    const result = switchChild(module);
    setChild(result)
  }, [module]);
  return child;
};

export default Module;
