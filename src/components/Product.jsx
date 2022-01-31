import React, { useState, useEffect } from 'react'
import ProductDetail from './ProductDetail';
import { cartStore } from '../index.js'
import { Link } from 'react-router-dom'


export default function Products() {

    const [products, setProducts] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true);
    const [productId, setProductId] = useState(null)
    const baseUrl = 'https://fakestoreapi.com/'
    const [categories, setCategories] = useState([])

    // fetch products on load
    useEffect(() => {
        let url = 'products'

        getProducts(url)

    }, [])

    // retrieve products from api
    const getProducts = async (url) => {

        let searchUrl = url === "categories" ? (baseUrl + "products/categories") : (baseUrl + url)

        console.log(searchUrl)

        await fetch(searchUrl)
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                setFilteredData(json)
                setLoading(false)

            })
    }

    const handleClick = (id) => {
        console.log('product id = ', id)
        return (<ProductDetail id={id} />)
    }

    // dispatch addto cart on click
    const handleAddtoCart = (product) => {
        cartStore.dispatch({
            type: "ADD_ITEM",
            payload: product
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
                        <i className="far fa-gem m-r-1"></i>
                        Jewellery
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("men's clothing");
                        }}>
                        <i className="fas fa-tshirt"></i>
                        Men's Clothing
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("women's clothing");
                        }}>
                        <i className="fas fa-tshirt"></i>
                        Women's Clothing
                    </a>
                    <a className="btn btn-outline-dark m-r-1"
                        href="products/category/jewelery"
                        onClick={(e) => {
                            e.preventDefault();
                            categorizedData("electronics");
                        }}>
                        <i className="fas fa-laptop-house"></i>
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
                                <Link to={`product/${product.id}`}
                                    // onClick={(e) => { e.preventDefault(); handleClick(product.id) }} 
                                    key={product.id} >
                                    <img className="card-img-top prod-image contain" src={product.image} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text small">{(product.title).length < 35 ? (product.title) : (product.title).substring(0, 32) + "..."}</p>
                                        <div className="card-text small">Price : ${product.price}</div>
                                    </div>
                                </Link>
                                <a className="btn btn-primary block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddtoCart(product)
                                    }
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
