import styled from "styled-components";
import { Link } from "react-router-dom";

export let ProductItemContainer = styled.div`
  margin-bottom: 6.438rem;
  

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  article.product-item {
    padding: 1rem;
   border:1px solid black;
  }
  .card-icon {
    position: absolute;
    width: 3.25rem;
    display: none;
    height: 3.25rem;
    background-color: var(--clr-primary);
    z-index: 20;
    right: 1.938rem;
    bottom: 4.5rem;
    cursor: pointer;
    border-radius: 50%;
    .cart-leg {
      position: absolute;
      bottom: 0.875rem;
    }
    .cart-leg:last-of-type {
      right: 1.034rem;
    }
  }
  &:hover .card-icon {
    display: flex;
  }
  position: relative;
  height:27.75rem;
  max-width:24.125rem;
  width:24.125rem;
  z-index: 4;
  .picture img {
    min-height: auto;
    width:auto;
    max-width:338px;
    max-height: auto;
    height:20.625rem;
  }
  .main-content{
    margin-top:1.5rem;
    background-color:blue;
  }
  .main-content .title span,
  .main-content .price span {
    line-height: 1.8rem;
    font-size: 1.125rem;
  }
  .main-content .title{
    display:flex;

  }
  .main-content .title span {
    font-weight: 300;
    background-color:black;
  }
  .main-content .price span {
    font-weight: 500;
    text-align:right;
  }
  .product-out-of-stock,
  .div-2 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .div-2 {
    opacity: 0.5;
    font-size: 1.5rem;
    text-transform: uppercase;
    line-height: 2.4rem;
    background-color: var(--clr-white);
    color: var(--clr-light-grey);
  }
`;
export let LinkContainer = styled(Link)`
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
`;
