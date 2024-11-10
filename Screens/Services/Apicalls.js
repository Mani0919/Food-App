import axios from "axios"

export const AllProducts=async()=>
{
    return await axios.get('https://dummyjson.com/products')
}