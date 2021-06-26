import React from 'react';
import "./ProductLayout.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useStateCart, useDispatchCart} from "../CartProvider";
import ProductPop from "./ProductPop";


function ProductLayout() {
    const state = useStateCart();
    const items = state.products;
    const cart = state.cart;
    const dispatch = useDispatchCart();
    const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"

    const addToCart = (id)=>{
        dispatch({
            type: "ADD",
            payload: {
                id:id
    }})}
   
   const getProducts = async()=>{
       try {
           const response = await fetch(`/api/v1/products`,{
               method: "GET"
           })
           const jData = await response.json()
           dispatch({
            type:"GET_ALL",
            payload:{
                allItems:jData
            }
        })     
       } catch (err) {
           console.error(err.message)
       }
   }
  
   const [cartCount, setCartCount] = useState(0);
   const countHandle = ()=>{
       let count =0;
       cart.forEach(item => count += item.qty) 
       setCartCount(count)
   }

   useEffect(()=> {
   getProducts();},
   [])

   useEffect(()=>{
       countHandle();
   },[cart, cartCount])
  
   const content=
    <div className="bach">{`       
        This is a Mock Shop, connected to a real database. There are provisional tables in the database for
        orders and carts, dynamic to the user, but they have not been used for the sake of simplicity. 
        A Postgresql Database was set up with the help of NodeJs and ExpressJs to store all the products with
        their names, prices, descriptions, images etc. Owing to their small number, product images were stored locally via Multer and knex and then saved in the form of 
        filename and mimetype to database that can be used in urls to access the respective images. 
        Use Reducer and Use Context Hooks used for State management of the product quantity and in-cart management. 
        Ps: You will not be able to access the Cart or the Video server untill you are authenticated.
        `}</div>

    return (
        <div>
            <div className="contain">
                <div className="nav2">
                    <ul className="ul-left">
                        <li><p>Shop for Keys</p></li>
                        
                        <li><ProductPop className="tippu" content={content}/></li>
                        </ul>
                        <ul className="ul-right">
                        <li><Link to="/cart"><img src={`${process.env.PUBLIC_URL}/assets/cart.png`} alt="cart"/></Link></li>
                        <li><p>({cartCount})</p></li>
                    </ul>
                
                </div>
                <div className="prod_container">
                    <div className="prod_array">
                       
                        { items.map( item => (
                        <div className="prod" key={item.product_id}>
                            <Link to={`/products/${item.product_id}`}><img src={`/api/v1/image/${item.prod_image_id}`} alt={item.product_name}/></Link>
                            
                            <h4>{item.product_name}</h4>
                            <p>₹{item.product_price}</p>
                            <button className="btn" onClick={()=>addToCart(item.product_id)} type="button" >Add to Cart</button>
                        </div>
                        
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}



export default (ProductLayout)
