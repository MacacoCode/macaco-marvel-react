import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from './icons/StarIcon';
import Card from './templates/Card';

const CustomCard = ({ cardClassName, iconClassName, image, title, children, refValue, onClickFavorite }) => (
    <Card
        refValue={refValue}
        className={cardClassName}
        /*header={(
            <>
                {title}
                <span onClick={onClickFavorite} className={iconClassName}>
                    <StarIcon />
                </span>
            </>
        )}*/
        image={image}
    >
        {children}
    </Card>
);

CustomCard.defaultProps = {
    cardClassName: '',
    iconClassName: '',
    title: null,
    children: null,
    refValue: null,
    onClickFavorite: () => {},
    image: '',
};

CustomCard.propTypes = {
    cardClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.node,
    children: PropTypes.node,
    image: PropTypes.string,
    refValue: PropTypes.oneOfType([
        // Either a function
        PropTypes.func, 
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
      ]),
    onClickFavorite: PropTypes.func,
};

export default CustomCard;
