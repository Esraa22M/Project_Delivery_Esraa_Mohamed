import React from "react";
import downArrow from "../images/downArrow.svg";
class CustomDropDownMenu extends React.Component {
   render() {
    let { isFliped, selectedOption, productCurrency } = this.props;
    return (
      <div className="select-wrapper">
        <div className="select">
          <div className="select__trigger">
            <div className="arrow" onClick={this.props.handleArrowFliping}>
              <span>{selectedOption}</span>
              <span>
                <img
                  src={downArrow}
                  className={isFliped ? "rotate" : ""}
                  alt="cap-icon"
                />
              </span>
            </div>
          </div>
          <div className={["custom-options", isFliped ? "show" : ""].join(" ")}>
            {productCurrency.map((item, index) => {
              return (
                <div
                  key={index}
                  className="custom-option"
                  data-value={index}
                  onClick={(e) => {
                    this.props.handleSelectedListItem(e);
                    this.props.handleArrowFliping();
                  }}
                >
                  <span>{productCurrency[index].currency.symbol}</span>
                  <span>{productCurrency[index].currency.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

// #endregion

export default CustomDropDownMenu;
