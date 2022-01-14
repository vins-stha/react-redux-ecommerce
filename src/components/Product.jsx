import React, { useState, useEffect } from 'react'

export default function Product() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [productId, setProductId] = useState(null)
    const baseUrl = 'https://fakestoreapi.com/'
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let url =  'products'
        getProducts(url)
        getProducts(url='categories')

    }, [])

    const getProducts = async (url) => {
        
        let searchUrl = url === "categories" ?(baseUrl+"products/categories") : (baseUrl + url)
        console.log('url=>', url)
        console.log(searchUrl)
         await fetch(searchUrl)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                url === "categories" ?  setCategories(json): setProducts(json)
                setLoading(false)
                console.log('setcates', categories, setProducts)
            })
    }

    const handleClick = (id) => {
        console.log('product id = ', id)
    }

    const handleAddToCart = () => {

    }

    const cats = categories.map((category, id) => {
        <a key={id} className="btn btn-outline-dark m-r-1" 
        href="products/category/jewelery" 
        onClick={(e)=>{
            e.preventDefault();
            getProducts(`products/category/${category}`)
            }}>
    <i className="fa fa-sign-in m-r-1"/>
    {category}
    </a>
    })

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
            <a className="btn btn-outline-dark m-r-1" 
                href="products/category/jewelery" 
                onClick={(e)=>{
                    e.preventDefault();
                    getProducts("products/category/jewelery")
                    }}>
            <i className="fa fa-sign-in m-r-1"/>
            Jewellery
            </a>
            <a className="btn btn-outline-dark m-r-1" 
                href="products/category/jewelery" 
                onClick={(e)=>{
                    e.preventDefault();
                    getProducts("products/category/men's clothing")
                    }}>
                <i className="fa fa-user-plus m-r-1"></i>
            Men's Clothing
            </a>
            <a className="btn btn-outline-dark m-r-1" 
                href="products/category/jewelery" 
                onClick={(e)=>{
                    e.preventDefault();
                    getProducts("products/category/women's clothing")
                    }}>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Women's Clothing
            </a>
            <a className="btn btn-outline-dark m-r-1" 
                href="products/category/jewelery" 
                onClick={(e)=>{
                    e.preventDefault();
                    getProducts("products/category/electronics")
                    }}>
                <i className="fa fa-shopping-cart m-r-1"></i>
           Electronics
            </a>
            
            <a className="btn btn-outline-dark m-r-1" href=''>
                <i className="fa fa-shopping-cart m-r-1"></i>
            Beauty Products
            </a>
            {categories.map((category, id) => {
        <a key={id} className="btn btn-outline-dark m-r-1" 
        href="products/category/jewelery" 
        onClick={(e)=>{
            e.preventDefault();
            getProducts(`products/category/${category}`)
            }}>
    <i className="fa fa-sign-in m-r-1"/>
    
    </a>
    })}
            
        </div>
            <div className="product-lists container d-flex">
      {      products.map((product, id) => {
                return (
                    <div key={product.id}className="card product-card center">
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
