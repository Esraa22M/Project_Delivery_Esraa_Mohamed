import React from "react";
import {
  ButtonDefaultSwatch,
  SwatchContainer,
  ButtonDefault,
} from "../styles/Details.style";
class Attributes extends React.Component {
  render() {
    let { product, keepButtonActive, className, attributes,details,inStock } = this.props;
    return (
      <div className="attributes-container">
        {product.attributes.map((item, index) => {
          let getId = item.id;
          return [
            <h2 key={index} className={`flex items-center ${className[1]}`}>
              {item.name + ":"}
            </h2>,
            item.type !== "swatch" ? (
             <div className="flex items-center" key={item.id}>{ item.items.map((item, index) => {
                return (
                  <ButtonDefault
                    key={index}
                    className={`flex items-center flex-center ${className[0] + " "} ${
                      keepButtonActive(item.id, getId, attributes)
                        ? "activeButton"
                        : ""
                    }`}
                    onClick={inStock&&details ?() =>
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
             } </div>) : (
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
              onClick={inStock&&details ?() =>
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
