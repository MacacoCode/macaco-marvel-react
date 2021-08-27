//useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
      setLoading(true)
      setData(null);
      setError(null);
      fetch(url, { ...options, signal })
      .then((res) => {
          setStatus(res.status);
          return res.json();
      })
      .then((res) => {
          setLoading(false);
          //checking for multiple responses for more flexibility 
          //with the url we send in.
          res.data.content && setData(res.data.content);
          res.content && setData(res.content);
      })
      .catch((err) => {
          setLoading(false)
          setError('An error occurred. Awkward..')
      })
      return () => {
        controller.abort();
      }
  }, [url])

  return { data, loading, error, status };
};

export default useFetch;