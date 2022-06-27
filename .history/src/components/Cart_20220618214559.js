import React from "react";
import { Link } from "react-router-dom";

/* styled components import */
import { Title } from "../styles/Category.style";
import CartSlider from "./CartSlider";
import {
  CartTitle,
  ProductContainer,
  CartItemPrice,
} from "../styles/Cart.style";

import Attributes from "./Attributes";
import CartInfo from "./CartInfo";
import CartCounter from "./cartCounter";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.props.getTotal();
    this.props.getTax();
  }
  componentDidUpdate(prevProps) {
    if (
      (JSON.stringify(this.props.itemsAddedToCart) !==
        JSON.stringify(prevProps.itemsAddedToCart) &&
        this.props.itemsAddedToCart.length) ||
      this.props.total !== prevProps.total
    ) {
      this.props.getTotal();
      this.props.getTax();
    }
  }
  componentWillUnmount() {
    this.props.getTotal();
    this.props.getTax();
  }
  render() {
    let { itemsAddedToCart,total, Tax, selectedCurrencyIndex, quantity } = this.props;
    return (
      <>
        <CartTitle>CART</CartTitle>
        <hr />
        {itemsAddedToCart.map((product, index) => {
          return (
            <div key={index}>
              <ProductContainer key={index} className="flex flex-space-between">
                <div className="column flex-column ">
                  <h2 className="title flex items-center"> {product.brand}</h2>
                  <p className="name flex items-center">{product.name}</p>
                  <CartItemPrice className="flex items-center">
                    <span>
                      {product.prices[selectedCurrencyIndex].currency.symbol}
                    </span>
                    <span>{product.prices[selectedCurrencyIndex].amount}</span>
                  </CartItemPrice>
                 <Attributes product={product} keepButtonActive={this.props.keepButtonActive}/>
                </div>
                <div className="flex">
                  <CartCounter
                    product={product}
                    onIncrement={this.props.onIncrement}
                    onDecrement={this.props.onDecrement}
                  />
                  <CartSlider
                    images={product.gallery}
                    className="flex flex-center items-center"
                  />
                  <div className="flex flex-center items-center btn-container">
                    <Link
                      className="btn-details
                  
                  "
                      to={`/details/${product.id}${product.categoryId}
`}
                    >
                      {" "}
                      Go To Details
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => this.props.onRemove(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </ProductContainer>
              <hr />
            </div>
          );
        })}
       <CartInfo 
       itemsAddedToCart={itemsAddedToCart}
       quantity={quantity}
       total={total}
       Tax={Tax}
       selectedCurrencyIndex={selectedCurrencyIndex}
       />
      </>
    );
  }
}
export default Cart;
