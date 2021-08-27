import React from 'react';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import { API_KEY, MARVEL_API } from '../constants';
import useFetch from '../hooks/useFetch';

const CharactersPage = () => {
    const { response, loading, error, status } = useFetch(`${MARVEL_API}/v1/public/characters${API_KEY}&offset=0&limit=16`)
    if (loading) return <SpidermanAnimation loading={true} />
    console.log(response, error, status);
    return (
        <>
        </>
    );
}

export default CharactersPage;
