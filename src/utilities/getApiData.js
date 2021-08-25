import { API_KEY, MARVEL_API } from "../constants"

export const getApiData = async (toFetch = '') => {
  const data = fetch(`${MARVEL_API}${toFetch}${API_KEY}`)
    .then((res) => res.json());
  
}