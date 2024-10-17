import React, { useContext, useState, useEffect, useRef } from 'react';
import { TaskFunctionsType, TaskFunctionsContext } from '../App';
import '../style.css';

const SearchTask = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const context = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    if (context && debouncedSearchTerm !== '') {
      context.searchTask(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, context]);

  if (!context) {
    return null;
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      context.searchTask(searchTerm.trim());
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    context.searchTask('');
  };


  return (
    <div className='search-container'>
      <button type="button" onClick={() => context.searchTask(searchTerm.trim())} aria-label="Search">Search</button>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        placeholder="text here . . ."
        aria-label="Search tasks"
      />
      <button type="button" onClick={clearSearch} aria-label="Clear search">Clear</button>
    </div>
  );
};

export default SearchTask;
