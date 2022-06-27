import React from "react";
import DetailsSideSlideImages from "./detailsSideSlideImages";
import ProductMainInfo from "./ProductMainInfo";
import {
  ProductDetailsContainer,
}from "../styles/Details.style";
let idPlusCategoryIndex;
class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    var url = window.location.href;
    idPlusCategoryIndex = url.substring(url.lastIndexOf("/") + 1);
    this.state = {
      product: this.props.product
        ? this.props.product
        : JSON.parse(localStorage.getItem("productDetails")),
    };
    if (this.state.product.inStock)
      this.props.getDefaultAttributesSelection(this.state.product);
  }
  
  render() {
    let { selectedCurrencyIndex,getItemsAddedToCart,handleOnLinkClick } = this.props;
    let { product } = this.state;
    // check if there is a product
    if (Object.keys(product).length === 0)
      return (
        <div>
          <h1> Loading.... </h1>{" "}
        </div>
      );
    return (
      <>
        <ProductDetailsContainer>
          <DetailsSideSlideImages product={product}/>
          <ProductMainInfo 
          product={product}
          selectedCurrencyIndex={selectedCurrencyIndex}
          idPlusCategoryIndex={idPlusCategoryIndex}
          handleOnLinkClick={handleOnLinkClick}
          getItemsAddedToCart={getItemsAddedToCart}
          />
        </ProductDetailsContainer>
      </>
    );
  }
}
export default ProductDetails;
