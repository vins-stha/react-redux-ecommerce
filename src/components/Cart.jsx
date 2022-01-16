import React from 'react'
import { useSelector } from 'react-redux'


export const Cart = (props) => {
    const state = useSelector(state=>state)
    console.log('CART', state)
    return (
        <div>
        <h1>Cart</h1>  
        {state.productsInCart.length > 0 ? (
            <>
            <h1>your cart itmes</h1>
            <div className="container d-flex">
                <div className="cart-card d-flex">
                    <img className="cart-card__img" src="" alt="" />
                    <div className="cart-item-detail">
                        <h4>aweseom title goes here about product</h4>
                        <input type="number" min="0" className='item-qty'></input>
                        <div className="total">total amount</div>
                        <div className="prod-buttons buttons d-flex">
                            <a className="btn btn-outline-dark "
                            href="/buy">
                            <i className="fas fa-cart-plus m-r-1"/>View details</a>
                            <a className="btn btn-outline-dark">
                            <i className="fa fa-shopping-cart m-r-1"/>Remove this</a>
                        </div>
                    </div>
                </div>
            </div>
            </>
            












        ):(<h1>empty cart</h1>)}  
        </div>
    )
}
