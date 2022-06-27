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

import {
  ButtonDefaultSwatch,
  SwatchContainer,
  ButtonDefault,
} from "../styles/Details.style";
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
                  <h2 className="title"> {product.brand}</h2>
                  <p className="name">{product.name}</p>
                  <CartItemPrice>
                    <span>
                      {product.prices[selectedCurrencyIndex].currency.symbol}
                    </span>
                    <span>{product.prices[selectedCurrencyIndex].amount}</span>
                  </CartItemPrice>
                  <div className="attributes-container">
                    {product.attributes.map((item, index) => {
                      let getId = item.id;
                      return [
                        <h2 key={index} className="attribute-header">
                          {item.name + ":"}
                        </h2>,
                        item.type !== "swatch" ? (
                          item.items.map((item, index) => {
                            return (
                              <ButtonDefault
                                key={item.id}
                                marginRight="8px"
                                width="4.375vw"
                                height="2.813rem"
                                marginBottom="1rem"
                                className={
                                  this.props.keepButtonActive(
                                    item.id,
                                    getId,
                                    product.selectedattributes
                                  )
                                    ? "activeButton"
                                    : ""
                                }
                              >
                                {item.value}
                              </ButtonDefault>
                            );
                          })
                        ) : (
                          <div
                            marginBottom="0.375rem"
                            className="flex"
                            key={index + "swatch"}
                          >
                            {item.items.map((item, index) => {
                              return (
                                <SwatchContainer
                                  key={index}
                                  height="2.25rem"
                                  className={` ${
                                    this.props.keepButtonActive(
                                      item.id,
                                      getId,
                                      product.selectedattributes
                                    )
                                      ? "activeSwatchButton"
                                      : ""
                                  }
                          `}
                                >
                                  <ButtonDefaultSwatch
                                    key={index}
                                    width="2.222vw"
                                    color={item.value}
                                  ></ButtonDefaultSwatch>
                                </SwatchContainer>
                              );
                            })}
                          </div>
                        ),
                      ];
                    })}
                  </div>
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
