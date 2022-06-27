import React from "react";
import ProductItemCart from "./ProductItemCart";
import {
  ProductItemContainer,
  LinkContainer,
} from "../styles/ProdctItem.style";
class ProductItem extends React.Component {
  render() {
    let { gallery, brand, name, prices, inStock, id } = this.props.product;
    return (
      <ProductItemContainer>
        <LinkContainer
          onClick={() => this.props.getProductDetailsObject(this.props.product)}
          to={`/details/${id}${this.props.categoryId}`}
        >
          <article className="product-item product-out-of-stock flex-column-reverse flex-center ">
            <div className="main-content">
              <h2 className="title">
                <span>{brand} </span>
                <span>{name}</span>
              </h2>
              <div className="price">
                <span>
                  {prices[this.props.selectedCurrencyIndex].currency.symbol}
                </span>
                <span>{prices[this.props.selectedCurrencyIndex].amount}</span>
              </div>
            </div>
            <div className="picture ">
              <img src={gallery[0]} alt="product-item" />
            </div>
          </article>
          {!inStock ? (
            <div className="div-2 flex flex-center items-center">
              OUT OF STOCK
            </div>
          ) : (
            <></>
          )}
        </LinkContainer>
        {inStock ? (
          <ProductItemCart
            getItemsAddedToCart={this.props.getItemsAddedToCart}
            product={this.props.product}
            id={id}
            getDefaultAttributesSelection={this.props.getDefaultAttributesSelection}
          />
        ) : (
          <></>
        )}
      </ProductItemContainer>
    );
  }
}
export default ProductItem;
