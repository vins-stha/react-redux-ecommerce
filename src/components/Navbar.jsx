import React from 'react'

export const Navbar = () => {
    return (
       
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-2">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Redux Cart</a>
      
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Contact <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Products <span class="sr-only">(current)</span></a>
            </li> <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
         
          </ul>
          <form class="form-flex" name="search-form" id="search-form">
            <input  class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
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
            <a className="btn btn-outline-light" href=''>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Cart(0)
            </a>
            
        </div>
        
        </div>
      </nav>
       
    )
}
