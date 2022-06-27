import React from 'react';
class ProductItem extends React.Component {

    render() {
        let {product,selectedCurrencyIndex}=this.props;
        return  <article className="product-item product-out-of-stock flex-column-reverse flex-end ">
        <div className="main-content">
          <h2 className="title">
            <span>{product.brand} </span>
            <span>{product.name}</span>
          </h2>
          <div className="price">
            <span>
              {product.prices[selectedCurrencyIndex].currency.symbol}
            </span>
            <span>{product.prices[selectedCurrencyIndex].amount}</span>
          </div>
        </div>
        <div className="picture ">
          <img src={product.gallery[0]} alt="product-item" />
        </div>
      </article>;
    }
}
export default ProductItem;