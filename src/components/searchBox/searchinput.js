import React from "react";

const SearchInput = ({ onChange }) => (
  <input onChange={(e) => onChange(e.target.value)} type="text" placeholder="Busca un Pokémon" />
);

export default SearchInput;
