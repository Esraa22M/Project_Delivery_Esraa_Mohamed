import React from "react";
class CartInfo extends React.Component {
  render() {
    let {itemsAddedToCart,quantity,total,Tax}=this.props;
    return (
      <div>
        {itemsAddedToCart.length ? (
          <div className="order-info">
            <p className="tax flex flex-space-between">
              <span>Tax 21%:</span>
              <span className="tax-value">
                {
                  itemsAddedToCart[0].prices[this.props.selectedCurrencyIndex]
                    .currency.symbol
                }
                {Tax}
              </span>
            </p>
            <p className="quantity flex  items-center">
              <span>Quantity:&nbsp;</span>
              <span className="quantity-value">{quantity}</span>
            </p>
            <p className="total">
              <span>total:</span>
              <span>
                {
                  itemsAddedToCart[0].prices[this.props.selectedCurrencyIndex]
                    .currency.symbol
                }
                {total}
              </span>
            </p>
            <Link
              to="/cart"
              className="btn-order flex flex-center items-center"
            >
              order
            </Link>
          </div>
        ) : (
          <Title className="flex flex-center items-center">Cart is empty</Title>
        )}
      </div>
    );
  }
}
export default CartInfo;
