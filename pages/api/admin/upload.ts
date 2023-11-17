import type { NextApiRequest, NextApiResponse } from 'next'

// yarn add formidable
// yarn add -D @types/formidable
import formidable from 'formidable';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';

// yarn add cloudinary
// si no funciona: yarn add cloudinary@1.28.1
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );


type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' });
    }
}


const saveFile = async( file: formidable.File ): Promise<string> => {

    // const data = fs.readFileSync( file.filepath );
    // fs.writeFileSync(`./public/${ file.originalFilename }`, data);
    // fs.unlinkSync( file.filepath ); // elimina
    // return;
    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    return secure_url;

}


const parseFiles = async(req: NextApiRequest): Promise<string> => {

    return new Promise( (resolve, reject) => {

        //preparamos el formulario para analizar el req
        const form = new IncomingForm();
        form.parse( req, async( err, fields, files ) => {
            console.log({ err, fields, files });

            if ( err ) {
                return reject(err);
            }

            const filePath = await saveFile( files.file![0] as File )
            resolve(filePath);
        })

    }) 

}


const uploadFile = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const imageUrl = await parseFiles(req);
    
    return res.status(200).json({ message: imageUrl });

}