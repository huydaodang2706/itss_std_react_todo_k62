import { useState, useEffect } from 'react';

const STORAGE_KEY = 'itss-todo';

export default function useStorage() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      window.onload = function() {
        setItems(JSON.parse(data));
      }
      
    }
  }, []);

  const putItems = items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log('This is item' + items);
    setItems  (items);
  };

  const clearItems = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
  };

  return [items, putItems, clearItems];
}