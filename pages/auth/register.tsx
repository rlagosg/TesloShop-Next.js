import React, { useContext, useState } from 'react'
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';

import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';

import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';

import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { AuthContext } from '@/context';
import { AuthLayout } from '@/components/layouts';

type FormData = {
    name    : string;
    email   : string;
    password: string;
  }

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Para el inicio de session
    const { registerUser } = useContext(AuthContext);
    const router = useRouter();

    const onRegiterForm = async ({ name, email, password}: FormData) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password); 

        if( hasError ){
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials',{ email, password });
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onRegiterForm) }>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color='error'
                                icon={ <ErrorOutline/> }
                                className='fadeIn'
                                sx={{ marginTop: 1, display: showError == true ? 'flex' : 'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre completo" 
                                variant="filled" 
                                fullWidth 
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value:4, message: 'Minimo 4 caractes' }
                                })}
                                error = { !!errors.name }
                                helperText = { errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                type="email"
                                label="Correo" 
                                variant="filled" 
                                fullWidth 
                                { ...register('email',{
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error = { !!errors.email }
                                helperText = { errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField                             
                                label="Contraseña" 
                                type='password' 
                                variant="filled" 
                                fullWidth 
                                { ...register('password',{
                                    required: 'Este campo es requerido',                       
                                    minLength: { value:6, message: 'Minimo 6 caractes' }
                                })}
                                error = { !!errors.password }
                                helperText = { errors.password?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" type="submit" className='circular-btn' size='large' fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={ router.query.p ? `/login/register?p=${ router.query.p }` : '/login/register'} passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}

export default RegisterPage