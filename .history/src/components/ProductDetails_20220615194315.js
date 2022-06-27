import React from "react";
import { Markup } from "interweave";
import {
  ProductDetailsContainer,
  ButtonDefault,
  ButtonDefaultSwatch,
  AddToCartButton,
  SwatchContainer,
  SwatchButtonsContainer,
} from "../styles/Details.style";
let idPlusCategoryIndex;
let id;
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    var url = window.location.href;
    idPlusCategoryIndex = url.substring(url.lastIndexOf("/") + 1);
    id = idPlusCategoryIndex.slice(0, -1);
    this.state = {
      imageIndex: 0,
      product: this.props.product
        ? this.props.product
        : JSON.parse(localStorage.getItem("productDetails")),
    };
    if (this.state.product.inStock)
      this.props.getDefaultAttributesSelection(this.state.product);
  }
  /* change product image on image click */
  handleImageClick = (index) => {
    this.setState({
      imageIndex: index,
    });
  };
  getNotSwatch=  (item, index) => {
    return (
      <ButtonDefault
        key={item.id}
        width="4.375vw"
        height="2.813rem"
        marginRight="0.833vw"
        marginBottom="1.5rem"
        className={
          this.props.keepButtonActive(
            item.id,
            getId,
            this.props.attributes
          )
            ? "activeButton"
            : ""
        }
        onClick={() => {
          this.props.getSelectedProductSelectedAttributes({
            id: getId,
            Itemid: item.id,
          });
        }}
      >
        {item.value}
      </ButtonDefault>
    );
  }
  getSwatch= (item, index ,getId) => {
    return (
      <SwatchContainer
        marginBottom="1.875rem"
        height="2.25rem"
        key={index}
        className={`m-r ${
          this.props.keepButtonActive(
            item.id,
            getId,
            this.props.attributes
          )
            ? "activeSwatchButton"
            : ""
        }
      `}
      >
        <ButtonDefaultSwatch
          key={index}
          width="2.222vw"
          color={item.value}
          onClick={() =>
            this.props.getSelectedProductSelectedAttributes({
              id: getId,
              itemIndex: item.index,
              Itemid: item.id,
            })
          }
        ></ButtonDefaultSwatch>
      </SwatchContainer>
    );
  }
  getAttributes = (item, index) => {
    let getId = item.id;
    return [
      <h2 key={index} className="attribute-header">
        {item.name + ":"}
      </h2>,
      item.type !== "swatch" ? (
        item.items.map(
          this.getNotSwatch
        )
      ) : (
        <SwatchButtonsContainer className="flex" key={index + "swatch"}>
          {item.items.map(
            this.getSwatch
           )}
        </SwatchButtonsContainer>
      ),
    ];
  };
  render() {
    let { selectedCurrencyIndex } = this.props;
    let { product } = this.state;
    // check if there is a product
    if (Object.keys(product).length === 0)
      return (
        <div>
          <h1> Loading.... </h1>{" "}
        </div>
      );
    return (
      <>
        <ProductDetailsContainer>
          <div className="flex flex-column">
            {product.gallery.map((item, index) => {
              return (
                <div key={index}>
                  <img
                    className="column1-img"
                    src={item}
                    alt="slider-item"
                    onClick={() => this.handleImageClick(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className="product-wrapper">
            {" "}
            <div className="flex flex-column product-out-stock ">
              <div>
                <img
                  className="column-2-img"
                  src={product.gallery[this.state.imageIndex]}
                  alt="product-item"
                />
              </div>
            </div>
            {!product.inStock ? (
              <div className="div-2 flex flex-center items-center">
                OUT OF STOCK
              </div>
            ) : (
              <></>
            )}
          </div>
          <article className="flex flex-column column-3" key={product}>
            <div key={product}>
              <h2 className="product-brand">{product.brand}</h2>
              <p className="product-name">{product.name}</p>
            </div>
            <div className="attributes-container">
              {product.attributes.map(this.getAttributes)}
            </div>
            <div>
              <p className="product-price">PRICE:</p>
              <p className="product-price-value flex items-center">
                <span>
                  {product.prices[selectedCurrencyIndex].currency.symbol}
                </span>
                <span>{product.prices[selectedCurrencyIndex].amount}</span>
              </p>
            </div>
            <div>
              {product.inStock ? (
                <AddToCartButton
                  className={`text-light flex items-center flex-center`}
                  onClick={() => {
                    this.props.handleOnLinkClick(0);

                    this.props.getItemsAddedToCart(
                      idPlusCategoryIndex.charAt(
                        idPlusCategoryIndex.length - 1
                      ),
                      product,
                      this.props.attributes
                    );
                  }}
                >
                  ADD TO CART
                </AddToCartButton>
              ) : (
                <></>
              )}
            </div>

            <Markup
              content={product.description}
              className="product-description"
            />
          </article>
        </ProductDetailsContainer>
      </>
    );
  }
}
export default ProductDetails;
