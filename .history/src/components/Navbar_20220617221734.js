import React from "react";
/*external images import */
import cart from "../images/cartIcon.svg";
import cartLeg from "../images/cartLeg.svg";
/*custom components import */
import CustomDropDownMenu from "./CustomDropDownMenu";
/*styled components import */
import { Nav, NavLink, ShoppingCartIcon } from "../styles/Navbar.style";
import Logo from "./Logo";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props.getInitalRouteValue();
    this.state = {
      // links: this.getInitalRouteValue(),
    };
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.itemsAddedToCart) !==
      JSON.stringify(prevProps.itemsAddedToCart)
    ) {
      this.props.getQuantity();
    }
  }
  getNavLinks = 
    (item, index) => {
      return (
        <li key={index}>
          <NavLink
            key={index}
            to={index === 0 ? "/" : `/${item.name}`}
            className={this.props.links[index] === true ? "active" : ""}
            onClick={() => {
              this.props.handleOnLinkClick(index);
              this.props.onCartClick(false);
            }}
          >
            {item.name}
          </NavLink>
        </li>
      );
    }

  
  render() {
    let {
      cartItemsCount,
      isFliped,
      selectedOption,
      productCurrency,
      Categories,
    } = this.props;
    return (
      <header>
        <div className="container">
          <Nav className="flex items-center flex-space-between">
            <div className="flex">
              <ul className="flex items-center flex-center links-list">
                {Categories.map(this.getNavLinks)}
              </ul>
            <Logo/>
            </div>
            <div className="flex items-center flex-center">
              <CustomDropDownMenu
                handleArrowFliping={this.props.handleArrowFliping}
                handleSelectedListItem={this.props.handleSelectedListItem}
                handleCurrencyIndexSelection={
                  this.props.handleCurrencyIndexSelection
                }
                isFliped={isFliped}
                selectedOption={selectedOption}
                productCurrency={productCurrency}
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
            </div>
          </Nav>
        </div>
      </header>
    );
  }
}
export default Navbar;
