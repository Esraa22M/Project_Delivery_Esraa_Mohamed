import React from "react";
import { Link } from "react-router-dom";
/* styled components import */
import CartSlider from "./CartSlider";
import {
  ProductContainer,
  CartItemPrice,
} from "../styles/Cart.style";
import Attributes from "./Attributes";
import CartCounter from "./cartCounter";
class CartProductItem extends React.Component {
  render() {
    let {product,selectedCurrencyIndex,index} = this.props;
    return (
      <div key={index}>
        <ProductContainer key={index} className="flex flex-space-between">
          <div className="column flex-column ">
            <h2 className="title flex items-center"> {product.brand}</h2>
            <p className="name flex items-center">{product.name}</p>
            <CartItemPrice className="flex items-center">
              <span>
                {product.prices[selectedCurrencyIndex].currency.symbol}
              </span>
              <span>{product.prices[selectedCurrencyIndex].amount}</span>
            </CartItemPrice>
            <Attributes
              product={product}
              keepButtonActive={this.props.keepButtonActive}
              className={[
                "not-swatch-button-cart",
                "attribute-header",
                "swatch-container-wrapper-cart",
                "swatch-container",
              ]}
              attributes={product.selectedattributes}
            />
          </div>
          <div className="flex">
            <CartCounter
              product={product}
              onIncrement={this.props.onIncrement}
              onDecrement={this.props.onDecrement}
            />
            <CartSlider
              images={product.gallery}
              className="flex flex-center items-center"
            />
            <div className="flex flex-center items-center btn-container">
              <Link
                className="btn-details"
                to={`/details/${product.id}${product.categoryId}
`}
              >
                {" "}
                Go To Details
              </Link>
              <button
                className="delete-btn"
                onClick={() => this.props.onRemove(product)}
              >
                Remove
              </button>
            </div>
          </div>
        </ProductContainer>
        <hr />
      </div>
    );
  }
}
export default CartProductItem;
