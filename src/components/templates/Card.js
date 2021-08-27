import React from 'react';
import PropTypes from 'prop-types';
import './Templates.css';

const Card = ({
  header, children, footer,
  className,
}) => (
  <div className={`card-container ${className}`}>
    {header && (<div className="card-header">{header}</div>)}
    <div className="card-children">{children}</div>
    {footer && (<div className="card-footer">{footer}</div>)}
  </div>
);

Card.defaultProps = {
  header: null,
  children: null,
  footer: null,
  className: '',
};

Card.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
