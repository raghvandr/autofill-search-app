import React, { useState, useEffect, useCallback } from 'react';
import dummyData from '../data/dummyData';
import LRUCache from '../utils/LRUCache';

const cache = new LRUCache(10);

const highlightMatch = (text, query) => {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

const AutoComplete = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const search = useCallback((query) => {
    if (!query) return [];

    const cached = cache.get(query);
    if (cached) return cached;

    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    cache.set(query, filtered);
    return filtered;
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = search(input);
      setResults(filtered);
    }, 300);

    return () => clearTimeout(handler);
  }, [input, search]);

  return (
    <div className="autocomplete-container">
      <h2 className="title">🔍 Smart AutoComplete</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Start typing to search..."
        className="search-input"
      />
      <ul className="results-list">
        {results.map(item => (
          <li key={item.id} className="result-item">
            <span
              dangerouslySetInnerHTML={{
                __html: highlightMatch(item.name, input),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
