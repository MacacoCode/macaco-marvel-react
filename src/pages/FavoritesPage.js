import React, { useContext } from 'react';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import CustomCard from '../components/CustomCard';
import Image from '../components/templates/Image';
import { store } from '../store';
import './FavoritesPage.css';

const FavoritesPage = () => {
    const { state: { favoriteComics, favoriteCharacters }, dispatch } = useContext(store);
    if (!favoriteCharacters && !favoriteComics) return <SpidermanAnimation />
    return (
        <div className="favorites-page">
            <div className="favorites-comics">
                <div className="favorites-page-title">Comics</div>
                {favoriteComics ? favoriteComics.map((res) => (
                    <CustomCard
                        cardClassName="favorites-page-item"
                        iconClassName="favorite-icon"
                        title={res.title}
                        key={res.id}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.title} />
                    </CustomCard>
                )) : (
                    <SpidermanAnimation />
                )}
            </div>
            <div className="favorites-characters">
                <div className="favorites-page-title">Characters</div>
                {favoriteCharacters ? favoriteCharacters.map((res) => (
                    <CustomCard
                        cardClassName="favorites-page-item"
                        iconClassName="favorite-icon"
                        title={res.name}
                        key={res.id}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                    </CustomCard>
                )) : (
                    <SpidermanAnimation />
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
