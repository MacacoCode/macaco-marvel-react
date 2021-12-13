import React, { useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Loading from '../components/animations/Loading';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import Card from '../components/templates/Card';
import Image from '../components/templates/Image';
import { store } from '../store';
import './HomePage.css';

const HomePage = () => {
  const { state: { favoriteComics, favoriteCharacters } } = useContext(store);
  const [lastComic, setLastComic] = useState(null);
  const [lastCharacter, setLastCharacter] = useState(null);
  useEffect(() => {
    setLastComic(favoriteComics[favoriteComics.length - 1]);
    setLastCharacter(favoriteCharacters[favoriteCharacters.length - 1]);
  }, []);
  return (
    <div className="home-page">
        <h1>Welcome to Macaco&apos;s Marvel App!</h1>
        <SpidermanAnimation />
        <div className="last-added">
          <div className='last-added-item'>
            <h2>Last Comic Added</h2>
            {!lastComic && <Loading />}
            {lastComic && (
              <Card
                header={lastComic.title}
                key={lastComic.id}
              >
                <Image src={`${lastComic.thumbnail.path}.${lastComic.thumbnail.extension}`} alt={lastComic.title} />
              </Card>
            )}
          </div>
          <div className='last-added-item'>
            <h2>Last Character Added</h2>
            {!lastCharacter && <Loading />}
            {lastCharacter && (
              <Card
                header={lastCharacter.name}
                key={lastCharacter.id}
              >
                <Image src={`${lastCharacter.thumbnail.path}.${lastCharacter.thumbnail.extension}`} alt={lastCharacter.title} />
              </Card>
            )}
          </div>
        </div>
    </div>
  );
}

export default HomePage;
