import React from "react";
import ProductItemCart from "./ProductItemCart";
import ProductItem from "./ProductItem";
import {
  ProductItemContainer,
  LinkContainer,
} from "../styles/ProdctItem.style";
class ProdctItemCard extends React.Component {
  render() {
    let { product ,selectedCurrencyIndex} = this.props;
    return (
      <ProductItemContainer>
        <LinkContainer
          onClick={() => this.props.getProductDetailsObject(this.props.product)}
          to={`/details/${product.id}${this.props.categoryId}`}
        >
         <ProductItem product={product} selectedCurrencyIndex={selectedCurrencyIndex}></ProductItem>
          {!product.inStock ? (
            <div className="div-2 flex flex-center items-center">
              OUT OF STOCK
            </div>
          ) : (
            <></>
          )}
        </LinkContainer>
        {product.inStock ? (
          <ProductItemCart
            getItemsAddedToCart={this.props.getItemsAddedToCart}
            product={product}
            id={product.id}
            getDefaultAttributesSelection={this.props.getDefaultAttributesSelection}
          />
        ) : (
          <></>
        )}
      </ProductItemContainer>
    );
  }
}
export default ProdctItemCard;
