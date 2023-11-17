import { GetServerSideProps, NextPage } from 'next'

import { Box, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { FullScreenLoading } from '@/components/ui';
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

interface Props{
  foundProducts: boolean,
  query: string,
  products: IProduct[]
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query })=>  { 

  //const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout 
      pageDescription='Encuentra los mejores productos en Tesla-Shop' 
      title='Tesla-Shop - Search' 
    >
      <Typography variant='h1' component='h1'>Buscar Productos</Typography>

      {
        foundProducts 
          ? <Typography variant='h2' sx={{ mb: 1}} textTransform='capitalize'>Buscaste: { query }</Typography>
          :          
          <Box display={'flex'}>
            <Typography variant='h2' sx={{ mb: 1}}>no encontramos ningun producto relacionado con: </Typography>
            <Typography variant='h2' textTransform='capitalize' sx={{ ml: 1}} color='secondary'>{ query }</Typography>
          </Box>
          
      }


      <ProductList products={ products } />

    </ShopLayout>
  )
}

export default SearchPage;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { query = '' } = params as { query: string };

  if( query.length === 0 ){
    return{
      redirect: {
        destination: '/',
        permanent: true
      } 
    }
  }

  //lo hacemos por let porque puede que no retorne productos
  let products = await dbProducts.getProductsByTerm(query);

  const foundProducts = products.length > 0;

  if( !foundProducts ) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      foundProducts,
      products,
      query,
    }
  }
}
