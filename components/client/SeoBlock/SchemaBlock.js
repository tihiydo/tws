import Head from 'next/head';

const SchemaBlock = ({ schema }) => {
  return (
    <Head>
        <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    </Head>
  )
}

export default SchemaBlock