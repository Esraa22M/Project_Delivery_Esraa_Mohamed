import React from "react";
import { Link } from "react-router-dom";

/* styled components import */
import {  Title } from "../styles/Category.style";
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
  SwatchButtonsContainer,
} from "../styles/Details.style";
/* import images for product counter */
import MinusSign from "../images/minus_sign.svg";
import PlusSign from "../images/plus_sign.svg";

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
    let { itemsAddedToCart, Tax, selectedCurrencyIndex, quantity } = this.props;
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
                          <SwatchButtonsContainer
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
                          </SwatchButtonsContainer>
                        ),
                      ];
                    })}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-column flex-space-between">
                    <div
                      className="square"
                      onClick={() => this.props.onIncrement(product)}
                    >
                      <img alt="mins-sign" className="minus" src={MinusSign} />
                      <img alt="plus-sign" className="plus" src={PlusSign} />
                    </div>
                    <div className="counter-value flex flex-center items-center">
                      {product.counter}
                    </div>
                    <div
                      className="square "
                      onClick={() => this.props.onDecrement(product)}
                    >
                      <img alt="mins-sign" className="minus" src={MinusSign} />
                    </div>
                  </div>
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
        <div>
          {itemsAddedToCart.length ? (
            <div className="order-info">
              <p className="tax flex flex-space-between">
                <span>Tax 21%:</span>
                <span className="tax-value">
                  {
                    itemsAddedToCart[0].prices[this.props.selectedCurrencyIndex]
                      .currency.symbol
                  }
                  {Tax}
                </span>
              </p>
              <p className="quantity flex  items-center">
                <span>Quantity:&nbsp;</span>
                <span className="quantity-value">{quantity}</span>
              </p>
              <p className="total">
                <span>total:</span>
                <span>
                  {
                    itemsAddedToCart[0].prices[this.props.selectedCurrencyIndex]
                      .currency.symbol
                  }
                  {this.props.total}
                </span>
              </p>
              <Link
                to="/cart"
                className="btn-order flex flex-center items-center"
              >
                order
              </Link>
            </div>
          ) : (
            <Title className="flex flex-center items-center">
              Cart is empty
            </Title>
          )}
        </div>
      </>
    );
  }
}
export default Cart;
