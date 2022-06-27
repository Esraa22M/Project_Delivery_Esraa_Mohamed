import React from "react";
import ProductItem from "./ProductItem";
import { Title, ProductList } from "../styles/Category.style";
import { LOADD_CATERGORY } from "../graphql/Category";
import { Query } from "react-apollo";

class Category extends React.Component {
  render() {
    let {  categoryName } = this.props;
    return (
      <>
        <Title>Category {categoryName}</Title>
        <Query query={LOADD_CATERGORY} variables={{ category_name: categoryName }}>
          {({ loading, error, data }) => {
            if (loading) return <></>;
            if (error) console.log(error);
            return (
              <ProductList>
                {data.category.products.map((item, i) => {
                  return (
                    <ProductItem
                      product={item}
                      categoryId={0}
                      selectedCurrencyIndex={this.props.selectedCurrencyIndex}
                      key={i}
                      getDefaultAttributesSelection={
                        this.props.getDefaultAttributesSelection
                      }
                      getProductDetailsObject={
                        this.props.getProductDetailsObject
                      }
                      attributes={this.props.attributes}
                      getItemsAddedToCart={this.props.getItemsAddedToCart}
                    ></ProductItem>
                  );
                })}
              </ProductList>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Category;
