import { NextResponse, NextRequest } from 'next/server'
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    role?: string;
  }
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const encriptedToken = request.cookies.get('token')?.value || "";
    const {pathname,origin} = request.nextUrl;
    const isDashboardRoutes = pathname.startsWith("/dashboard");

    if(!encriptedToken ){
        if(isDashboardRoutes){
         
               return NextResponse.redirect(`${origin}/login`) 
           
        }

    } else {
        const decoded= jwtDecode<CustomJwtPayload>(encriptedToken);
        if(isDashboardRoutes && decoded?.role!=="admin"){
            return NextResponse.redirect(`${origin}`) 
        }
        

        if(pathname==="/login"){
            if(isDashboardRoutes && decoded?.role!=="admin"){
                return NextResponse.redirect(`${origin}`) 
            }
            
                return NextResponse.redirect(`${origin}/dashboard`) 
            
        }
    }
    return NextResponse.next()
  
}
