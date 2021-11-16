import styles from "./Searchbar.module.scss";
import { useState, useContext } from "react";
import { SearchContext } from "../../context/SearchContext.jsx";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [currentInput, setCurrentInput] = useState("");
    const { setSearch } = useContext(SearchContext);
    
    const handleChange = (event) => {
        setCurrentInput(event.target.value);
        // provide user feedback based on what they are searching
        // input can be lowercase or uppercase
        // input can be a number (for price or stock)
        // only a dollar sign or a decimal place can be used
        // only a single decimal place can be used
        // only a single dollar sign
        // all other symbols will be rejected
    }
    
    const handleClick = (event) => {
        event.preventDefault();
        setSearch(currentInput); // sets the search context to the use input;
        setCurrentInput("");  // resets local state and search bar;
    }

    return (
      // <div>
      //     <input value={currentInput} onChange={handleChange} type="text" />
      //     <button onClick={handleClick}>Search</button>
      // </div>
      //   <div class="input-group">
      //     <div class="form-outline">
      //       <input
      //         // id="search-input"
      //         type="search"
      //         id="form1"
      //         class="form-control"
      //         value={currentInput}
      //         onChange={handleChange}
      //       />
      //       <label class="form-label" for="form1">
      //         Search
      //       </label>
      //     </div>
      //     <button
      //       id="search-button"
      //       type="button"
      //       class="btn btn-primary"
      //       onClick={handleClick}
      //     >
      //       <i class="fas fa-search"></i>
      //     </button>
      //   </div>
      <div className={styles.SearchBar}>
        <form className="my-2 my-lg-0 d-flex">
            <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={currentInput}
            onChange={handleChange}
            />
                <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="submit"
                onClick={handleClick}
                >
                <Link to="/products">
                    <i className="fas fa-search"></i>
                </Link>
                </button>
        </form>
      </div>
    );
};

export default SearchBar;
