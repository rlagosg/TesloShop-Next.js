
import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next';

import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';


const CartPage:NextPage = () => {

    const { isLoaded, cart } = useContext(CartContext);
    const router  = useRouter();

    useEffect(() => {
      if(isLoaded && cart.length === 0){
        router.replace('/cart/empty')
      }
    }, [isLoaded, cart, router]);
    
    if(isLoaded && cart.length === 0) {return (<></>)};

    return (
        <ShopLayout title={'Carrito - 3'} pageDescription={'Carrito de compras de la tienda'} >
            <Typography variant='h1' component='h1'>Carrito</Typography>

            <Grid container>

                {/* Lista de productos */}
                <Grid item xs={ 12 } sm={7}>
                    <CartList editable/>
                </Grid>

                {/* Ventana de totales */}
                <Grid item xs={ 12 } sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant="h2">Orden</Typography>
                            <Divider sx={{ my:1 }}/>

                            {/* Suma de totales */}
                            <OrderSummary/>
                            
                            <Box sx={{ mt:3 }}>
                                <Button color='secondary' href='/checkout/address' className='circular-btn' fullWidth>
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage;
