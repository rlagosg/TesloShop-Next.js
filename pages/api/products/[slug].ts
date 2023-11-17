import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) { 
        case 'GET':            
            return getProductSlug ( req, res );
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }  
}

const getProductSlug = async( req: NextApiRequest, res: NextApiResponse ) => {
    
    
    await db.connect();

    const { slug } = req.query;
    const productInDB = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !productInDB ) {
        return res.status(400).json({ message: 'No hay producto con el slug: ' + slug })
    }

    productInDB.images = productInDB.images.map( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
    });

    return res.status(200).json( productInDB );
}