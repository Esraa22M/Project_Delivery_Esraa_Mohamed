import React from "react";
import ProductItem from "./ProductItem";
import { Title, ProductList } from "../styles/Category.style";
import { LOADD_ALL } from "../graphql/allCategory";
import {   Query,
} from "react-apollo";

class Category extends React.Component {
  render() {
    let { category, categoryName } = this.props;
    return (
      <>
        {" "}
        <Title>Category {categoryName}</Title>
        <Query query={LOADD_ALL} variables="categoryName">
          {({ loading, errror, data }) => {
            if(loading) return <h4>loading</h4>
            if (error) console.log(error)


           return <ProductList>
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
        </Query>
      </>
    );
  }
}

export default Category;
