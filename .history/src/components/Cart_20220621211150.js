import React from "react";
import CartInfo from "./CartInfo";
/* styled components import */
import { CartTitle } from "../styles/Cart.style";
import CartProductItem from "./CartProductItem";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.props.getTotal();
    this.props.getTax();
  }
  componentDidUpdate(prevProps) {
    if (
      (JSON.stringify(this.props.itemsAddedToCart) !==
        JSON.stringify(prevProps.itemsAddedToCart) &&
        this.props.itemsAddedToCart.length) ||
      this.props.total !== prevProps.total
    ) {
      this.props.getTotal();
      this.props.getTax();
    }
  }
  componentWillUnmount() {
    this.props.getTotal();
    this.props.getTax();
  }
  render() {
    let { itemsAddedToCart, total, Tax, selectedCurrencyIndex, quantity } =
      this.props;
    return (
      <>
        <CartTitle>CART</CartTitle>
        <hr />
        {itemsAddedToCart.map((product, index) => {
          return (
            <CartProductItem
              product={product}
              index={index}
              selectedCurrencyIndex={selectedCurrencyIndex}
              keepButtonActive={this.props.keepButtonActive}
              onIncrement={this.props.onIncrement}
              onDecrement={this.props.onDecrement}
            />
          );
        })}
        <CartInfo
          itemsAddedToCart={itemsAddedToCart}
          quantity={quantity}
          total={total}
          Tax={Tax}
          selectedCurrencyIndex={selectedCurrencyIndex}
        />
      </>
    );
  }
}
export default Cart;
