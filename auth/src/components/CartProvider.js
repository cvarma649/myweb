import React, {useReducer, useContext, createContext} from "react";


export const CartStateContext = createContext();
export const CartDispatchContext = createContext();



const initialValue = {
    products:[],
    cart:[]
}

const reducer = (state=initialValue, action)=>{ //state:cart: [id, name, image, desc, price, qty]
    if(action.type ==="GET_ALL"){
        return{
            ...state,
            products: action.payload.allItems
        }}
    if(action.type === "ADD"){
        const item = state.products.find(prod=>prod.product_id===action.payload.id);
        const inCart = state.cart.find(item=>item.product_id===action.payload.id )? true :false;
        return {
            ...state,
            cart: inCart ? state.cart.map(
                item=>(item.product_id ===action.payload.id) ? {...item, qty: item.qty +1 } : item)
             : [...state.cart, {...item, qty:1}]
        }}
    if(action.type === "REMOVE_ITEM"){
        return{
            ...state,
            cart: state.cart.filter(item=>item.product_id !== action.payload.id)
        }}
    if(action.type === "ADJ_QTY"){
        return{
            ...state,
            cart : state.cart.map(
                item => item.product_id === action.payload.id 
                ? {...item, qty: action.payload.qty}
                : item )
        }}
    else{
        return state
    } 
}

export const CartProvider = ({children})=>{
    const [state,dispatch]= useReducer(reducer, initialValue)

    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useStateCart = ()=> useContext(CartStateContext);
export const useDispatchCart =()=> useContext(CartDispatchContext);