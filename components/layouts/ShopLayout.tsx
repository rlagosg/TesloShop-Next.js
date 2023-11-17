import Head from "next/head"
import { FC } from 'react'
import App from '../../pages/_app';
import { Navbar } from "../ui";
import { SideMenu } from "../ui/SideMenu";

interface Props{
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: React.ReactNode
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{title}</title>

            {/* informacion para bots */}
            <meta name="description" content={ pageDescription } />    

            {/* informacion para las redes sociales */}
            <meta name="og:title" content={ title } />     
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head>
        <nav>
            <Navbar />
        </nav>

        <SideMenu/>/

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            {children}
        </main>

        <footer>
            {/* Custom futter */}
        </footer>
    </>
  )
}
