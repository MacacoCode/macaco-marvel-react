import React from 'react';
import './Templates.css';

const Image = ({ ...props }) => (<img style={{ visibility: 'hidden' }} className="image" {...props} />);

export default Image;