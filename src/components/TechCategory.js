import React from "react";
import ProductItem from "./ProductItem";
import { Title, ProductList} from "../styles/Category.style";
class TechCategory extends React.Component {
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
                categoryId={2}
                getDefaultAttributesSelection={
                  this.props.getDefaultAttributesSelection
                }
                selectedCurrencyIndex={this.props.selectedCurrencyIndex}
                key={i}
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
export default TechCategory;
