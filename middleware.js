import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const isTechnicalWork = false;

export async function middleware(req) {

    const isTechnicalWorkPage = req.nextUrl.pathname === "/technical-work"

    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        req.nextUrl.pathname.includes('/adminpanel') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return
    }

    if (req.nextUrl.locale === 'default') {
        const locale = req.cookies.get('NEXT_LOCALE')?.value || 'uk'

        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }

    if(isTechnicalWork) {
        if(isTechnicalWorkPage) return
        return NextResponse.redirect(new URL(`/technical-work`, req.url))
    }
    if(isTechnicalWorkPage) {
        if(isTechnicalWork) return;
        return NextResponse.redirect(new URL(`/`, req.url))
    }
}