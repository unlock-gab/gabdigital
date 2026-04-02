import { useState, useEffect, useCallback } from "react";
import { getSiteData, setSiteData } from "@/lib/api";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    getSiteData<T>(key, storedValue).then((apiValue) => {
      if (apiValue !== null && apiValue !== undefined) {
        setStoredValue(apiValue);
        try {
          window.localStorage.setItem(key, JSON.stringify(apiValue));
        } catch {}
      }
    });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          typeof value === "function"
            ? (value as (prev: T) => T)(prev)
            : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        setSiteData(key, next).catch(() => {});
        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
