import React from "react";
import DetailsSideSlideImages from "./detailsSideSlideImages";
import ProductDetailsMainInfo from "./ProductDetailsMainInfo";
import { ProductDetailsContainer } from "../styles/Details.style";
import { Query } from "react-apollo";
import {LOAD_PRODUCT}from "../graphql/product";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    var url = window.location.href;
    let idPlusCategoryIndex;

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
    let {
      selectedCurrencyIndex,
      getItemsAddedToCart,
      handleOnLinkClick,
      keepButtonActive,
      attributes,
      getSelectedProductSelectedAttributes,
    } = this.props;
    let { product } = this.state;
    // check if there is a product
    if (Object.keys(product).length === 0)
      return (
        <div>
          <h1> Loading.... </h1>{" "}
        </div>
      );
    return (
      <Query query={LOAD_PRODUCT} variables={{ product_id:idPlusCategoryIndex.substring(0 , idPlusCategoryIndex.length-1)  }}>

        {({loading ,error ,data})=>{
          if(loading)return <></>
          if(error) console.log(error)
          return<ProductDetailsContainer>
          <DetailsSideSlideImages product={data.product} />
          <ProductDetailsMainInfo
            product={data.product}
            selectedCurrencyIndex={selectedCurrencyIndex}
            idPlusCategoryIndex={idPlusCategoryIndex}
            handleOnLinkClick={handleOnLinkClick}
            getItemsAddedToCart={getItemsAddedToCart}
            keepButtonActive={keepButtonActive}
            attributes={attributes}
            getSelectedProductSelectedAttributes={
              getSelectedProductSelectedAttributes
            }
          />
        </ProductDetailsContainer>}}
      </Query>
    );
  }
}
export default ProductDetails;
