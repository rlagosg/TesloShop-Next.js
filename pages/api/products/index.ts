import { SHOP_CONSTANTS, db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IProduct
| IProduct[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':            
            return getProducts ( req, res );
        
        //case 'POST':            
            //return postEntry ( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }  
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query; 

    let condition = {  };

    if( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)){
        condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
    .lean()
    .select('title images price inStock slug -_id')
    .sort({ createAt: 'ascending' });        
    await db.disconnect();

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    })


    return res.status(200).json( updatedProducts );
   // return res.status(200).json( products );


};