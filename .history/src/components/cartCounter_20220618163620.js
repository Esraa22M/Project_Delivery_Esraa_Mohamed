import React from "react";
/* import images for product counter */
import MinusSign from "../images/minus_sign.svg";
import PlusSign from "../images/plus_sign.svg";
class CartCounter extends React.Component {
  render() {
    let {product ,onIncrement,onDecrement} = this.props;
    return (
      <div className="flex flex-column flex-space-between">
        <div className="square" onClick={() => onIncrement(product)}>
          <img alt="mins-sign" className="minus" src={MinusSign} />
          <img alt="plus-sign" className="plus" src={PlusSign} />
        </div>
        <div className="counter-value flex flex-center items-center">
          {product.counter}
        </div>
        <div
          className="square "
          onClick={() => onDecrement(product)}
        >
          <img alt="mins-sign" className="minus" src={MinusSign} />
        </div>
      </div>
    );
  }
}
export default CartCounter;
