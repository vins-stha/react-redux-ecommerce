import React, { useState, useEffect } from 'react'
import ProductDetail from './ProductDetail';
import { createStore } from 'react-redux';
import {cartStore} from '../index.js'

export default function Products() {

    const [products, setProducts] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true);
    const [productId, setProductId] = useState(null)
    const baseUrl = 'https://fakestoreapi.com/'
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let url = 'products'
        getProducts(url)
        // getProducts(url='categories')
        console.log('filteredData', filteredData)

    }, [])

    const getProducts = async (url) => {

        let searchUrl = url === "categories" ? (baseUrl + "products/categories") : (baseUrl + url)

        console.log(searchUrl)

        await fetch(searchUrl)
            .then(res => res.json())
            .then(json => {
                // url === "categories" ?  setCategories(json): {setProducts(json); setFilteredData(json)}
                setProducts(json);
                setFilteredData(json)
                setLoading(false)

            })
    }

    const handleClick = (id) => {
        console.log('product id = ', id)
        return (<ProductDetail id={id} />)
    }

    const handleAddtoCart = (product) => {
        // console.log('id=', id)
        cartStore.dispatch({
            type:"ADD_ITEM",
            payload: product
        })

    }

    const cats = categories.map((category, id) => {
        <a key={id} className="btn btn-outline-dark m-r-1"
            href="products/category/jewelery"
            onClick={(e) => {
                e.preventDefault();
                getProducts(`products/category/${category}`)
            }}>
            <i className="fa fa-sign-in m-r-1" />
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

    const categorizedData = (cat_name) => {
        const cat_data = products.filter((product) => product.category === cat_name);
        setFilteredData(cat_data);
    }

 
    return (
        <>
            <div className="product-contents clearfix">
                <div className="product-nav  d-flex justify-content-center py-1" >
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("jewelery");
                        }}>
                        <i className="fa fa-sign-in m-r-1" />
                        Jewellery
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("men's clothing");
                        }}>
                        <i className="fa fa-user-plus m-r-1"></i>
                        Men's Clothing
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("women's clothing");
                        }}>
                        <i className="fa fa-shopping-cart m-r-1"></i>
                        Women's Clothing
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("electronics");
                        }}>
                        <i className="fa fa-shopping-cart m-r-1"></i>
                        Electronics
                    </a>

                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            getProducts("products");
                        }}>
                        <i className="fa fa-shopping-cart m-r-1"></i>
                        All
                    </a>
                    {categories.map((category, id) => {
                        <a key={id} className="btn btn-outline-dark m-r-1"
                            href="products/category/jewelery"
                            onClick={(e) => {
                                e.preventDefault();
                                getProducts(`products/category/${category}`)
                            }}>
                            <i className="fa fa-sign-in m-r-1" />

                        </a>
                    })}

                </div>
                <div className="product-lists container d-flex">
                    {filteredData.map((product, id) => {
                        return (
                            <div key={product.id} className="card product-card center">
                                <a href={`product/${product.id}`} 
                                // onClick={(e) => { e.preventDefault(); handleClick(product.id) }} 
                                key={product.id} >
                                    <img className="card-img-top prod-image contain" src={product.image} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text small">{(product.title).length < 35 ? (product.title) : (product.title).substring(0, 32) + "..."}</p>
                                        <div className="card-text small">Price : ${product.price}</div>
                                    </div>
                                </a>
                                <a className="btn btn-primary block" 
                                    onClick={ (e)=>
                                        {e.preventDefault(); 
                                        handleAddtoCart(product)}
                                    }
                                
                                >Add to Cart</a>
                            </div>
                        )
                    })}

                </div>

            </div>

        </>

    )
}
