import React from "react";
import {  Route } from "react-router-dom";
import Category from "./components/Category";

class Routing extends React.Component {
  
  render() {
    let {Categories,attributes,getProductDetailsObject,getItemsAddedToCart,getDefaultAttributesSelection,category,selectedCurrencyIndex,handleProductIdAndCategoryId} = this.props;

    return (
      <>
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
                  getDefaultAttributesSelection={
                    getDefaultAttributesSelection
                  }
                  category={category}
                  selectedCurrencyIndex={selectedCurrencyIndex}
                  handleProductIdAndCategoryId={
                    handleProductIdAndCategoryId
                  }
                />
              }
            >
              {" "}
            </Route>
          );
        })}

       
      </>
    );
  }
}

export default Routing;
