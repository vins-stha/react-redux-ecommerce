import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetail(props) {
    const { id } = useParams(); // props.prod_id // !== undefined ?  props.prod_id : useParams

    const [productDetail, setPrdouctDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const baseUrl = 'https://fakestoreapi.com/'
    useEffect(() => {
        // product_id = 1
        getProduct(id)

    }, [])

    const getProduct = async (id) => {

        let searchUrl = baseUrl + `products/${id}`

        console.log('url', searchUrl)

        await fetch(searchUrl)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setPrdouctDetail(json)
                setIsLoading(false)

            })
    }
    const SingleProduct = () => {
        return (
            <>
                 <div className="d-flex">
                    <img src={productDetail.image} className=" prod-detail-git image card-img-top" alt="" height="250px" border="1px solid black" />
                    <div className="details flex-column">
                        <h4 className="text-uppercase text-black-50">{productDetail.category}</h4>
                        <h1 className='display-5'>{productDetail.title}</h1>
                        <p className='product-rating'>Rating: {productDetail.rating && productDetail.rating.rate}</p>
                        <h3>Price : $ {productDetail.price}</h3>
                        <p className='lead'>{productDetail.description}</p>
                        <h6>Colors : </h6>
                        <h6>Quantity : </h6>
                    
                        <div className="prod-buttons buttons d-flex">
                            <a className="btn btn-outline-dark "
                            href="/buy">
                            <i className="fas fa-cart-plus m-r-1"/>Buy now</a>
                            <a className="btn btn-outline-dark">
                            <i className="fa fa-shopping-cart m-r-1"/>Add to Cart</a>
                        </div>
                    </div>
                     
                
                </div>
            </>
        )
    }

    const Loading = () => {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    return (
        <div>
            <div className="container justify-content-center position-relative mt-5 p-b-7" height="auto">
                {isLoading ? <Loading/> : <SingleProduct/>}
              
              
            
             
             </div>
          

        </div>
    )
}
