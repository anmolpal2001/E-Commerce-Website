import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'

const ProductDetailPage = () => {
  return (
    <div>
            <Navbar>
                <ProductDetail />
            </Navbar>
        </div>
  )
}

export default ProductDetailPage