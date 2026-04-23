import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/workers/',
                '/admins/',
                '/api/',
                '/instructors/',
                '/_next/',
            ],
        },
        sitemap: 'https://www.inanst.com/sitemap.xml',
    }
}