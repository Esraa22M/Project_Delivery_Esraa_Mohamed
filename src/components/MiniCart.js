import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Title } from "../styles/Category.style";
import { MiniCartContainer, MinButton } from "../styles/Cart.style";
import MinusSign from "../images/minus_sign.svg";
import PlusSign from "../images/plus_sign.svg";
import {
  ButtonDefaultSwatch,
  ButtonDefault,
  SwatchButtonsContainer,
  SwatchContainer,
} from "../styles/Details.style";
class MiniCart extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      (JSON.stringify(this.props.itemsAddedToCart) !==
        JSON.stringify(prevProps.itemsAddedToCart) &&
        this.props.itemsAddedToCart.length) ||
      this.props.total !== prevProps.total
    ) {
      this.props.getTotal();
    }
  }
  componentWillUnmount() {
    this.props.getTotal();
  }
  render() {
    let {
      itemsAddedToCart,
      cartItemsCount,
      isCartClicked,
      selectedCurrencyIndex,
    } = this.props;

    return (
      <MiniCartContainer display={isCartClicked ? "block" : "none"}>
        <Scrollbars style={{width:325, height: 500 }} autoHide >
          {itemsAddedToCart.length ? (
            <>
              <h1 className="mincart-header">
                My Bag, <span>{cartItemsCount} items</span>
              </h1>
              {itemsAddedToCart.map((product, index) => {
                return (
                  <article
                    key={index}
                    className="flex  flex-space-between min-product"
                  >
                    <div className="column-1">
                      <div className="product-header flex flex-column flex-space-between">
                        <h2 className="product-brand">{product.brand}</h2>
                        <p className="product-name">{product.name}</p>
                      </div>
                      <div className="min-product-price">
                        <span>
                          {
                            product.prices[selectedCurrencyIndex].currency
                              .symbol
                          }
                        </span>
                        <span>
                          {product.prices[selectedCurrencyIndex].amount}
                        </span>
                      </div>
                      <div className="attributes-container">
                        {product.attributes.map((item, index) => {
                          let getId = item.id;
                          return [
                            <h2 key={index} className="min-attribute-header">
                              {item.name + ":"}
                            </h2>,
                            item.type !== "swatch" ? (
                              item.items.map((item, index) => {
                                return (
                                  <ButtonDefault
                                    key={item.id}
                                    marginRight="8px"
                                    width="1.667vw"
                                    height="1.5rem"
                                    marginBottom="0.5rem"
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
                                marginBottom="0.563rem"
                                className="flex"
                                key={index + "swatch"}
                              >
                                {item.items.map((item, index) => {
                                  return (
                                    <SwatchContainer
                                      key={index}
                                      height="1.25rem"
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
                                        width="1.111vw"
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
                    <div className="column-2 flex">
                      <div className="flex flex-column flex-space-between counter-container">
                        <div
                          onClick={() => this.props.onIncrement(product)}
                          className="square flex items-center flex-center"
                        >
                          <img
                            alt="mins-sign"
                            className="minus"
                            src={MinusSign}
                          />
                          <img
                            alt="plus-sign"
                            className="plus"
                            src={PlusSign}
                          />
                        </div>
                        <p className="flex flex-center items-center count">{product.counter}</p>
                        <div
                          onClick={() => this.props.onDecrement(product)}
                          className="square flex items-center"
                        >
                          {" "}
                          <img
                            alt="mins-sign"
                            className="minus"
                            src={MinusSign}
                          />
                        </div>
                      </div>
                      <img
                        src={product.gallery[0]}
                        alt="min-cart-product"
                        className="product-image"
                      />
                    </div>
                  </article>
                );
              })}
              <div>
                <div className="flex flex-space-between total-container">
                  <span>total:</span>
                  <span>
                    {
                      itemsAddedToCart[0].prices[
                        this.props.selectedCurrencyIndex
                      ].currency.symbol
                    }
                    {this.props.total}
                  </span>
                </div>
                <div className="flex flex-space-between items-center">
                  <MinButton
                    onClick={this.props.onCartClick}
                    to="/cart"
                    color="#FFFFFF"
                    text_color="#1D1F22"
                    border_color="#1D1F22"
                    className="flex flex-center items-center"
                  >
                    View bag
                  </MinButton>
                  <MinButton
                    onClick={this.props.onCartClick}
                    to="/checkout"
                    color="#5ECE7B"
                    text_color="white"
                    className="flex flex-center items-center"
                    border_color="#5ECE7B"
                  >
                    CHECK OUT
                  </MinButton>
                </div>
              </div>
            </>
          ) : (
            <Title className="flex flex-center ">cart is empty</Title>
          )}
        </Scrollbars>
      </MiniCartContainer>
    );
  }
}
// #endregion

export default MiniCart;
