import React, {useEffect} from 'react';
import { Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from "../actions/productActions"
import Paginate from '../components/Paginate'
import Product from "../components/Product";
import ProductCarousel from '../components/ProductCarousel'
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import Message from "../components/Message";


const HomeScreen = ({match}) => {
    const keyword= match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList);
    const {loading ,error , products, page, pages} = productList


    useEffect(()=>{
       dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    

    return (  
        <>
        <Meta/>
        {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
        <h1 className="my-3 mt-5">Latest Products</h1>
        {loading?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):(
            <>
            <Row>
            {  
                products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={3} xl={3}><Product product={product}/></Col>
                ))
            }
        </Row>
        <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
        )}
        
        </>
    );
}
 
export default HomeScreen;