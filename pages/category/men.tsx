import React from 'react'

import { NextPage } from 'next'

import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui';

const MenPage: NextPage = () => {
    
    const { products, isLoading } = useProducts('/search/men');

    return (
      <ShopLayout 
        pageDescription='Encuentra los mejores productos en Tesla-Shop para Hombres' 
        title='Tesla-Shop - Mens' 
      >
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1}}>Productos para Hombres</Typography>
  
        {
          isLoading 
          ? <FullScreenLoading/>
          : <ProductList products={ products } />
        }      
  
      </ShopLayout>
    )
}

export default MenPage