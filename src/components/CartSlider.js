import React from "react";
/* styled component import */
import { CartSliderContainer } from "../styles/Cart.style";
/* slider arrow images import */
import NextArrow from "../images/next-arrow.svg";
import PrevArrow from "../images/prev-arrow.svg";

class CartSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    /* hold index of prev image */
      imageIndex: 0,
    };
  }
  /*
   Carousel functions
 */
/* to get next image */
  handleNextImage = () => {
    let index = this.state.imageIndex;
    if (index >= this.props.images.length - 1) {
      index = -1;
    }
    index++;
    this.setState({ imageIndex: index });
  };
/* to get prev image */

  handlePrevImage = () => {
    let index = this.state.imageIndex;
    if (index <= 0) {
      index = this.props.images.length;
    }
    index--;
    this.setState({ imageIndex: index });
  };

  render() {
    let { images } = this.props;
    return (
      <CartSliderContainer>
        <img
          src={images[this.state.imageIndex]}
          alt="product"
          width="100%"
          height="100%"
        />
        {images.length > 1 ? (
          <>
            <div className="next" onClick={this.handleNextImage}>
              <img src={PrevArrow} alt="next-arrow" />{" "}
            </div>
            <div className="prev" onClick={this.handlePrevImage}>
              <img
                src={NextArrow}
                alt="prev-arrow"
                onClick={this.handlePrevImage}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </CartSliderContainer>
    );
  }
}

export default CartSlider;
