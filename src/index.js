import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import {createStore} from 'redux'
import { Provider } from 'react-redux';

// initial state of cart
// const [cart, setCart]
const cart = {
  productsInCart: [
  //   {
  //   "id": 2,
  //   "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //   "price": 22.3,
  //   "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //   "rating": {
  //       "rate": 4.1,
  //       "count": 259
  //   }
  //   },
  //   {
  //     "id": 1,
  //     "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //     "price": 22.3,
  //     "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //     "rating": {
  //         "rate": 4.1,
  //         "count": 259
  //     }
  //  }
],
  cart:[], // item-id, qty
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
      const prodToAdd = cartState.productsInCart.find(item => item.id ===product.id)
      
      console.log('addied =>', prodToAdd)

      const itemExistInCart = cartState.cart.find(item=>item.id === product.id ? true : false)
      //   // update the state of cart by increasing amount
     
      cartState = {
        ...cartState,
        productsInCart : prodToAdd === undefined ?[ ...cartState.productsInCart,product]:{...cartState.productsInCart},
        
        cart: itemExistInCart ? cartState.cart.map((itemInCart) => 
          (itemInCart.id === product.id )? { ...itemInCart, id: product.id, item_qty: itemInCart.item_qty + 1 } : { itemInCart }
        
        ) : [...cartState.cart, { id:product.id, item_qty:1}]

      }

 
      console.log('cartstate now', cartState)
     break;
    case "REMOVE_ITEM":
      cartState = {
        ...cartState,
        productsInCart : cartState.productsInCart.map(item=>item.id === product.id
      ? {
        ...item,
        quantity: item.quantity > 0 ? item.quantity - 1 : 1,
        // totalItemInCart : totalItemInCart - 1
      }:item 
        
        )
      }
      break;
    case "DELETE_ITEM":
      break;
    case "EMPTY_CART":
      break;
    default:
      break;
  }

  return cartState
}
export const cartStore = createStore(cartReducer)


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
