import React from "react";
class DetailsSideSlideImages extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            imageIndex: 0,

        }
    }
    /* change product image on image click */
  handleImageClick = (index) => {
    this.setState({
      imageIndex: index,
    });
  };
  getGallery =(item, index) => {
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
  }
  render() {
    let {product  } = this.props;
    let {imageIndex} = this.state;
    return (
      <>
        <div className="flex flex-column column-1 items-center flex-center">
          {product.gallery.map(this.getGallery)}
        </div>
        <div className="product-wrapper column-2">
          <div className="flex flex-column product-out-stock ">
            <div>
              <img
                className="column-2-img"
                src={product.gallery[imageIndex]}
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
      </>
    );
  }
}

export default DetailsSideSlideImages;
