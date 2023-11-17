
import { ISize } from '@/interfaces';
import { Box, Button } from '@mui/material';
import React, { FC, useState } from 'react'

interface Props{
    selectedSize?: ISize;
    sizes: ISize[];
    onSelectedSize: ( size: ISize ) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {

  return (
    <Box>
        {
            sizes.map((size) =>(
                <Button
                    key={size}
                    size='small'
                    color={ selectedSize === size ? 'secondary' : 'info'}
                    onClick={ () => onSelectedSize( size )}
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
