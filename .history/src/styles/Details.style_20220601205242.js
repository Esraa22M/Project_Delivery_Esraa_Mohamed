import styled from "styled-components";
import { Link } from "react-router-dom";
export let ProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  margin-top:5rem;
  column-gap:2.5rem;
.column-3{
  margin-left:4.167vw;
}
.product-brand,  .product-name{
font-size:1.875rem;
line-height:1.688rem;
min-width:20.278vw;
}
.product-brand{
font-weight:600;

}
cursor: pointer;
.product-name{
margin-top:1rem;
margin-bottom:1.188rem;
}


.column1-img{
max-width:4.938rem;
height:5rem;
margin-bottom:2.5rem;
}
.column-2-img{
max-width:42.361vw;
width:42.361vw;

}
.product-price{
  margin-top:0.375rem;
}
.product-price-value {
margin-top:0.625rem;
width:fit-content;
height:2.875rem;
}
.product-price-value span{
font-weight:700;
font-size:1.5rem;
}
.product-description{
font-family:var( --ff-roboto);
width:20.278vw;
line-height:1.599rem;
margin-top:2.5rem;
}
`;
 
export let ButtonDefault = styled.button`
  border: 1px solid var(--clr-black);
  background-color: var(--clr-white);
  letter-spacing: 5%;
  font-family:var(--ff-source);
  min-width:${props=>props.width};
  max-width:fit-content;
  min-height:${props=>props.height};
  max-height:${props=>props.height};
  margin-bottom:${props=>props.marginBottom};

  cursor: pointer;
  margin-right:${props =>props.marginRight};
`;
export let SwatchButtonsContainer = styled.div`
margin-bottom:${props=>props.marginBottom};
`;
export let SwatchContainer = styled.div`
  margin-right:0.556vw;
 height:${props=>props.height};
 padding:2px !important;

`
export let ButtonDefaultSwatch = styled.button`
  cursor: pointer;
  width:${props=>props.width};
  height:100%;
  box-shadow: 0 0 1px grey;
  background-color:${props=>props.color};
  border-color:${props=>props.color};
`

export let AddToCartButton = styled(Link)`
 padding: 1rem 2.222vw 1rem 2.222vw;
 background-color:var(--clr-primary);
 font-weight:600;
 text-decoration:none;
 line-height:1.2rem;
 text-align:center;
 cursor: pointer;
 font-size:1rem;
 margin-top:1.25rem;
`;
