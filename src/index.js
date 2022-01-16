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
  productsInCart: [
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
          "rate": 4.1,
          "count": 259
      }
  }
  ],
  cart:[{id:2, item_qty:1}], // item-id, qty
  totalItem:0,
  totalAmount:0
}

// reducer for cart
export const cartReducer = (cartState = cart, action) => {
  
  // get payload
  const product = action.payload

  switch (action.type) {
    case "ADD_ITEM":    
      // check if product exist in cart already
      console.log('productsInState', cartState.productsInCart)
      const prodToAdd = cartState.productsInCart.find(item => item.id === product.id) 
      
      console.log('addied =>', prodToAdd)

      const itemExistInCart = cartState.cart.find(item=>item.id === product.id ? true : false)
      // update the state of cart by increasing amount
     
      cartState = {
        ...cartState,

        // add into product list if does not exist
        productsInCart : prodToAdd === undefined ?[ ...cartState.productsInCart,product]:[...cartState.productsInCart],
        
        // update only quantity in cart if already exist else add
        cart: itemExistInCart ? cartState.cart.map((item) => 
          (item.id === product.id )
          ?{
           
            ...item,
            item_qty: item.item_qty +  1 

          }  : item
        
        ) // if item does not exist in cart
        : [...cartState.cart, { id:product.id, item_qty:1}]
      }
 
       break;
    case "DELETE_ITEM":
      cartState = {
        ...cartState,
        productsInCart : cartState.productsInCart.filter(item=>item.id !== product.id),
        cart : cartState.cart.filter(item => item.id !== product.id)
      };
      break;
    case "REDUCE_ITEM":
      cartState = {
        ...cartState,
        cart : cartState.cart.map(item => item.id === product.id ? {...item, item_qty : item.item_qty > 0 ? item.item_qty--: 0}:{item}),
        productsInCart : cartState.cart.map(item => item.id === product.id  && item.item_qty === 0 ? 
          cartState.productsInCart.filter(item=>item.id !== product.id)
        : {...cartState.productsInCart})
       
      }
      break;
    case "EMPTY_CART":
      cartState = {
        ...cartState,
        cart : {},
        productsInCart: {}
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
