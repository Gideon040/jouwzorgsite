// middleware.ts

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'jouwzorgsite.nl';
  const cleanHostname = hostname.split(':')[0].toLowerCase();

  // Subdomain routing (e.g., naam.jouwzorgsite.nl)
  if (cleanHostname !== mainDomain && cleanHostname !== `www.${mainDomain}` && cleanHostname.endsWith(`.${mainDomain}`)) {
    const subdomain = cleanHostname.replace(`.${mainDomain}`, '');
    if (!pathname.startsWith('/site/') && pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = `/site/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  // Custom domain routing (e.g., lisa-verpleegkundige.nl)
  if (
    cleanHostname !== mainDomain &&
    cleanHostname !== `www.${mainDomain}` &&
    !cleanHostname.endsWith(`.${mainDomain}`) &&
    cleanHostname !== 'localhost'
  ) {
    const customDomain = cleanHostname.replace(/^www\./, '');

    const { data: site } = await supabase
      .from('sites')
      .select('subdomain')
      .eq('custom_domain', customDomain)
      .eq('published', true)
      .single();

    if (site?.subdomain && pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = `/site/${site.subdomain}`;
      return NextResponse.rewrite(url);
    }

    // Unknown custom domain or non-root path → fall through to Next.js
    return response;
  }

  // Block direct access to /site/* on main domain (should only be reached via rewrite)
  if (
    (cleanHostname === mainDomain || cleanHostname === `www.${mainDomain}`) &&
    pathname.startsWith('/site/')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Main domain: refresh session and handle auth routing
  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard', '/edit', '/settings'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Auth routes - redirect to dashboard if already logged in
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
