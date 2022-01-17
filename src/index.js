import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

// initial state of cart
const cart = {
  productsInCart:[],
  cart: [],
  totalItem:0,
  totalAmount:25
}

// reducer for cart
export const cartReducer = (cartState = cart, action) => {
  
  // get payload
  const product = action.payload

  switch (action.type) {
    case "ADD_ITEM":    
      // check if product exist in cart already

      const prodToAdd = cartState.productsInCart.find(item => item.id === product.id) 

      const itemExistInCart =cartState.cart.find(item=>item.id === product.id ? true : false)
      // update the state of cart by increasing amount
     
      cartState = {
        ...cartState,

        // add into product list if does not exist
      
        productsInCart :  prodToAdd === undefined ?[ ...cartState.productsInCart,product]:[...cartState.productsInCart],
        
        // update only quantity in cart if already exist else add
        cart: itemExistInCart ? cartState.cart.map((item) => 
          (item.id === product.id )
          ?{           
            ...item,
            item_qty: item.item_qty +  1
          }  : item
        
        ) // if item does not exist in cart
        : [...cartState.cart, { id:product.id, item_price: product.price, item_qty:1}] 
         ,       
      }
 
       break;
    case "DELETE_ITEM":
      cartState = {
        ...cartState,
        productsInCart : cartState.productsInCart.filter(item=>item.id !== product.id),
        cart : cartState.cart.filter(item=>item.id !== product.id)
       
      };
      break;
    case "REDUCE_ITEM":
      
      cartState = {
        ...cartState,

        cart : cartState.cart.map((item) => 
        (item.id === product.id )
        ?{         
          ...item,
          item_qty: item.item_qty >=1 ? item.item_qty -  1 : 1 

        } : item),       
      }
      break;
    case "EMPTY_CART":
      cartState = {
        ...cartState,
        cart :[],
        productsInCart: []
      }

      break;
    default:
      break;
  }
  return cartState
}
export const cartStore = createStore(cartReducer, composeWithDevTools( ))


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {cartStore}>
    <App />

    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
