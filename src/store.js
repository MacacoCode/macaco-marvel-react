import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const store = createContext({
  state: { comics: [], characters: [], favoriteComics: [], favoriteCharacters: [] },
  dispatch: ({ actionType, type, payload }) => {},
});

const { Provider } = store;

const StoreProvider = ({ children }) => {

  const addFavorite = (stt, type, payload) => {
    let result = stt;
    if (stt[type]) {
      stt[type].push(payload);
      result[type] = stt[type]
    } else {
      result[type] = [payload];
    }
    localStorage.removeItem(`${type}`);
    localStorage.setItem(`${type}`, JSON.stringify(result[type]));
    return result;
  };

  const removeFavorite = (stt, type, payload) => {
    let result = stt;
    if (stt[type]) {
      result[type] = result[type].filter((item) => item.id !== payload);
    }
    localStorage.removeItem(`${type}`);
    localStorage.setItem(`${type}`, JSON.stringify(result[type]));
    return result;
  };

  const [state, dispatch] = useReducer((state, { actionType, type, payload }) => {
    switch (actionType) {
        case 'INITIALIZE':
          return payload;
        case 'ADDFAVORITE':
          return addFavorite(state, type, payload);
        case 'ADDTOSTATE':
          return {
            ...state,
            [type]:  [...payload],
          };
        case 'REMOVEFAVORITE':
          return removeFavorite(state, type, payload);
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