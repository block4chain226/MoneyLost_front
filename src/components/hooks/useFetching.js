import { useState } from "react";

export const useFetching = (callback) => {
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      await callback();
    } catch (error) {
      setError(error.messsage);
    } finally {
    }
  };

  return [fetching];
};
