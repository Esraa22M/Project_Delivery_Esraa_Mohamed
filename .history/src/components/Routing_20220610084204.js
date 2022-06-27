import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import Cart from "../components/Cart";
import ErrorPage from "../components/ErrorPage";
import Checkout from "../components/checkout";

import Category from "../components/Category";

class Routing extends React.Component {
  render() {
    let {
      Categories,
      attributes,
      getProductDetailsObject,
      getItemsAddedToCart,
      getDefaultAttributesSelection,
      category,
      selectedCurrencyIndex,
      handleProductIdAndCategoryId,
      getSelectedProductSelectedAttributes,
      handleOnLinkClick,
      addToCart,
      product,
      keepButtonActive,
      itemsAddedToCart,
      onIncrement,
      onDecrement,
      onRemove,
      Tax,
      total,
      getTotal,
      getTax,
      quantity
    } = this.props;

    return (
      <Routes>
        {Categories.categories.map((item, index) => {
          return (
            <Route
              key={index}
              path={index === 0 ? "/" : `/${item.name}`}
              element={
                <Category
                  attributes={attributes}
                  getProductDetailsObject={getProductDetailsObject}
                  getItemsAddedToCart={getItemsAddedToCart}
                  getDefaultAttributesSelection={getDefaultAttributesSelection}
                  category={category}
                  selectedCurrencyIndex={selectedCurrencyIndex}
                  handleProductIdAndCategoryId={handleProductIdAndCategoryId}
                />
              }
            >
              {" "}
            </Route>
          );
        })}
        <Route
          path="/details/:id"
          element={
            <ProductDetails
              getSelectedProductSelectedAttributes={
                getSelectedProductSelectedAttributes
              }
              handleOnLinkClick={handleOnLinkClick}
              addToCart={addToCart}
              product={product}
              attributes={attributes}
              keepButtonActive={keepButtonActive}
              getDefaultAttributesSelection={getDefaultAttributesSelection}
              getItemsAddedToCart={getItemsAddedToCart}
              selectedCurrencyIndex={selectedCurrencyIndex}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              keepButtonActive={keepButtonActive}
              selectedCurrencyIndex={selectedCurrencyIndex}
              itemsAddedToCart={itemsAddedToCart}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
              Tax={Tax}
              total={total}
              getTotal={getTotal}
              getTax={getTax}
              quantity={quantity}
            />
          }
        ></Route>
        <Route path="/checkout" element={<Checkout />}></Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    );
  }
}

export default Routing;
