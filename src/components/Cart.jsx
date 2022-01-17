import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


export const Cart = () => {
  
    const state = useSelector(state=>state)
    const dispatch = useDispatch()
    var total = 0
    const handleChangeItem = (val, item) => {
        if (val === "+") {
            dispatch({
                type: "ADD_ITEM",
                payload: item
            })
        }
        else if (val === "-") {
            dispatch({
                type: "REDUCE_ITEM",
                payload: item
            })
        }
        else if (val === "EMPTY_CART") {
            dispatch({
                type: "EMPTY_CART",
                payload: null
            })
        }
        else {
            dispatch({
                type: "DELETE_ITEM",
                payload: item
            })
        }
    }
    var cart_Total =0
    const CartItems = () => state.productsInCart.map((item,id)=>{
        
        return(
            <div key={id}className="cart-card d-flex border">
                <img className="cart-card__img" src={item.image} alt="" />
                <div className="cart-item-detail">
                    <h5 className='display-7'>{item.title}</h5>

                    <p className='product-rating'>Rating: {item.rating.rate} </p>
                    <div className="qty_amount d-flex">
                        {
                            state.cart.map(prod => prod.id === item.id ?
                               
                                <>  
                                    <div key={prod.id}></div>
                                     <div className="btn border" onClick={(e)=>{e.preventDefault();handleChangeItem("-", item)}}>-</div>
                                    <div type="number" min="1" className='item-qty border'>{prod.item_qty} </div>
                                    <div className="btn border m-r-1" onClick={(e)=>{e.preventDefault();handleChangeItem("+",item)}}>+</div>
                                
                                    <h6 className='lead display-7'>Price : $ {item.price * prod.item_qty}</h6>
                                </>
                                : '')
                        }                       
                    </div>

                    <div className="prod-buttons buttons d-flex">
                        <a className="btn btn-outline-dark "
                            href="/product/id">
                            <i className="fas fa-cart-plus m-r-1" /> details</a>
                        <a className="btn btn-outline-dark" onClick={(e)=>{e.preventDefault(); handleChangeItem("remove", item)}}>
                            <i className="fa fa-shopping-cart m-r-1" />Remove </a>
                    </div>
                </div>
                
            </div>
        )
    })
    
   
    if(state.cart.length > 0 )
        state.cart.forEach(item => {       
        cart_Total += (item.item_price * item.item_qty)            
    }) 
   
    return (
        <div className='border p-3 justify-content-center'>
        <h1>Your Items</h1>  
        {state.productsInCart.length > 0 ? (
            <>
                    <div className="container d-flex flex-column">
                        <CartItems />
                        <div className="cart-footer d-flex justify-content-center">
                            <div className="cart-total border-bottom display-6 bold  m-r-3"> Cart Total : ${cart_Total.toFixed(2)}</div>
                            <div className=" btn btn-danger  btn-danger-outline m-l-1 p-2" onClick={e=>{e.preventDefault(); handleChangeItem("EMPTY_CART")}}><h6>Clear up!</h6></div>
                        </div>
                        
                    </div>

            </>
           
        ):(<h1>empty cart</h1>)}  
        </div>
    )
}
