import Head from 'next/head'

export default function Seo({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  )
}