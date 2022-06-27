import styled from "styled-components";
import { Link } from "react-router-dom";
export let CartTitle = styled.h1`
  margin-top: 5rem;
  font-weight: 700;
  margin-bottom: 3.688rem;
  font-size: 2rem;
  line-height: 2.5rem;
`;
export let ProductContainer = styled.section`
  padding: 1.5rem 0;
  .title,
  .name {
    font-size: 1.875rem;
    line-height: 1.688rem;
    min-width: 20.278vw;
    text-align: left;
  }
  .title {
    font-weight: 600;
  }
  .name {
    margin-top: 1rem;
  }

  .square {
    height: 2.813rem;
    width: 2.813rem;
    border: 1px solid black;
    cursor: pointer;
    position: relative;
  }
  .counter-value {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.4rem;
    text-align: center;
  }
  .minus,
  .plus {
    position: absolute;
  }
  .plus {
    top: 0.938rem;
    left: 1.406rem;
    width:1px;
    height: 0.938rem;
  }
  .minus {
    left: 0.938rem;
    top: 1.406rem;
    height:1px;
    width:0.938rem;
  }
  .btn-details {
    text-decoration: none;
    color: var(--clr-primary);
    border-right: 1px solid var(--clr-primary);
    border-left: 1px solid var(--clr-white);
    border-top: 1px solid var(--clr-white);
    border-bottom: 1px solid var(--clr-white);

  }
  .delete-btn{
    color:red;
    background-color:transparent;
    margin-left:1vw;
    border: 1px solid var(--clr-white);
    border-right:1px solid red;

  }
  .btn-details,
  .delete-btn {
    text-transform: uppercase;
    padding: 1rem 0.5rem;
    font-size:1.2rem;
    cursor: pointer;
    border-left: 1px solid var(--clr-white);
    border-top: 1px solid var(--clr-white);
    border-bottom: 1px solid var(--clr-white);
  }
  .btn-container {
    margin-left: 1.4vw;
  }
  .btn-details:hover,
  .btn-details:focus {
    border: 1px solid var(--clr-primary);
    background-color: var(--clr-primary);
    color: var(--clr-white);
  } 
  .delete-btn:hover,
  .delete-btn:focus {
    border: 1px solid red;
    background-color: red;
    color: var(--clr-white);
  } 
 
`;

export let CartItemPrice = styled.div`
  span{font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;}
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  
`;

export let CartSliderContainer = styled.div`
  width: 19.58vw;
  height: 100%;
  margin-left: 1.667vw;
  position: relative;
  .next,
  .prev {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.667vw;
    height: 1.5rem;
    bottom: 1rem;
    background: hsla(0, 0%, 0%, 0.73);
    cursor: pointer;
  }
  .next {
    right: 1.111vw;
  }
  .prev {
    right: 3.333vw;
  }
`;
/* min-cart style */
export let MiniCartContainer = styled.section`
display:${props=>props.display};
background-color:var(--clr-white);
z-index:30;
min-width:fit-content;
padding:2rem 1.111vw;
width:22.569vw;
position:absolute;
right:5vw;
top:5rem;
overflow:'overlay';
height:fit-content;
.product-image{
  width:8.403vw;
  height:100%;
}
.mincart-header,.product-header , .product-price span{
  line-height:1.6rem;

}
.counter-container{
  margin-left:1.25rem;
  margin-right:0.5rem;
}
.mincart-header {
  font-weight:700;
  margin-bottom:2rem;
}
.product-header , .product-header h2{
 height: 3.25rem;
 font-weight:300;
}
.min-product-price{
  margin-top:4px;

}
.min-product-price span{
  font-weight:500;
}
h2.min-attribute-header{
  margin:0.5rem 0;
  font-size:0.875rem;
  line-height:1rem;
}
.min-product{
  margin-bottom:2.5rem;
}
.square{
  width:1.5rem;
  height:1.5rem;
  position:relative;
  border:1px solid var(--clr-black);
}
.minus ,.plus{
  position:absolute;
  cursor: pointer;
}
.minus{
  top:0.75rem;
  height:1px;
  left:0.5rem;
  width:0.5rem;
}
.plus{
  top:0.5rem;
  height:0.5rem;
  width:1px;
  left:0.75rem;
}
.total-container{
  margin-top:-.5rem;
  margin-bottom:2rem;
}
.total-container>span:first-child{
 font-family:var(--ff-roboto);
 font-weight:500;
 text-transform:capitalize;
}
.total-container>span:last-child{
  font-weight:700;
  line-height:1.6rem;
  
}
.count{
  font-weight:500;
  line-height:1.6rem;
}
`
export let MinButton = styled(Link)`
 text-decoration:none;
 width:9.722vw;
 height:2.688rem;
 text-transform:uppercase;
 font-size:0.875;
 line-height:1.05rem;
 background-color:${props=>props.color};
 color:${props=>props.text_color};
 border:1px solid ${props=>props.border_color};
 font-weight:600;
`