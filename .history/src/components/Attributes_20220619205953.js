import React from "react";
import {
  ButtonDefaultSwatch,
  SwatchContainer,
  ButtonDefault,
} from "../styles/Details.style";
class Attributes extends React.Component {
  render() {
    let { product, keepButtonActive, className, attributes,details } = this.props;
    return (
      <div className="attributes-container">
        {console.log(product)}
        {product.attributes.map((item, index) => {
          let getId = item.id;
          return [
            <h2 key={index} className={`flex items-center ${className[1]}`}>
              {item.name + ":"}
              {console.log(className)}
            </h2>,
            item.type !== "swatch" ? (
              item.items.map((item, index) => {
                return (
                  <ButtonDefault
                    key={item.id}
                    className={`${className[0] + " "} ${
                      keepButtonActive(item.id, getId, attributes)
                        ? "activeButton"
                        : ""
                    }`}
                    onClick={details ?() =>
                      this.props.getSelectedProductSelectedAttributes({
                        id: getId,
                        itemIndex: item.index,
                        Itemid: item.id,
                      }):()=>{

                      }
                    }
                  >
                    {item.value}
                  </ButtonDefault>
                );
              })
            ) : (
              <div className={`flex ${className[2]}`} key={index + "swatch"}>
                {item.items.map((item, index) => {
                  return (
                    <SwatchContainer
                      key={index}
                      className={`${className[3]} ${
                        keepButtonActive(
                          item.id,
                          getId,
                          attributes
                        )
                          ? " activeSwatchButton"
                          : ""
                      }
              `}
              onClick={details ?() =>
                this.props.getSelectedProductSelectedAttributes({
                  id: getId,
                  itemIndex: item.index,
                  Itemid: item.id,
                }):()=>{
                  
                }
              }
                    >
                      <ButtonDefaultSwatch
                        key={index}
                        className={className[3]}
                        color={item.value}
                      ></ButtonDefaultSwatch>
                    </SwatchContainer>
                  );
                })}
              </div>
            ),
          ];
        })}
      </div>
    );
  }
}
export default Attributes;
