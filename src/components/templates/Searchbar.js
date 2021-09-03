import React from 'react';
import PropTypes from 'prop-types';
import './Templates.css';

const Searchbar = ({ onInputChange, onSearch, placeholder, inputValue }) => (
  <div className="searchbar-container">
    <div className="searchbar-input">
      <input
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={onInputChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            onSearch(e);
          }
        }}
      />
    </div>
    <div className="searchbar-search">
      <button onClick={onSearch}>GO!</button>
    </div>
  </div>
);

Searchbar.defaultProps = {
  onSearch: () => {},
  onInputChange: () => {},
  placeholder: '',
  inputValue: '',
};

Searchbar.propTypes = {
  onSearch: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
};

export default Searchbar;
