import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface CachedData<T> {
  lastFetched: number;
  data: T;
}

interface UseFetchResult<T> {
  data: T | undefined;
  error: string | null;
  isLoading: boolean;
}

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig
): UseFetchResult<T> => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }

    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem<CachedData<T>>(storageKey);

      if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      try {
        const response = await api.get<T>(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, storageKey, url]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;
