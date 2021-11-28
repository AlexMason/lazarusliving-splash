import tw from 'tailwind-styled-components';

export default function Total({ total, openModal }) {
  return <div className="mb-10 flex flex-col gap-10 select-none">
    <TotalLabel>Total: ${total}</TotalLabel>
    <DonateButton onClick={() => openModal()}>Donate</DonateButton>
  </div>;
}

const TotalLabel = tw.div`text-center text-3xl`;
const DonateButton = tw.div`
  text-white text-3xl bg-black border-2 border-black
  rounded p-2 w-min m-auto cursor-pointer shadow-xl 
  hover:shadow-2xl hover:bg-white hover:text-black
`;