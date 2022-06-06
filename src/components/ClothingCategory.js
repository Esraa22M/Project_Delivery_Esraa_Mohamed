import React from "react";
import { Title, ProductList } from "../styles/Category.style";
import ProductItem from "./ProductItem";
class ClothingCategory extends React.Component {
  render() {
    let { category } = this.props;
    return (
      <>
        <Title>Category {category.name}</Title>
        <ProductList>
          {this.props.category.products.map((item, i) => {
            return (
              <ProductItem
                product={item}
                categoryId={1}
                selectedCurrencyIndex={this.props.selectedCurrencyIndex}
                key={i}
                getDefaultAttributesSelection={
                  this.props.getDefaultAttributesSelection
                }
                attributes={this.props.attributes}
                getItemsAddedToCart={this.props.getItemsAddedToCart}
              ></ProductItem>
            );
          })}
        </ProductList>
      </>
    );
  }
}
export default ClothingCategory;
