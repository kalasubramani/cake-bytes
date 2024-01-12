import React, { useState } from "react"
import { Link } from "react-router-dom"


const SearchOrders =({orders}) =>{
    const [searchOrders, setSearchOrders] = useState ('')
    
 
     const filteredOrders = lineItems.filter((lineItem) => {
        return lineItem.id.indexOf( searchOrders) !== -1

    })

    return (
        <div>
            <label> 
                <input 
                type="text" 
                value={searchOrders}
                placeholder="Enter Cake Name Here"
                onChange={(event) => {setSearchOrders(event.target.value)}}
                />
            </label>

            {
            searchOrders.length > 0 ?
            <div>
                <h3>Viewing {filteredOrders.length} of {orders.length}</h3> 
                <ul>
                    {
                        filteredOrders.map((order)=> {
                            return <li key={lineItems.id}>   
                        
                                <Link to={`/orders/${lineItem.id}`}></Link> 
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
export default SearchOrders;