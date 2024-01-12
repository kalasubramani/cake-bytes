import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// dependencies use numbers, so you can use the product.id as a variable to watch for in useEffect
//Creating a search bar so we can see the results

const SearchBar =({searchList, onSearch}) =>{
    const [searchText, setSearchText] = useState ('')

    const handleSearch = (e) => {
      //set search string to state
      const searchString= e.target.value;
      setSearchText(searchString);

      //filter products that contains search string
      const filteredProducts = searchList?.filter((product) => {
        return product.name.indexOf( searchString) !== -1
    })

    //if onSearch fn is passed from calling component, call onSearch() with filtered products as args
    //this returns the filtered products to the calling component
    //the calling component uses the data to set it to the state and renders the page with results
    if(onSearch) {
      searchString ? onSearch(filteredProducts) : onSearch();
    }
    }

//below is the input field that the user will add the search term into
    return (
        <div>
            <label> 
                <input type="text" value={searchText} 
                placeholder="Search Cake Name Here"
                onChange={handleSearch}
                />
            </label>                
        </div>
    )
}
export default SearchBar;