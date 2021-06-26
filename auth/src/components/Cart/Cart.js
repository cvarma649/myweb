import React,{useState, useEffect} from 'react';
import CartItem from "./CartItem";
import "./Cart.css";
import {useStateCart} from "../CartProvider";

function Cart() {
    const state = useStateCart();
    const cart = state.cart;
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0)

    const findTotal = ()=>{
        let items = 0;
        let price = 0;
        cart.forEach(item=> {
            items += item.qty;
            price += item.qty * item.product_price;
        })
        setTotalItems(items)
        setTotalPrice(price)}

        useEffect(()=>{
            findTotal();},[cart, totalItems, totalPrice, setTotalItems, setTotalPrice])
            const tax = totalPrice * 10/100          
                
    return (
        <div> 
            <div className="full-contain">
            <h1 className="cart-title">Cart</h1>
            {totalPrice>0 ? (
            <div className= "main-container">  
                <div className="cart-items">
                {cart.map(item=>(
                <CartItem key={item.id} item={item} />
                ))
                }
                </div>
                <div className="billing1">
                <h2>OrderId: 583487348763</h2>
                <p>Sub Total: ₹{totalPrice}</p>
                <p>Tax and Charges: ₹{tax}</p>
                <h1>Grand Total: ₹{totalPrice+tax} </h1>
                <button className="butt">Place Order</button>
                </div>
            </div> 
            ):(<div className="cartThings">
                <h1>There is nothing in your Cart :)</h1>
                </div>)}
            </div>
        </div>
       
    )
}



export default (Cart)
