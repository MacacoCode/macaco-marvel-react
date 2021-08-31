import React, { useCallback, useContext, useEffect, useRef, useState  } from 'react';
import Loading from '../components/animations/Loading';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import Card from '../components/templates/Card';
import Image from '../components/templates/Image';
import { API_KEY, MARVEL_API } from '../constants';
import useFetch from '../hooks/useFetch';
import { store } from '../store';
import './GridPages.css';

const limit = 16;

const ComicsPage = () => {
    const { state: { comics = [] }, dispatch } = useContext(store);
    const [offset, setOffset] = useState(0);
    const [fetchData, setFetchData] = useState(false);
    const [data, setData] = useState([]);
    const { data: { results }, loading, error, status } = useFetch(`${MARVEL_API}/v1/public/comics${API_KEY}&offset=${offset}&limit=${limit}`, fetchData);
    const compareDataParams = (length, offst, lmt) => {
        return length < (offst + lmt);
    };

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
            setData((currState) => {
                const res = [...currState, ...results];
                dispatch({ actionType: 'ADDTOSTATE', type: 'comics', payload: res })
                return res;
            });
        }
    }, [results]);
    if (loading && data.length === 0) return <SpidermanAnimation loading={true} />
    return (
      <div className="grid-page">
        {data && data.length > 0 && data.map((res, index) => {
            if (data.length === index + 1) {
                return (
                    <Card 
                        refValue={lasItemElementRef}
                        className="grid-page-item"
                        key={res.id}
                        header={res.title}
                    >
                        <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                    </Card>
                )
            }
            return (
                <Card
                    className="grid-page-item"
                    key={res.id}
                    header={res.title}
                >
                    <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.name} />
                </Card>
            )}
        )}
        {loading && <Loading />}
      </div>
    );
}

export default ComicsPage;
