import React, { FC } from 'react'

import { CartContext } from "@/context"
import { format } from "@/utils/currency";
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

interface Props {
    orderValues?: {
        numberOfItems: number;
        subTotal: number;
        total: number;
        tax: number;
    }
}

export const OrderSummary:FC<Props> = ({ orderValues }) => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);     
    
    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, tax };

    return (
        <Grid container>
            
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{summaryValues.numberOfItems} 
                {/* { cart.length > 1 ? 'productos' : 'producto' } */}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ format(summaryValues.subTotal) }</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({ Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ format(summaryValues.tax) }</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt:2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{ format(summaryValues.total) }</Typography>
            </Grid>

        </Grid>
    )
}