import React from 'react';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';
import Card from '../components/templates/Card';
import Image from '../components/templates/Image';
import { API_KEY, MARVEL_API } from '../constants';
import useFetch from '../hooks/useFetch';
import './GridPages.css';

const ComicsPage = () => {
    const { data: { results }, loading, error, status } = useFetch(`${MARVEL_API}/v1/public/comics${API_KEY}&offset=0&limit=16`)
    if (loading) return <SpidermanAnimation loading={true} />
    console.log(results, error, status);
    return (
      <div className="grid-page">
        {results && results.length > 0 && results.map((res) => (
            <Card
                className="grid-page-item"
                key={res.id}
                header={res.title}
            >
                <Image src={`${res.thumbnail.path}.${res.thumbnail.extension}`} alt={res.title} />
            </Card>
        ))}
      </div>
    );
}

export default ComicsPage;
