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
    const [inputValue, setInputValue] = useState('');
    const [nameParam, setNameParam] = useState('');
    const { state: { characters = [] }, dispatch } = useContext(store);
    const [offset, setOffset] = useState(0);
    const [fetchData, setFetchData] = useState(false);
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const { data: { results, total }, loading, error, status } = useFetch(`${MARVEL_API}/v1/public/characters${API_KEY}&offset=${offset}&limit=${limit}${nameParam}`, fetchData);

    const observer = useRef(null); 
    const lasItemElementRef = useCallback((node) => {
        if (loading) return;
        if (offset + limit >= dataTotal) return;
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

    const setSearchParams = (val = '') => {
        let name = '';
        if (val.length > 0) {
            name = `&nameStartsWith=${val}`;
        }
        return { name };
    };

    const handleOnSearch = async () => {
        const { name } = setSearchParams(inputValue);
        await setNameParam(name);
        await setData([]);
        await setOffset(0);
        setFetchData(true);
    };

    const handleInputChange = (e) => {
        const { target: { value } } = e;
        setInputValue(value);
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
            setDataTotal(total);
            dispatch({ actionType: 'ADDTOSTATE', type: 'characters', payload: res })
        }
    }, [results]);
    if (loading && data.length === 0) return <SpidermanAnimation loading={true} />
    return (
      <>
        <div className="searchbar-positioning">
            <Searchbar
                placeholder="Search a Character!"
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onSearch={handleOnSearch}
            />
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
