
const { REACT_APP_API_KEY, REACT_APP_MARVEL_API } = process.env;
export const getApiData = async (toFetch = '') => {
  const data = fetch(`${REACT_APP_MARVEL_API}${toFetch}?apikey=${REACT_APP_API_KEY}`)
    .then((res) => res.json());
  
}