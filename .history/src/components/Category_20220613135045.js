import React from "react";
import ProductItem from "./ProductItem";
import { Title, ProductList } from "../styles/Category.style";
import { LOADD_ALL } from "../graphql/allCategory";
import {   useQuery,
} from "@apollo/client";

class Category extends React.Component {
  render() {
    let { category, categoryName } = this.props;
    return (
      <>
        {" "}
        <Title>Category {categoryName}</Title>
        <useQuery query={LOADD_ALL} variables={`${categoryName}`}>
          {({ loading, errror, data }) => {
            <ProductList>
              {this.props.category.products.map((item, i) => {
                return (
                  <ProductItem
                    product={item}
                    categoryId={0}
                    selectedCurrencyIndex={this.props.selectedCurrencyIndex}
                    key={i}
                    getDefaultAttributesSelection={
                      this.props.getDefaultAttributesSelection
                    }
                    getProductDetailsObject={this.props.getProductDetailsObject}
                    attributes={this.props.attributes}
                    getItemsAddedToCart={this.props.getItemsAddedToCart}
                  ></ProductItem>
                );
              })}
            </ProductList>;
          }}
        </useQuery>
      </>
    );
  }
}

export default Category;
