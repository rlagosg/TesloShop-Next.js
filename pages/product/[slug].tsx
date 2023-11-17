import React, { useContext, useState } from 'react'

import { useRouter } from 'next/router';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'

import { ShopLayout } from '@/components/layouts'
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';

import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { dbProducts } from '@/database';
import { CartContext } from '@/context';
 
//const product = initialData.products[0];

interface Props{
  product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id ,
    image: product.images[0] ,
    price: product.price ,
    size: undefined ,
    slug: product.slug ,
    title: product.title ,
    gender: product.gender ,
    quantity: 1 ,
  });

  const selectedSize = ( size: ISize) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct ,
      size,
    }));

  }

  const onUpdatedQuantity = ( quantity: number) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct ,
      quantity
    }));
  }

  const onAddProduct = () => {

    if ( !tempCartProduct.size ) { return; }

    addProductToCart(tempCartProduct);
    router.push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description} >
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* Titulos */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>${ `${product.price}` }</Typography>

            {/* Camtidad */}
            <Box>
              <Typography sx={{ my: 2 }} variant='subtitle2'>Cantidad</Typography>

              <ItemCounter maxValue={ product.inStock } currentValue={tempCartProduct.quantity } updatedQuantity={ onUpdatedQuantity}/> 

              <SizeSelector 
                selectedSize={ tempCartProduct.size } 
                sizes={product.sizes}
                // onSelectedSize={ (size) => selectedSize( size )} 
                onSelectedSize={ selectedSize } 
              />
            </Box>

            {/* Agregar al Carrito */}
            {
              product.inStock > 0  ?
              (
                <Button sx={{marginTop: 1}} color='secondary' className='circular-btn'
                onClick={ onAddProduct }
                >
                  {
                    tempCartProduct.size 
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                  }
                </Button>
              ):
             (  <Chip sx={{marginTop: 1}} label="No hay disponible" variant='outlined'  color='error'/>
             )
            }
            

            

            {/* Descripcion */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2' component='h2'>Descripcion</Typography>
              <Typography variant='body2' component='h2'>{product.description }</Typography>
            </Box>

          </Box>

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default ProductPage

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug(slug);

//   if(!product){
//     return{
//       redirect: {
//         destination: '/',
//         permanent: false
//       } 
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

/* Rutas estaticas */
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  //const { products, isLoading } = useProducts('/products');
  const products = await dbProducts.getAllProductSlugs();

  return {  
    paths: products.map(({ slug }) => (
      {
        params: {
          slug
        }
      }
    )),

    fallback: 'blocking'
  }
}
 
/* los objetos estaticos */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug( slug );

  if(!product){
    return{
      redirect: {
        destination: '/',
        permanent: false
      } 
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}