import { createContext, useContext, useState } from "react";

const FiltersContext = createContext(null);

export const useFilterContext = () => {
    const context = useContext(FiltersContext);
    if(!context) {
        throw new Error("useFiltersContext must be used within a FiltersProvider");
    }
    return context;
}

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({ page: 0, search: ""});
    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>
    );
};