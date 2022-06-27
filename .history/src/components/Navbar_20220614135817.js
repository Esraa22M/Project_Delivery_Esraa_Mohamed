import React from "react";
/*external images import */
import circle from "../images/halfCircle.svg";
import cart from "../images/cartIcon.svg";
import logoUpper from "../images/logPart1.svg";
import logoLower from "../images/logoPart2.svg";
import cartLeg from "../images/cartLeg.svg";
import arrow from "../images/arrow.svg";
/*custom components import */
import CustomDropDownMenu from "./CustomDropDownMenu";
/*styled components import */
import { Nav, NavLink, Center, ShoppingCartIcon } from "../styles/Navbar.style";
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

  render() {
    let {
      cartItemsCount,
      isFliped,
      selectedOption,
      productCurrency,
      links,
      Categories,
    } = this.props;
    return (
      <header>
        <div className="container">
          <Nav className="flex items-center flex-space-between">
            <div className="flex">
              <ul className="flex items-center flex-center links-list">
                {Categories.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        key={index}
                        to={index === 0 ? "/" : `/${item.name}`}
                        className={links[index] === true ? "active" : ""}
                        onClick={() => {
                          this.props.handleOnLinkClick(index);
                          this.props.onCartClick(false);
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <Center className="flex items-center ">
                <img src={logoUpper} className="logo-part1" alt="logo" />
                <img src={logoLower} className="logo-part2" alt="logo" />

                <div className="logo-arrows">
                  <img src={arrow} alt="up-arrow" className="upArrow" />
                  <img src={circle} alt="circle" className="circle" />
                </div>
              </Center>
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
