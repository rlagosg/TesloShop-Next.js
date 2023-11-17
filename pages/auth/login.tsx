import React, { useState, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { signIn, getSession, getProviders} from "next-auth/react"

import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Link, TextField, Typography, Chip } from '@mui/material';

import { validations } from '@/utils';
import { AuthContext } from '@/context';
import { AuthLayout } from '@/components/layouts';


type FormData = {
    email   : string
    password: string
  }

const LoginPage = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const [showError, setShowError] = useState(false)
    useContext

    // Para el inicio de session
    const { loginUser } = useContext(AuthContext);
    const router = useRouter();


    // Obtenemos los proveedores de login
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then( prov => {
        // console.log({prov});
        setProviders(prov)
      })
    }, [])

    // Funcion para extraer la data con el OnSubmit
    const onLoginUser = async ({ email, password}:FormData )=>{

        setShowError(false);
        // const isValidLogin = await loginUser( email, password);

        // if(!isValidLogin){
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }

        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials', { email, password })
        
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onLoginUser) }>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
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
                                type='email'
                                label="Correo" 
                                variant="filled" 
                                fullWidth 
                                { ...register('email', {
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
                                variant="filled" fullWidth
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value:6, message: 'Minimo 6 caractes' }
                                })}
                                error = { !!errors.password }
                                helperText = { errors.password?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                type='submit'
                                color="secondary" className='circular-btn' 
                                size='large' fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                        
                            <NextLink href={ router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register' } passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                        
                        
                        {/* Proveedores de Login */}
                         <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map(( provider: any ) => {
                                    
                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }

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

export default LoginPage