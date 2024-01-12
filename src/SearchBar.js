import React, { useState } from "react"
import { Link } from "react-router-dom"

// dependencies use numbers, so you can use the product.id as a variable to watch for in useEffect
//Creating a search bar so we can see the results

const SearchBar =({searchList}) =>{
    const [searchProducts, setSearchProducts] = useState ('')
    console.log(" searchbar page searchlist",searchList)

 //get all of the products that match the search text
     const filteredProducts = searchList.filter((product) => {
        return product.name?.indexOf( searchProducts) !== -1
    
    })


//below is the input field that the user will add the search term into
    return (
        <div>
            <input 
                type="text"   
                value={searchProducts}
                placeholder="Enter Cake Name Here"
                onChange={(event) => {setSearchProducts(event.target.value)}}
            />

            {
                searchProducts.length > 0 ?
                <div>
                    <h3>Viewing {filteredProducts.length} of {searchList.length}</h3> 
                    <ul>
                        {
                            filteredProducts.map((product)=> {
                                return <li key={product.id}>   
                                    
                                    <Link to={`/products/${product.id}`}>{product.name}</Link> 
                                </li>
                            })
                            
                        }
                    </ul> 
                </div> 
                : null

            }
        </div>
    )
}
export default SearchBar;