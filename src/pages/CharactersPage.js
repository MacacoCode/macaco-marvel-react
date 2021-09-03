import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/animations/Loading';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import CustomCard from '../components/CustomCard';
import Image from '../components/templates/Image';
import Searchbar from '../components/templates/Searchbar';
import { API_KEY, MARVEL_API } from '../constants';
import useFetch from '../hooks/useFetch';
import { store } from '../store';
import { compareDataParams } from '../utilities/compareDataParams';
import './GridPages.css';

const limit = 16;

const CharactersPage = () => {
    const { state: { characters = [] }, dispatch } = useContext(store);
    const [offset, setOffset] = useState(0);
    const [fetchData, setFetchData] = useState(false);
    const [data, setData] = useState([]);
    const { data: { results }, loading, error, status } = useFetch(`${MARVEL_API}/v1/public/characters${API_KEY}&offset=${offset}&limit=${limit}`, fetchData);

    const observer = useRef(null); 
    const lasItemElementRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setOffset((currState) => currState + limit);
                if (compareDataParams(data.length, offset, limit)) setFetchData(true);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    const handleAddToFavorites = (payload) => {
        dispatch({ actionType: 'ADDFAVORITE', type: 'favoriteCharacters', payload })
    };

    useEffect(() => {
        if (compareDataParams(characters.length, offset, limit)) setFetchData(true);
        setData(characters);
        setOffset(characters.length || 0);
    }, []);

    useEffect(() => {
        if (loading === false) setFetchData(false);
    }, [loading]);

    useEffect(() => {
        if (results && results.length > 0 && status === 200) {
            const res = [...data, ...results];
            setData(res);
            dispatch({ actionType: 'ADDTOSTATE', type: 'characters', payload: res })
        }
    }, [results]);
    if (loading && data.length === 0) return <SpidermanAnimation loading={true} />
    return (
      <>
        <div className="searchbar-positioning">
            <Searchbar />
        </div>
        <div className="grid-page">
            {data && data.length > 0 && data.map((res, index) => {
                if (data.length === index + 1) {
                    return (
                        <CustomCard
                            refValue={lasItemElementRef}
                            cardClassName="grid-page-item"
                            iconClassName="favorite-icon"
                            title={res.name}
                            key={`${res.id}-${index}`}
                            onClickFavorite={() => handleAddToFavorites(res)}
                        >
                            <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                        </CustomCard>
                    )
                }
                return (
                    <CustomCard
                        cardClassName="grid-page-item"
                        iconClassName="favorite-icon"
                        title={res.name}
                        key={`${res.id}-${index}`}
                        onClickFavorite={() => handleAddToFavorites(res)}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                    </CustomCard>
                )}
            )}
            {loading && <Loading />}
        </div>
      </>
    );
}

export default CharactersPage;
