import React from 'react';
import PropTypes from 'prop-types';
import './Templates.css';
import Mask from './Mask';

const Card = ({
  header, children, footer, image,
  className, refValue,
}) => (
  <div ref={refValue} className={`card-container ${className}`}>
    {header && (<div className="card-header">{header}</div>)}
    <div style={{backgroundImage: `url(${image})` }} className="card-children">
      <Mask>
        {children}
      </Mask>
    </div>
    {footer && (<div className="card-footer">{footer}</div>)}
  </div>
);

Card.defaultProps = {
  header: null,
  children: null,
  footer: null,
  className: '',
  refValue: null,
  image: '',
};

Card.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.string,
  refValue: PropTypes.oneOfType([
    // Either a function
    PropTypes.func, 
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};

export default Card;
