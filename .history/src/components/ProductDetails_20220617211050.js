import React from "react";
import DetailsSideSlideImages from "./detailsSideSlideImages";
import ProductDetailsMainInfo from "./ProductDetailsMainInfo";
import { ProductDetailsContainer } from "../styles/Details.style";
import { Query } from "react-apollo";
import {LOAD_PRODUCT}from "../graphql/product";
let idPlusCategoryIndex;

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    var url = window.location.href;

    idPlusCategoryIndex = url.substring(url.lastIndexOf("/") + 1);
  }
  

  render() {
    let {
      selectedCurrencyIndex,
      getItemsAddedToCart,
      handleOnLinkClick,
      keepButtonActive,
      attributes,
      getDefaultAttributesSelection,
      getSelectedProductSelectedAttributes,
    } = this.props;
   
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
            getDefaultAttributesSelection={getDefaultAttributesSelection}
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
