//useFetch.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultData = { results: [] };

function useFetch(url, flag, options = {}) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    if (flag) {
      setLoading(true)
      setData(defaultData);
      setError(null);
      fetch(url, { ...options, signal })
        .then((res) => {
          setStatus(res.status);
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          if (res.data) setData(res.data)
          if (!res.data) setData(res);
        })
        .catch((err) => {
          setLoading(false);
          setError('An error occurred. Awkward..');
        });
    }
    return () => {
      controller.abort();
    }
  }, [flag]);

  return { data, loading, error, status };
};

export default useFetch;
