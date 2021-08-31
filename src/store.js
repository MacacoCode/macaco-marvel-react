import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const store = createContext({
  state: { comics: [], characters: [], favorites: [] },
  dispatch: ({ actionType, type, payload = { id } }) => {}
});

const { Provider } = store;

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer((state, { actionType, type, payload = { id } }) => {
    switch (actionType) {
        case 'INITIALIZE':
          return payload;
        case 'ADDFAVORITE':
          localStorage.setItem(`${type}-${id}`, payload);
        case 'ADDTOSTATE':
          return {
            ...state,
            [type]:  [...payload],
          };
        case 'REMOVEFAVORITE':
          localStorage.removeItem(`${type}-${id}`);
        case 'REMOVE':
          return state[type].filter((item) => item.id !== id && item.type !== type);
        default:
          throw new Error();
    };
  }, []);
  return (
    <Provider value={{ state, dispatch }}>{children}</Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StoreProvider;