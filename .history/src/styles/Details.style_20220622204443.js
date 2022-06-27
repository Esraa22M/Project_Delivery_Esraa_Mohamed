import styled from "styled-components";
export let ProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  margin-top: 5rem;
  column-gap: 2.5rem;
  margin-bottom: 11.125rem;
  border: 1px solid black;
  .column-3 {
    margin-left: 4.167vw;
  }
  .details-product-main-info{
    border:1px solid blue;
  }
  .product-brand,
  .product-name {
    border:1px solid blue;

    font-size: 1.875rem;
    line-height: 1.688rem;
    min-width: 20.278vw;
  }
  .product-brand {
    font-weight: 600;
  }
  cursor: pointer;
  .product-name {
    margin-top: 1rem;

    margin-bottom: 1.188rem;
  }

  .column1-img {
    max-width: 4.938rem;
    height: 5rem;
    margin-bottom: 2.5rem;
  }
  .column-2-img {
    max-width: 42.361vw;
    width: 42.361vw;
  }
  .product-price {
    margin-top: 0.375rem;
  }
  .product-price-value {
    margin-top: 0.625rem;
    width: fit-content;
    height: 2.875rem;
  }
  .product-price-value span {
    font-weight: 700;
    font-size: 1.5rem;
  }
  .product-description {
    margin-top: 2.5rem;
  }
  
  .product-description *,
  .product-description {
    font-family: var(--ff-roboto) !important;
    width: 100%;
    line-height: 1.599rem !important;
  }
`;

export let ButtonDefault = styled.button`
  border: 1px solid var(--clr-black);
  background-color: var(--clr-white);
  letter-spacing: 5%;
  font-family: var(--ff-source);

  cursor: pointer;
`;
export let SwatchContainer = styled.div`
  margin-right: 0.556vw;
  padding: 2px !important;
`;
export let ButtonDefaultSwatch = styled.button`
  cursor: pointer;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 1px grey;
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;

export let AddToCartButton = styled.button`
  padding: 1rem 2.222vw 1rem 2.222vw;
  width: 100%;
  background-color: var(--clr-primary);
  font-weight: 600;
  line-height: 1.2rem;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.25rem;
`;
