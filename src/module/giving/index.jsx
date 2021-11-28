import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';
import Product from './components/Product';
import Testomonial from './components/Testimonial';
import Total from './components/Total';
import GivingDonate from './components/GivingDonate';
import { CartContext, CartContextProviderWrapper } from './contexts/CartContext';

export default function Giving() {
  const cartContext = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState("Clothing");
  const [modalOpen, setModalOpen] = useState(false);

  const products = [
    // { category: "", label: "", cost: 5, image: "" },
    { category: "Clothing", label: "Shirt", cost: 8, image: "wintershirt" },
    { category: "Clothing", label: "Pants", cost: 12, image: "winterjeans" },
    { category: "Clothing", label: "Boots", cost: 20, image: "winterboots" },
    { category: "Construction", label: "Lumber", cost: 25, image: "lumber" },
    { category: "Construction", label: "PVC Piping", cost: 25, image: "pvc" },
    { category: "Construction", label: "Nails", cost: 5, image: "nails" },
    { category: "Medical", label: "Bandages", cost: 5, image: "bandages" },
    { category: "Medical", label: "OTC Drugs", cost: 10, image: "otcmeds" },
    { category: "Medical", label: "Medical Gloves", cost: 10, image: "gloves" },
  ];

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <PageWrapper>
      <Header>
        <img src="../logo.jpg" width="250px" />
      </Header>
      <Content>
        <Navigation>
          {products.reduce((a, c) => {
            if (a.some((e) => e == c.category)) {
              return a;
            }

            return [...a, c.category];
          }, []).map((category) => {
            return <NavItem $selected={selectedCategory == category} onClick={() => setSelectedCategory(category)}>{category}</NavItem>;
          })}
        </Navigation>
        <Products>
          {products.map((p) => {
            if (selectedCategory.toLowerCase() != p.category.toLowerCase()) {
              return;
            }

            return (
              <Product key={p.category + p.label}
                label={p.label}
                cost={p.cost}
                image={p.image}
                currentItemCount={cartContext.cart[p.label] ? cartContext.cart[p.label].itemCounter : 0} />
            );
          })}
        </Products>


        <div className="flex-grow">
          {/* flex spacing */}
        </div>

        <Testomonial />

        <Total total={cartContext.total} openModal={() => openModal()} />

      </Content>
      <GivingDonate open={modalOpen} close={() => closeModal()} />
      <Footer>© Lazarus Living Inc. 2021 | Lazarus Living Inc. is a 501(c)3 organization.</Footer>
    </PageWrapper>
  )
}

const PageWrapper = tw.div`flex flex-col justify-between h-full`;
const Header = tw.div`flex-shrink-0 border-b-[1px] border-black flex justify-center`;
const Footer = tw.div`flex-shrink-0 text-center text-sm font-light py-5 text-white bg-black`;
const Content = tw.div`flex-grow flex flex-col items-center`;
const Products = tw.div`flex flex-wrap gap-10 justify-center`;
const Navigation = tw.div`mb-10 flex gap-5 border-b-2 border-l-2 border-r-2 p-3`;
const NavItem = tw.div`text-lg font-bold cursor-pointer ${(p) => p.$selected ? "underline" : "text-gray-500"}`;