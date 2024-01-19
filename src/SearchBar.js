import { Box, TextField } from "@mui/material"
import React, { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';

// dependencies use numbers, so you can use the product.id as a variable to watch for in useEffect
//Creating a search bar so we can see the results

const SearchBar = ({ searchList, onSearch }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e) => {
    //set search string to state
    const searchString = e.target.value;
    setSearchText(searchString);

    //filter products that contains search string
    const filteredProducts = searchList?.filter((product) => {
      return product.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    })

    //if onSearch fn is passed from calling component, call onSearch() with filtered products as args
    //this returns the filtered products to the calling component
    //the calling component uses the data to set it to the state and renders the page with results
    if (onSearch) {
      searchString ? onSearch(filteredProducts) : onSearch();
    }
  }

  //below is the input field that the user will add the search term into
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField label="Search cake name here" variant="standard" sx={{width:'25rem'}}  value={searchText} onChange={handleSearch}></TextField>
    </Box>

  )
}
export default SearchBar;