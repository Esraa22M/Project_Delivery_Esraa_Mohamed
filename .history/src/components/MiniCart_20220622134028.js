import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Title } from "../styles/Category.style";
import { MiniCartContainer } from "../styles/Cart.style";
import MiniCartProductItem from "./MiniCartProductItem";
import MiniCartMainInfo from "./MiniCartMainInfo";
class MiniCart extends React.Component {
  calculateTotal = (prevProps)=>{
    if (
      (JSON.stringify(this.props.itemsAddedToCart) !==
        JSON.stringify(prevProps.itemsAddedToCart) &&
        this.props.itemsAddedToCart.length) ||
      this.props.total !== prevProps.total
    ) {
      this.props.getTotal();
    }
  }
  componentDidUpdate(prevProps) {
   this.calculateTotal(prevProps);
  }
  componentWillUnmount() {
    this.props.getTotal();
  }
  render() {
    let {
      itemsAddedToCart,
      cartItemsCount,
      isCartClicked,
      total,
      selectedCurrencyIndex,
      keepButtonActive,
      onCartClick,
    } = this.props;

    return (
      <MiniCartContainer display={isCartClicked ? "block" : "none"}>
        <Scrollbars style={{ width: 400, height: 500 }} autoHide>
          {itemsAddedToCart.length ? (
            <>
              <h1 className="mincart-header">
                My Bag, <span>{cartItemsCount} items</span>
              </h1>
              {itemsAddedToCart.map((product, index) => {
                return (
                  <MiniCartProductItem
                    product={product}
                    index={index}
                    key={index}
                    onIncrement={this.props.onIncrement}
                    onDecrement={this.props.onDecrement}
                    keepButtonActive={keepButtonActive}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                  />
                );
              })}
              <MiniCartMainInfo
                itemsAddedToCart={itemsAddedToCart}
                selectedCurrencyIndex={selectedCurrencyIndex}
                total={total}
                onCartClick={onCartClick}
              />
            </>
          ) : (
            <Title className="flex flex-center ">cart is empty</Title>
          )}
        </Scrollbars>
      </MiniCartContainer>
    );
  }
}
// #endregion

export default MiniCart;
