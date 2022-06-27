import React from "react";
import Attributes from "./Attributes";
import CartCounter from "./cartCounter";
class MiniCartProductItem extends React.Component {
  render() {
    let {product , index ,keepButtonActive} = this.props;
    return (
      <article key={index} className="flex  flex-space-between min-product">
        <div className="column-1">
          <div className="product-header flex flex-column flex-space-between">
            <h2 className="product-brand">{product.brand}</h2>
            <p className="product-name">{product.name}</p>
          </div>
          <div className="min-product-price">
            <span>{product.prices[selectedCurrencyIndex].currency.symbol}</span>
            <span>{product.prices[selectedCurrencyIndex].amount}</span>
          </div>
          <Attributes
            product={product}
            keepButtonActive={keepButtonActive}
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
  }
}
export default MiniCartProductItem;
