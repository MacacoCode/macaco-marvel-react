import React, { useCallback, useContext, useEffect, useRef, useState  } from 'react';
import Loading from '../components/animations/Loading';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import CustomCard from '../components/CustomCard';
import Image from '../components/templates/Image';
import Searchbar from '../components/templates/Searchbar';
import useFetch from '../hooks/useFetch';
import { store } from '../store';
import checkFavorite from '../utilities/checkFavorite';
import { compareDataParams } from '../utilities/compareDataParams';
import './GridPages.css';
const { REACT_APP_API_KEY, REACT_APP_MARVEL_API }  = process.env;

const limit = 16;

const ComicsPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [titleParam, setTitleParam] = useState('');
    const { state: { comics = [], favoriteComics }, dispatch } = useContext(store);
    const [offset, setOffset] = useState(0);
    const [fetchData, setFetchData] = useState(false);
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const { data: { results, total }, loading, error, status } = useFetch(
        `${REACT_APP_MARVEL_API}/v1/public/comics?apikey=${REACT_APP_API_KEY}&offset=${offset}&limit=${limit}${titleParam}`, fetchData
    );

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
        dispatch({ actionType: 'ADDFAVORITE', type: 'favoriteComics', payload })
    };

    const setSearchParams = (val = '') => {
        let title = '';
        if (val.length > 0) {
            title = `&titleStartsWith=${val}`;
        }
        return { title };
    };

    const handleOnSearch = async () => {
        const { title } = setSearchParams(inputValue);
        await setTitleParam(title);
        await setData([]);
        await setOffset(0);
        setFetchData(true);
    };

    const handleInputChange = (e) => {
        const { target: { value } } = e;
        setInputValue(value);
    };

    useEffect(() => {
        if (compareDataParams(comics.length, offset, limit)) setFetchData(true);
        setData(comics);
        setOffset(comics.length || 0);
    }, []);

    useEffect(() => {
        if (loading === false) setFetchData(false);
    }, [loading]);

    useEffect(() => {
        if (results && results.length > 0 && status === 200) {
            const res = [...data, ...results];
            setData(res);
            setDataTotal(total);
            dispatch({ actionType: 'ADDTOSTATE', type: 'comics', payload: res });
        }
    }, [results]);
    if (loading && data.length === 0) return <SpidermanAnimation loading={true} />
    return (
      <>
        <div className="searchbar-positioning">
            <Searchbar
                placeholder="Search a Comic!"
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
                            iconClassName={checkFavorite(res, favoriteComics) ? 'selected-star favorite-icon' : "favorite-icon"}
                            title={res.title}
                            key={`${res.id}-${index}`}
                            onClickFavorite={() => handleAddToFavorites(res)}
                        >
                            <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.title} />
                        </CustomCard>
                    )
                }
                return (
                    <CustomCard
                        cardClassName="grid-page-item"
                        iconClassName={checkFavorite(res, favoriteComics) ? 'selected-star favorite-icon' : "favorite-icon"}
                        title={res.title}
                        key={`${res.id}-${index}`}
                        onClickFavorite={() => handleAddToFavorites(res)}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.title} />
                    </CustomCard>
                )}
            )}
            {loading && <Loading />}
        </div>
      </>
    );
}

export default ComicsPage;
