import React from "react";
import ProductItem from "./ProductItem";
import { Title, ProductList } from "../styles/Category.style";
import {LOADD_ALL} from "../graphql/allCategory";
import { Query } from "apollo-boost";

class Category extends React.Component {
  render() {
    let { category } = this.props;
    return (
      <QueryLazyOptions >
        <Title>Category {category.name}</Title>
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
        </ProductList>
      </QueryLazyOptions>
    );
  }
}

export default Category;
