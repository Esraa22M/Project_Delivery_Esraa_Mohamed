import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Title } from "../styles/Category.style";
import { MiniCartContainer } from "../styles/Cart.style";
import Attributes from "./Attributes";
import CartCounter from "./cartCounter";
import MiniCartMainInfo from "./MiniCartMainInfo";
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
      total,
      selectedCurrencyIndex,
      onCartClick
    } = this.props;

    return (
      <MiniCartContainer display={isCartClicked ? "block" : "none"}>
        <Scrollbars style={{ width: 400, height: 500 }} autoHide>
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
                      <Attributes
                        product={product}
                        keepButtonActive={this.props.keepButtonActive}
                        className={[
                          "not-swatch-button-default-mini-cart",
                          "min-attribute-header",
                          "swatch-container-wrapper-min-cart",
                          "swatch-container-mini-cart",
                        ]}
                        attributes={product.selectedattributes}
                      />
                    </div>
                    <div className="column-2 flex">
                      <CartCounter
                        product={product}
                        onIncrement={this.props.onIncrement}
                        onDecrement={this.props.onDecrement}
                      />
                      <img
                        src={product.gallery[0]}
                        alt="min-cart-product"
                        className="product-image"
                      />
                    </div>
                  </article>
                );
              })}
              <MiniCartMainInfo itemsAddedToCart={itemsAddedToCart} selectedCurrencyIndex={selectedCurrencyIndex} total={total} onCartClick={onCartClick}/>
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
