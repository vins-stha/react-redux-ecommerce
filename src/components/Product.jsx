import React, { useState, useEffect } from 'react'

export default function Product() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [productId, setProductId] = useState(null)

    useEffect(() => {
        const items = fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(json)
                setLoading(false)
            })

    }, [])

    const handleClick =(id)=>{
        console.log('product id = ', id)
    }

    const handleAddToCart = () =>{

    }

    

    const Product = () => {
        // products.length > 0 
            products.map((product, id) => {
                return (
                    <div className="card product-card" style={{ width: 18 + 'em' }}>
                        <img className="card-img-top prod-image contain" src={product.image} alt="Card image cap" />
                        <div className="card-body">
                            <p className="card-text">{product.title}</p>
                        </div>
                        <div className="btn btn-primary block">Add to Cart</div>
                    </div>
                )
            })
        
    }
    return (
        <>
        <div className="product-contents clearfix">
        <div className="product-nav  d-flex justify-content-center py-1" >
            <a className="btn btn-outline-dark m-r-1" href=''>
            <i className="fa fa-sign-in m-r-1"/>
            Jewellery
            </a>
            <a className="btn btn-outline-dark m-r-1" href=''>
                <i className="fa fa-user-plus m-r-1"></i>
            Men's Clothing
            </a>
            <a className="btn btn-outline-dark m-r-1" href=''>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Women's Clothing
            </a>
            <a className="btn btn-outline-dark m-r-1" href=''>
                <i className="fa fa-shopping-cart m-r-1"></i>
           Electronics
            </a>
            <a className="btn btn-outline-dark m-r-1" href=''>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Beauty Products
            </a>
            
        </div>
            <div className="product-lists container d-flex">
      {      products.map((product, id) => {
                return (
                    <div className="card product-card center">
                         <a onClick={(e)=>{e.preventDefault();  handleClick(product.id)}} key={product.id} >
                            <img className="card-img-top prod-image contain" src={product.image} alt="Card image cap" />
                            <div className="card-body">
                                <p className="card-text small">{(product.title).length < 35 ?(product.title) : (product.title).substring(0,32)+"..." }</p>
                            <div className="card-text small">Price : ${product.price}</div>
                        </div>                        
                    </a>
                    <div className="btn btn-primary block">Add to Cart</div>
                    </div>
                   
                )
            })}
        
              
                
                
                
               

            </div>

        </div>
             
        </>

    )
}
