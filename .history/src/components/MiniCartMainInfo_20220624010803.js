import React from "react";
import { Link } from "react-router-dom";
class MiniCartMainInfo extends React.Component {
  render() {
    let {itemsAddedToCart,selectedCurrencyIndex,onCartClick ,total} = this.props;
    return (
      <div>
        <div className="flex flex-space-between total-container">
          <span className="flex items-center">total:</span>
          <span>
            {
              itemsAddedToCart[0].prices[selectedCurrencyIndex]
                .currency.symbol
            }
            {total}
          </span>
        </div>
        <div className="flex flex-space-between items-center">
          <Link
            onClick={onCartClick}
            to="/cart"
            className="flex flex-center items-center mini-buttons view-bag-button"
          >
            View bag
          </Link>
          <Link
            onClick={onCartClick}
            to="/checkout"
            color="#5ECE7B"
            text_color="white"
            className="flex flex-center items-center check-out-button mini-buttons"
          >
            CHECK OUT
          </Link>
        </div>
      </div>
    );
  }
}
export default MiniCartMainInfo;
