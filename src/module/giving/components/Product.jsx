import { useContext, useEffect, useReducer } from 'react';
import tw from 'tailwind-styled-components';
import { CartContext } from '../contexts/CartContext';

export default function Product({ label = "Untitled", cost = 0, image = "demo", currentItemCount = 0 }) {
  const cartContext = useContext(CartContext);

  const itemCountReducer = (state, action) => {
    switch (action) {
      case '+':
        return state + 1;
      case '-':
        return state > 0 ? state - 1 : 0;
      default:
        return state;
    }
  }

  const [itemCounter, dispatch] = useReducer(itemCountReducer, currentItemCount);

  useEffect(() => {
    cartContext.updateCart({ label, cost, itemCounter })
  }, [itemCounter]);

  return (
    <Component>
      <HeaderLabelWrapper>
        <Label><strong>{label}</strong></Label>
      </HeaderLabelWrapper>

      <ControlsLabelWrapper>
        <div className="relative w-full mt-10 z-10" style={{}}>
          <ControlLabel className="left-3 font-bold" onClick={() => dispatch('-')}>-</ControlLabel>
          <ControlLabel className="right-3 font-bold" onClick={() => dispatch('+')}>+</ControlLabel>
        </div>
      </ControlsLabelWrapper>

      <PriceLabelWrapper>
        <Label>${cost}</Label>
      </PriceLabelWrapper>

      <FooterLabelWrapper>
        <Label>{itemCounter}</Label>
      </FooterLabelWrapper>

      <ImageWrapper style={{ backgroundImage: `url('../giving-images/${image}.jpg'), url('./giving-images/${image}.png')` }} />
    </Component>
  )
}

const Component = tw.div`relative w-36 h-36 select-none`;

const ImageWrapper = tw.div`
  w-full h-full bg-cover bg-center rounded-full border-[2px] border-gray-700 shadow-2xl
`;

const HeaderLabelWrapper = tw.div`absolute w-full flex justify-center -top-1`;
const FooterLabelWrapper = tw.div`absolute w-full flex justify-center -bottom-2`;
const PriceLabelWrapper = tw.div`absolute w-full flex justify-end top-14 left-3`;
const ControlsLabelWrapper = tw.div`
  absolute w-full h-full top-[50%] bottom-[50%] font-mono
`;

const Label = tw.div`
 text-center px-1 text-lg text-gray-700
 bg-gray-200 rounded-lg border-[1.5px] border-black
`;

const ControlLabel = tw.div`
 absolute text-center px-2 cursor-pointer
 bg-gray-200 rounded-full border-[1.5px] border-black
`;