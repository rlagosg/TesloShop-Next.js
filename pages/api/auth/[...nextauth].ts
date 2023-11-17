import NextAuth, { NextAuthOptions } from "next-auth"

import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

import { dbUsers } from "@/database";


declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
  interface User {
      id?: string
      _id: string
  }
};


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({
      name: 'Custom Login',

      credentials:{
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },

      async authorize(credentials){

        if (!credentials) return null;
        return await dbUsers.checkUserEmailPassword(
          credentials.email,
          credentials.password
        );
      }
      
    }),


    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),


  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },


  callbacks: {

    async jwt({ token, account, user }) {
      //console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
            token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = user;
          break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any
      return session;
    }
      
  }
};


export default NextAuth(authOptions);