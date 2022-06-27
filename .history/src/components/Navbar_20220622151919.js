import React from "react";
import NavbarCart from "./NavbarCart";
/*styled components import */
import { Nav, NavLink } from "../styles/Navbar.style";
import Logo from "./Logo";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props.getInitalRouteValue();
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.itemsAddedToCart) !==
      JSON.stringify(prevProps.itemsAddedToCart)
    ) {
      this.props.getQuantity();
    }
  }
  getNavLinks = (item, index) => {
    return (
      <li key={index}>
        <NavLink
          key={index}
          to={index === 0 ? "/" : `/${item.name}`}
          className={`flex flex-center items-center  ${
            this.props.links[index] === true ? "active" : ""
          }`}
          onClick={() => {
            this.props.handleOnLinkClick(index);
            this.props.onCartClick(false);
          }}
        >
          {item.name}
        </NavLink>
      </li>
    );
  };

  render() {
    let {
      cartItemsCount,
      isFliped,
      selectedOption,
      onCartClick,
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
              <Logo />
            </div>
            <NavbarCart
              handleArrowFliping={this.props.handleArrowFliping}
              handleSelectedListItem={this.props.handleSelectedListItem}
              handleCurrencyIndexSelection={
                this.props.handleCurrencyIndexSelection
              }
              isFliped={isFliped}
              selectedOption={selectedOption}
              productCurrency={productCurrency}
              onCartClick={onCartClick}
              cartItemsCount={cartItemsCount}
            />
          </Nav>
        </div>
      </header>
    );
  }
}
export default Navbar;
