import { NextSeo } from "next-seo"

export default function SeoBlock ({ title, description, ogTitle, ogUrl, ogImageUrl, ogImageWidth, ogImageHeight, ogImageAlt, titleTemplate }) {
    return (
        <NextSeo 
            title={title}
            description={description}
            titleTemplate={titleTemplate}
            openGraph={ 
              ogImageUrl ? 
                {
                url: ogUrl ?? 'https://www.twinsann.com/',
                title: ogTitle ?? title ?? 'Twinsann',
                description: description ?? 'Twinsann',
                images: [
                  {
                    url: ogImageUrl,
                    width: ogImageWidth ?? 800,
                    height: ogImageHeight ?? 600,
                    alt: ogImageAlt ?? 'Twinsann',
                    type: 'image/jpeg',
                  }
                ],
                siteName: 'Twinsann.com',
                } : 
              undefined
            }
        />
    )
}