import React from 'react';
class ProductItem extends React.Component {

    render() {
        return  <article className="product-item product-out-of-stock flex-column-reverse flex-center ">
        <div className="main-content">
          <h2 className="title">
            <span>{brand} </span>
            <span>{name}</span>
          </h2>
          <div className="price">
            <span>
              {prices[this.props.selectedCurrencyIndex].currency.symbol}
            </span>
            <span>{prices[this.props.selectedCurrencyIndex].amount}</span>
          </div>
        </div>
        <div className="picture ">
          <img src={gallery[0]} alt="product-item" />
        </div>
      </article>;
    }
}
export default ProductItem;