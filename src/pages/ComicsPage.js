import React from 'react';
import Loading from '../components/animations/Loading';
import SpidermanAnimation from '../components/animations/SpidermanAnimation';

const ComicsPage = () => {

    return (
        <>
        <SpidermanAnimation loading={<Loading />} />
        </>
    );
}

export default ComicsPage;
