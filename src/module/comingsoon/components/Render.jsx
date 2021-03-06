// import Image from 'next/image';
import Head from 'next/head';
import { FaFacebook } from 'react-icons/fa'
import DonateModal from './DonateModal';
import { useState } from 'react';

let imageScale = 10;

export default function Render() {
  let [donateModalOpen, setDonateModalOpen] = useState(false);

  return <div className="w-full h-full flex justify-center items-center bg-black">
    <Head>
      <title>Lazarus Living</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="bg-white p-10 w-[40rem] pb-5">
      <div className="">
        {/* <Image src={LogoImage} layout="intrinsic" width={`${4741/imageScale}px`} height={`${1997/imageScale}px`} /> */}
        {/* <Image src={LogoImage} layout="intrinsic" /> */}
        <img src={'logo.jpg'} />
      </div>
      <div className="flex flex-col gap-4 text-lg">
        <p className="text-2xl tracking-wider text-center mt-2">Lazarus Living is a community organization dedicated to providing medical services and resources to the vulnerable and underserved homeless populations in the Indianapolis area.</p>
        <hr className="text-gray-900 border-gray-300 m-2" />
        <p style={{ "textIndent": "2rem" }}>We currently rely on our volunteers to provide these critcal services to the community.  We have a need for caregivers, medical professionals, educators, chefs, housekeepers, plumbers, electricians, and so much more.</p>
        <p style={{ "textIndent": "2rem" }}>If you are interested in helping us with our mission, please visit our social media page for <a className="underline" href="https://www.facebook.com/lazarusliving/events">upcoming events</a> in the community, or consider <span className="underline cursor-pointer" onClick={() => setDonateModalOpen(true)}>donating</span> to our cause.</p>
        <div className="flex justify-center">
          <button className="text-white bg-black p-2 m-5 px-4 rounded-lg hover:bg-gray-800 hover:shadow-lg" onClick={() => setDonateModalOpen(true)}>Contribute / Donate</button>
        </div>
        <hr />
        <p className="text-sm text-center">&copy; Lazarus Living Inc. 2021 | Lazarus Living Inc. is a 501(c)3 organization.</p>
        <div className="text-5xl mx-auto p-1">
          <a href="https://www.facebook.com/lazarusliving" target="_blank"><FaFacebook className="hover:text-[#4267B2]" /></a>
        </div>
      </div>
    </div>

    <DonateModal open={donateModalOpen} close={() => setDonateModalOpen(false)} />
  </div>;
}