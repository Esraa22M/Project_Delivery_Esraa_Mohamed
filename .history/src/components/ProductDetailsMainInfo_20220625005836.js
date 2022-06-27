import React from "react";
import { Markup } from "interweave";
import {
  AddToCartButton,
} from "../styles/Details.style";
import Attributes from "./Attributes";
class ProductDetailsMainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
    if (this.state.product.inStock)
      this.props.getDefaultAttributesSelection(this.state.product);
  }
  render() {
    let {
      product,
      selectedCurrencyIndex,
      idPlusCategoryIndex,
      handleOnLinkClick,
    } = this.props;
    return (
      <article className="flex flex-column column-3" key={product}>
        <div key={product} className="details-product-main-info">
          <h2 className="product-brand flex items-center">{product.brand}</h2>
          <p className="product-name flex items-center">{product.name}</p>
        </div>
        <Attributes
          product={product}
          attributes={this.props.attributes}
          keepButtonActive={this.props.keepButtonActive}
          className={[
            "not-swatch-button-details",
            "attribute-header",
            "",
            "swatch-container",
          ]}
          details={true}
          inStock={product.inStock}
          getSelectedProductSelectedAttributes={
            this.props.getSelectedProductSelectedAttributes
          }
        />

        <div>
          <p className="details-product-price flex items-center">PRICE:</p>
          <p className="product-price-value flex items-center">
            <span>{product.prices[selectedCurrencyIndex].currency.symbol}</span>
            <span>{product.prices[selectedCurrencyIndex].amount}</span>
          </p>
        </div>
        <div>
          {product.inStock ? (
            <AddToCartButton
              className={`text-light flex flex-column items-center flex-center`}
              onClick={() => {
                handleOnLinkClick(0);

                this.props.getItemsAddedToCart(
                  idPlusCategoryIndex.charAt(idPlusCategoryIndex.length - 1),
                  product,
                  this.props.attributes
                );
              }}
            >
              ADD TO CART
            </AddToCartButton>
          ) : (
            <></>
          )}
        </div>

        <Markup content={product.description} className="product-description" />
      </article>
    );
  }
}
export default ProductDetailsMainInfo;
