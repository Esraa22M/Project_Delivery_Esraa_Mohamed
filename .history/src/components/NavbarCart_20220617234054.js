import React from 'react';
/*external images import */
import cart from "../images/cartIcon.svg";
import cartLeg from "../images/cartLeg.svg";
import {  ShoppingCartIcon } from "../styles/Navbar.style";
/*custom components import */
import CustomDropDownMenu from "./CustomDropDownMenu";
class NavbarCart extends React.Component {

    render() {
        return  <div className="flex items-center flex-center">
        <CustomDropDownMenu
          handleArrowFliping={this.props.handleArrowFliping}
          handleSelectedListItem={this.props.handleSelectedListItem}
          handleCurrencyIndexSelection={
            this.props.handleCurrencyIndexSelection
          }
          isFliped={isFliped}
          selectedOption={this.props.selectedOption}
          productCurrency={this.props.productCurrency}
        />
        <div onClick={() => this.props.onCartClick("esraa")}>
          <ShoppingCartIcon className="flex flex-column flex-center items-center">
            <img src={cart} alt="cart" className="cart-icon" />
            <img src={cartLeg} alt="cart" className="cart-leg-1 " />
            <img src={cartLeg} alt="cart" className="cart-leg-2 " />
          </ShoppingCartIcon>
          {cartItemsCount ? (
            <span className="bage bg-dark text-light flex flex-center items-center">
              {this.props.cartItemsCount}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>;
    }
}
export default NavbarCart;