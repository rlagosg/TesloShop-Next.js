import { NextResponse, type NextRequest } from "next/server"; 
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req: NextRequest) {
  
  const previousPage = req.nextUrl.pathname;
  const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const validRoles = ['admin','super-user','SEO'];
 
  if (previousPage.startsWith("/checkout")) {    
    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }  
    return NextResponse.next();
  }

  if (previousPage.startsWith("/admin")) {    

    if (!session || !validRoles.includes( session.user.role )) {
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }  
    return NextResponse.next();
  }
  

  if ( !session || !validRoles.includes( session.user.role ) ) {
      return new Response( JSON.stringify({ message: 'No autorizado' }), {
          status: 401,
          headers: {
              'Content-Type':'application/json'
          }
      });
  }

}
 
// Paginas donde entra la configuracion
export const config = {
  matcher: ["/checkout/:path*", "/admin", "/api/admin/:path*"],
};

// export const config = {
//   matcher: ['/checkout/address', '/checkout/summary']
// };