import React from 'react';
import PropTypes from 'prop-types';
import './SpidermanAnimation.css';
import Loading from './Loading';

const SpidermanAnimation = ({ loading }) => (
    <div id="spiderman-container">
        <img className="spiderman" src="https://i.ibb.co/XDFkXMx/spiderman-colgado.png" alt="spiderman-ani" />
        {loading && <Loading />}
        <div className="shadow"></div>
    </div>
);
SpidermanAnimation.defaultProps = {
  loading: null,
}

SpidermanAnimation.propTypes = {
  loading: PropTypes.bool,
}

export default SpidermanAnimation;

