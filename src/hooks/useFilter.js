import { useState, useMemo, useCallback } from 'react';

/**
 * useFilter — manages search and multi-dimension filter state.
 * Keeps all filter logic out of page components.
 *
 * @param {Array}  data       - Full dataset to filter
 * @param {object} config     - { searchFields, filterKeys }
 * @returns filter state + handlers + filteredData
 */
const useFilter = (data = [], config = {}) => {
  const { searchFields = ['title'], filterKeys = [] } = config;

  const [query,   setQuery]   = useState('');
  const [filters, setFilters] = useState(
    // Initialize each filter key with 'All' / first option
    filterKeys.reduce((acc, key) => ({ ...acc, [key]: 'All' }), {})
  );

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setQuery('');
    setFilters(filterKeys.reduce((acc, key) => ({ ...acc, [key]: 'All' }), {}));
  }, [filterKeys]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search query match
      const lowerQuery = query.toLowerCase().trim();
      const matchesSearch = !lowerQuery || searchFields.some(field => {
        const val = item[field];
        return val && String(val).toLowerCase().includes(lowerQuery);
      });

      // Filter keys match
      const matchesFilters = filterKeys.every(key => {
        const selected = filters[key];
        if (!selected || selected === 'All' || selected.startsWith('All ')) return true;
        return item[key] === selected;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, query, filters, searchFields, filterKeys]);

  const activeFilterCount = useMemo(() => {
    return (query ? 1 : 0) +
      filterKeys.filter(k => filters[k] && !filters[k].startsWith('All')).length;
  }, [query, filters, filterKeys]);

  return {
    query,
    setQuery,
    filters,
    updateFilter,
    resetFilters,
    filteredData,
    activeFilterCount,
    isEmpty: filteredData.length === 0,
  };
};

export default useFilter;
