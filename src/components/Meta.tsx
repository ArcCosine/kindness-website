import Head from 'next/head'

const SITE_NAME = 'Kindness Home'

const Meta = ({title=''})=>{
    const _title = title ? `${title} - ${SITE_NAME}` : SITE_NAME;

    return (
        <Head>
            <meta name="og:title" content={_title} />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{_title}</title>
        </Head>
    )
}

export default Meta
