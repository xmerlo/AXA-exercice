import { useState, useRef, useCallback } from "react";
import axios from "axios";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef(null);

  const sendRequest = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      cancelTokenRef.current = axios.CancelToken.source();

      const response = await axios({
        ...config,
        cancelToken: cancelTokenRef.current.token,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendRequest, data, loading, error };
};

export default useAxios;
