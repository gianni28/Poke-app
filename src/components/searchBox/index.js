import React from "react";

import SearchInput from "./searchinput";
import { ReactComponent as Search } from "../../assets/search.svg";

import "./index.css";

const SearchBox = ({ onSearch }) => {
    return (
        <div className="search-box">
            <Search />
            <SearchInput onChange={onSearch}/>
        </div>
    );
};

export default SearchBox;