import React from 'react';
import PropTypes from 'prop-types';
import './SpidermanAnimation.css';

const SpidermanAnimation = ({ loading }) => (
    <div id="spiderman-container">
        <img className="spiderman" src="https://i.ibb.co/XDFkXMx/spiderman-colgado.png" alt="spiderman-ani" />
        {loading}
        <div className="shadow"></div>
    </div>
);
SpidermanAnimation.defaultProps = {
  loading: <></>,
}

SpidermanAnimation.propTypes = {
  loading: PropTypes.node,
}

export default SpidermanAnimation;

