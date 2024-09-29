import React from "react";

import { useFilterContext } from "../../Context/filtersCtx";

const SearchInput = () => { 
  const { filters, setFilters } = useFilterContext();
  return (
    <input 
      onChange={(e) => setFilters({ ...filters, search: e.target.value})} 
      type="text" 
      placeholder="Busca un Pokémon" 
    />
  );
};

export default SearchInput;
