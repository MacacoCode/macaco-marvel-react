import React from 'react';
import PropTypes from 'prop-types';
import './Templates.css';

const Searchbar = ({ onInputChange, onSearch }) => (
  <div className="searchbar-container">
    <div className="searchbar-input">
      <input onChange={onInputChange}></input>
    </div>
    <div className="searchbar-search">
      <button onClick={onSearch}>GO!</button>
    </div>
  </div>
);

Searchbar.defaultProps = {
  onSearch: () => {},
  onInputChange: () => {},
};

Searchbar.propTypes = {
  onSearch: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default Searchbar;
