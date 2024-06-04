import React from "react";
import parseCSV from "../utils/parseCSV";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async (url) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url);
      json = await response.text();
      json = parseCSV(json)
      if (!response.ok) throw new Error("Error");
      setData(json);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    request,
    loading,
    error,
  };
};

export default useFetch;
