import React from 'react'
import { NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui';


const KidPage:NextPage = () => {
    const { products, isLoading } = useProducts('/search/kid');

    return (
      <ShopLayout 
        pageDescription='Encuentra los mejores productos en Tesla-Shop para Kids' 
        title='Tesla-Shop - Kids' 
      >
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1}}>Productos para Kids</Typography>
  
        {
          isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={ products } />
        }      
  
      </ShopLayout>
    )
}

export default KidPage