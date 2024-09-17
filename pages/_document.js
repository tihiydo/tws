import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html style={{scrollBehavior: "smooth"}}>
      <Head />
      <body>
        <noscript
          dangerouslySetInnerHTML={{ __html:
          `<iframe 
                src="https://www.googletagmanager.com/ns.html?id=GTM-K5DK9LK"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
          ></iframe>`
        }}></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
