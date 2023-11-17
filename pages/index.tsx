
import { Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui';

export default function HomePage() {

  const { products, isLoading } = useProducts('/products'); 

  return (
    <ShopLayout 
      pageDescription='Encuentra los mejores productos en Tesla-Shop' 
      title='Tesla-Shop' 
    >
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Todos los productos</Typography>

      {
        isLoading 
        ? <FullScreenLoading/>
        : <ProductList products={ products } />
      }      

    </ShopLayout>
  )
}
