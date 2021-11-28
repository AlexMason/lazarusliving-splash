import Giving from '../module/giving'
import Head from 'next/head'
import { CartContextProviderWrapper } from '../module/giving/contexts/CartContext'

export default function GivingPage() {
  return <CartContextProviderWrapper>
    <Head>
      <title>Lazarus Living - #GivingTuesday</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Giving />
  </CartContextProviderWrapper>;
}
