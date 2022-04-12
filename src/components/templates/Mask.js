import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '../icons/StarIcon';

const hidden = 0;
const visible = 1;


const Mask = ({ iconClassName, onClickFavorite, children }) => {
  const [maskComponentsStyle, setMaskComponentsStyle] = useState({ transition: 'all 0.4s ease-in-out', opacity: hidden });
  const handleMouseOver = (e) => {
    setMaskComponentsStyle((prevState) => ({ ...prevState, opacity: visible }));
  };
  const handleMouseLeave = (e) => {
    setMaskComponentsStyle((prevState) => ({ ...prevState, opacity: hidden }));
  };
  return (
    <>  
      <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} className='mask'>
        <div style={maskComponentsStyle} className='mask-components'>
          <span onClick={onClickFavorite} className={iconClassName}>
            <StarIcon />
          </span>
        </div>
        {children}
      </div>
    </>
  );
};

Mask.defaultProps = {
  children: null,
  onClickFavorite: null,
  iconClassName: '',
};

Mask.propTypes = {
  children: PropTypes.node,
  onClickFavorite: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default Mask;
