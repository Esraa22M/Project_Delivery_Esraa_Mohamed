import styled from "styled-components";
import { Link } from "react-router-dom";

export let Nav = styled.nav`
  padding: 0;
  height:5rem;
  text-transform:uppercase;
  .bage{
    min-width:1.528vw;
    position:absolute;
    cursor: pointer;
    top:1.563rem;
    right:6.111vw;
    text-align:center;
    border-radius:50%;
    height:1.375rem;
      }
`;

export let NavLink = styled(Link)`
  color: var(--clr-black);
  padding:0 1.111vw ;
  padding-top:1.75rem;
  padding-bottom:1.875rem;
  text-decoration: none;
  font-size:1rem;
  font-weight:400;
   line-height: 1.2rem;
  text-align: center;
  cursor: pointer;
`;
export let Center = styled.div`
  display: flex;
  height:12.8vh;
  position:relative;
  margin-left:27vw;
  .circle,
  .upArrow ,.logo-part1,.logo-part2{
    position: absolute;
  }
.logo-part1,.logo-part2{
 max-width: 1.949rem;
 width:1.949rem;
}
.logo-part1{
  top:1.838rem;
  z-index:5;
}
.logo-part2{
  top:1.92rem;
  z-index:10;
}  
  .upArrow {
    top:2.428rem;
    z-index:30;
    left:1.1rem;

  }
  .circle {
    top:2.607rem;
    max-width: 0.88rem;
    width:0.88rem;
    height:8.99px;
    left:7.96px;
    z-index:25;
  }
 
`;


export let ShoppingCartIcon = styled.div`
  position: relative;
  cursor:pointer;
  width: 1.25rem;
  height: 0.813rem;
  margin-left: 1.375rem;
  .cart-icon {
    width: 100%;
    height: 100%;
  }
  .cart-leg-1,
  .cart-leg-2 {
    position: absolute;
    width: 0.274rem;
    height: 0.262rem;
    display: inline-block;
    top: 100%;
  }
  .cart-leg-2 {
    right: 0.133rem;
  }

`;
