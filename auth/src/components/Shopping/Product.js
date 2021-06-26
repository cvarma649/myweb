import React from "react";
import {useState, useEffect} from "react";
import "./Product.css";
import {useStateCart, useDispatchCart} from "../CartProvider";
import {Link} from "react-router-dom";

const Product=(props)=>{
    const dispatch = useDispatchCart();
    const state = useStateCart();
    const cart = state.cart;
    const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"
    const [product, setProduct]= useState("")
    
    const addToCart = (id)=>{
        dispatch({
            type: "ADD",
            payload: {
                id:id
    }})}

    const getProduct = async()=>{
        const response = await fetch(`/api/v1/products/${props.match.params.id}`,{
            method: "GET"
        })
        const parseRes = await response.json()
        setProduct(parseRes);
        console.log(response)
    }
    const [qty,setQty]= useState(product.qty);

    useEffect(()=>{
        getProduct(product.product_id);},
        []
    )
    
    const [cartCount, setCartCount] = useState(0);
   const countHandle = ()=>{
       let count =0;
       cart.forEach(item => count += item.qty) 
       setCartCount(count)
   }

  
   
   useEffect(()=>{
    countHandle();
},[cart, cartCount])

   
   
  
    return(
        <div className="item_container1">
            
            <div className="items1" key={product.product_id}>
                <div className="left-items1">

                   <img src={`/api/v1/image/${product.prod_image_id}`} alt=""/>
                </div>
                <div className="non-image">
                <div className="mid-items1">
                    <div className="prod_name1">
                        <div>{product.product_name}</div>
                        <div className="ul-right1"> 
                                <ul className="cart-list">
                                <li><Link to="/cart"><img className="cart-logo" src={`${process.env.PUBLIC_URL}/assets/cart.png`} alt="cart"/></Link></li>
                                <li><p>({cartCount})</p></li>
                                </ul>
                            </div></div>

        
                    <div className="prod_desc1">
                       {product.product_description}
                        <div className="right-items1">
                          
                            <div>₹{product.product_price}</div>
                            
                            </div>
                    </div>
                <div  className="side2side">
                    <div className="prod_quantity1">
                        <span><button className="btn" onClick={()=>addToCart(product.product_id)} type="button" >Add to Cart</button></span>
                    </div>
                    <div className="right-itemsx">
                        <div>₹{product.product_price}</div>
                        
                        </div>
                </div>
               
            </div>
            </div>
            </div>
            </div>
    )
}

export default Product;