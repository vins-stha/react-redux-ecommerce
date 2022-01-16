import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'


 export const Navbar = (props) => {
    let qty = 0
    
    const [totalItemsInCart, setTotalItemsInCart] = useState(0)
     const state = useSelector((state) => state)
     useEffect(() => {

        state.cart.forEach(item => {
            qty += item.item_qty
            
        });
        setTotalItemsInCart(qty)
         console.log('posts', state.cart, 'total ', totalItemsInCart)
     }, [state])

    
    return (
       
        <nav className="navbar navbar-expand-lg navbar-dark p-2">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Redux Cart</a>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="">Contact <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/products">Products <span className="sr-only">(current)</span></a>
            </li> <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
         
          </ul>
          <form className="form-flex" name="search-form" id="search-form">
            <input  className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
  
        <div className="buttons ml-10">
            <a className="btn btn-outline-light" href=''>
            <i className="fa fa-sign-in m-r-1"/>
            Login
            </a>
            <a className="btn btn-outline-light" href=''>
                <i className="fa fa-user-plus m-r-1"></i>
            Register
            </a>
            <a className="btn btn-outline-light" href='/cart'>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Cart({totalItemsInCart})
            </a>
            
        </div>
        
        </div>
      </nav>
       
    )
}
