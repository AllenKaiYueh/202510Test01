import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )

  const session = await supabase.auth.getSession() 

  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: '/about/:path*',
}