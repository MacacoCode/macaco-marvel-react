import React, { useContext } from 'react';
import CustomCard from '../components/CustomCard';
import Image from '../components/templates/Image';
import { store } from '../store';
import './FavoritesPage.css';

const FavoritesPage = () => {
    const { state: { favoriteComics, favoriteCharacters }, dispatch } = useContext(store);
    return (
        <div className="favorites-page">
            <div className="favorites-comics">
                {favoriteComics && favoriteComics.map((res) => (
                    <CustomCard
                        cardClassName="favorites-page-item"
                        iconClassName="favorite-icon"
                        title={res.title}
                        key={res.id}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.title} />
                    </CustomCard>
                ))}
            </div>
            <div className="favorites-characters">
                {favoriteCharacters && favoriteCharacters.map((res) => (
                    <CustomCard
                        cardClassName="favorites-page-item"
                        iconClassName="favorite-icon"
                        title={res.name}
                        key={res.id}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                    </CustomCard>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
