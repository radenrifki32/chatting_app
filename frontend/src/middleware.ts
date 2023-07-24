import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
//   const cookie = request.cookies.get("jwt-token")
//   const { pathname } = request.nextUrl;

//   const url = request.nextUrl.clone()
//   url.pathname = '/'
//   if(!cookie && pathname !== '/'){ 
// return NextResponse.redirect(url)
//   }
  return NextResponse.next()
}