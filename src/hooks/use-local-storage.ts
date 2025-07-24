
'use client';

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Use a state to store the value, initializing with the provided initial value.
  // This ensures the server-rendered and initial client-rendered output are identical.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // This effect runs only on the client after hydration.
  useEffect(() => {
    try {
      // Access localStorage only on the client.
      const item = window.localStorage.getItem(key);
      // If a value exists in localStorage, update the state.
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // Log any errors, but don't break the app.
      console.error(error);
    }
    // The empty dependency array ensures this effect runs only once on mount.
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export { useLocalStorage };
