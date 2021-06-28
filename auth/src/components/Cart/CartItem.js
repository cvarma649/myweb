import React from 'react';
import "./CartItem.css";
import {useStateCart, useDispatchCart} from "../CartProvider";
import {useState, useEffect} from "react";

function CartItem({item}) {
    const state = useStateCart();
    const dispatch = useDispatchCart();
    const cart = state.cart;
    const [qty,setQty]= useState(item.qty);
    const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"
    const handleChange=(e)=>{
        setQty(e.target.value);
    }
    const hello=()=>{
        dispatch({
            type: "ADJ_QTY",
            payload:{
                id:item.product_id,
                qty:qty
            }
        })
    }
    const removeItem=(id)=>{
        dispatch({
            type:"REMOVE_ITEM",
            payload:{
                id:id
            }})}

    useEffect(() => {
        hello();

    }, [qty])

    const truncate = (string,n)=>{
        return string?.length < n ? string : string.substr(0,n-1) +"..."
    }
    

    
    return (    
        
            <div className="items">
                <div className="left-items">
                   <img src={`${baseUrl}/image/${item.prod_image_id}`} alt=""/>
                </div>
                <div className="mid-items">
                    <div className="prod_name">{item.product_name}</div>
        
                    <div className="prod_desc">
                        {truncate(item.product_description, 120)}                        
                    </div>       
                    <div className="prod_quantity">
                        <span><input type="number" defaultValue={qty} onChange={handleChange} min="1"/></span>
                        <span><button className="butty" onClick={()=>removeItem(item.product_id)}><h4>Remove From Cart</h4></button></span>
                    </div> 
                </div>
                <div className="right-items">₹{item.product_price}</div>
            </div>
       
    )
}

export default CartItem;
