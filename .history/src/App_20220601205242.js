import React from "react";
//graphql import
import { ApolloClient, InMemoryCache } from "@apollo/client";

// queries import
import { LOADD_ALL } from "./graphql/allCategory";
import { LOADD_CLOTHING } from "./graphql/clothingCategory";
import { LOADD_TECH } from "./graphql/techCategory";
//react router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//style file
import { OverLayDiv } from "./styles/Category.style";
import { Container } from "./styles/Category.style";
//external components import
import ProductDetails from "./components/ProductDetails";
import AllCategory from "./components/AllCategory";
import ClothingCategory from "./components/ClothingCategory";
import TechCategory from "./components/TechCategory";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import MiniCart from "./components/MiniCart";
import Checkout from "./components/checkout";

//define apolloClient
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //define state variable for each category
      allCategoryItems: [],
      clothingCategoryItems: [],
      techCategoryItems: [],
      //hold total cost
      total: JSON.parse(localStorage.getItem("total"))
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
      //hold total items
      quantity: JSON.parse(localStorage.getItem("quantity"))
        ? JSON.parse(localStorage.getItem("quantity"))
        : 0,
      //hold tax
      Tax: JSON.parse(localStorage.getItem("tax"))
        ? JSON.parse(localStorage.getItem("tax"))
        : 0,
      //state variables to check if data loaded
      allDataisLoaded: false,
      clothingDataisLoaded: false,
      techDataisLoaded: false,

      //hold selected product attributes
      attributes: [],
      //hold product to show details
      productDetailsObject: {},
      //hold items added to cart
      itemsAddedToCart: JSON.parse(localStorage.getItem("itemsAddedToCart"))
        ? JSON.parse(localStorage.getItem("itemsAddedToCart"))
        : [],
      isCartClicked: false,
      selectedCurrencyIndex: 0,
      productId: "",
      categoryId: "",
      isFliped: false,
      selectedOption: "$",
    };
  }
  //Arrow fliping on currency selection
  handleArrowFliping = () => {
    let flip = this.state.isFliped;
    this.setState({ isFliped: !flip });
  };

  getTotal = () => {
    let products = [...this.state.itemsAddedToCart];
    let tempTotal = 0;
    if (products.length) {
      for (let i = 0; i < products.length; i++) {
        let amount =
          products[i].prices[this.state.selectedCurrencyIndex].amount *
          products[i].counter;
        tempTotal += amount;
      }
      tempTotal = tempTotal.toFixed(2);
    }
    this.setState({ total: tempTotal });
    return tempTotal;
  };

  getSelectedProductSelectedAttributes = (obj) => {
    this.setState((prevState) => {
      var attributesArray = [...prevState.attributes];
      let index = this.getObjIndex(attributesArray, obj.id);
      if (index > -1) {
        attributesArray[index] = obj;
      } else {
        attributesArray.push(obj);
      }
      return {
        attributes: attributesArray,
      };
    });
  };

  getingCartPorduct = (product) => {
    let isFound = false;
    let products = [...this.state.itemsAddedToCart];
    let attributes = product.selectedattributes;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        isFound = { ...products[i], index: i };
        let objAttributes = products[i].selectedattributes;
        if (!objAttributes.length) {
          isFound = { ...products[i], index: i };
          break;
        } else {
          for (let j = 0; j < objAttributes.length; j++) {
            if (objAttributes[j].Itemid !== attributes[j].Itemid) {
              isFound = false;
              break;
            }
          }
        }
      } else {
        isFound = false;
      }
      if (isFound) {
        break;
      }
    }
    return isFound;
  };
  getDefaultAttributesSelection = (product) => {
    let tempAttributes = [...product.attributes];
    let attributes = [];
    tempAttributes.forEach(function (arrayItem) {
      attributes.push({
        id: arrayItem.id,
        Itemid: arrayItem.items[0].id,
      });
    });
    this.setState({ attributes });
    return attributes;
  };
  keepButtonActive = (value, id, attributes) => {
    let tempAttributes = [...attributes];
    let x = tempAttributes.find((item) => {
      return item.id === id && item.Itemid === value;
    });
    return x !== undefined;
  };

  handleProductIdAndCategoryId = (id, categoryId) => {
    this.setState({ productId: id, categoryId });
  };
  //hanlde if the minicart to be poped up
  handleCartClicked = (flag) => {
    let isClicked = this.state.isCartClicked;
    if (!flag) {
      isClicked = !flag;
    }
    this.setState({ isCartClicked: !isClicked });
  };
  componentDidUpdate(prevState) {
    localStorage.setItem(
      "itemsAddedToCart",
      JSON.stringify(this.state.itemsAddedToCart)
    );
    localStorage.setItem("tax", JSON.stringify(this.state.Tax));
    localStorage.setItem("quantity", JSON.stringify(this.state.quantity));
    localStorage.setItem("total", JSON.stringify(this.state.total));
    localStorage.setItem("all", JSON.stringify(this.state.allCategoryItems));
    localStorage.setItem(
      "clothing",
      JSON.stringify(this.state.clothingCategoryItems)
    );
    localStorage.setItem("tech", JSON.stringify(this.state.techCategoryItems));

    if (
      JSON.stringify(this.state.itemsAddedToCart) !==
        JSON.stringify(prevState.itemsAddedToCart) &&
      this.props.itemsAddedToCart
    ) {
      this.props.getTotal();
      this.props.getTax();
    }
  }
  getProductByIdAndCategoryId = (id, categoryId) => {
    let products = [];
    if (Number(categoryId) === 0) {
      products = [...this.state.allCategoryItems.category.products];
    } else if (Number(categoryId) === 1) {
      products = [...this.state.clothingCategoryItems.category.products];
    } else {
      products = [...this.state.techCategoryItems.category.products];
    }
    let product = products.find((x) => x.id === id);
    return product;
  };

  /* get clicked product details  */
  handleProductDetails = (id, categoryId) => {
    let product = this.getProductByIdAndCategoryId(id, categoryId);
    this.setState({ productDetailsObject: product });
    return product;
  };
  getingCartPorductindex = (product) => {
    let isFound = -1;
    let cartProduct = this.getingCartPorduct(product);
    if (cartProduct) {
      isFound = cartProduct.index;
    }
    return isFound;
  };
  /* handle user press add to cart button  get product to be added*/
  handleAddToCart = (id, categoryId) => {
    let product = this.getProductByIdAndCategoryId(id, categoryId);
    return { ...product };
  };
  handlePlusCounter = (p) => {
    let product = this.getingCartPorduct(p);
    product.counter++;
    let index = this.getingCartPorductindex(p);
    let cartProducts = [...this.state.itemsAddedToCart];
    cartProducts[index] = product;
    this.setState({ itemsAddedToCart: cartProducts });
  };
  handleMinusCounter = (p) => {
    let product = this.getingCartPorduct(p);
    if (!product.counter <= 0) {
      product.counter--;
      if (product.counter === 0) {
        this.handleRemoveFromCart(p);
      } else {
        let index = this.getingCartPorductindex(p);
        let cartProducts = [...this.state.itemsAddedToCart];
        cartProducts[index] = product;
        this.setState({ itemsAddedToCart: cartProducts });
      }
    }
  };
  /*here we get all the cart products */
  getItemsAddedToCart = (id, categoryId, attributes) => {
    let productAddedToCart = [...this.state.itemsAddedToCart];
    let product = { ...this.handleAddToCart(id, categoryId) };
    product["selectedattributes"] = [...attributes];
    product["counter"] = 1;
    product["categoryId"] = categoryId;
    let isProductExist = this.getingCartPorduct(product);
    if (isProductExist) {
      this.handlePlusCounter(product);
    } else {
      productAddedToCart.push(product);
      this.setState({ itemsAddedToCart: productAddedToCart });
    }
  };
  /*get selected currency index */
  handleCurrencyIndex = (index) => {
    this.setState({ selectedCurrencyIndex: index });
  };

  /* delete cart item */
  handleRemoveFromCart = (product) => {
    let products = [...this.state.itemsAddedToCart];
    let index = this.getingCartPorductindex(product);
    products.splice(index, 1);
    this.setState({ itemsAddedToCart: products });
  };
  //fetch category all data
  fetchAll = async () => {
    let response = await client.query({
      query: LOADD_ALL,
    });
    return await response.data;
  };
  //fetch category tech data
  fetchTech = async () => {
    let response = await client.query({
      query: LOADD_TECH,
    });
    return await response.data;
  };
  //fetch clothing category data
  fetchClothing = async () => {
    let response = await client.query({
      query: LOADD_CLOTHING,
    });
    return await response.data;
  };
  componentDidMount() {
    /**--set local storage variable for each category variable --**/
    //local storage variable for all category
    let all = JSON.parse(localStorage.getItem("all"));
    //local storage variable for clothing category
    let clothing = JSON.parse(localStorage.getItem("clothing"));
    //local storage variable for tech category
    let tech = JSON.parse(localStorage.getItem("tech"));
    //check if the data is already here dont refetch it
    if (!all) {
      if (this.fetchAll()) {
        this.fetchAll().then((result) => {
          this.setState({
            allCategoryItems: result,
            allDataisLoaded: true,
          });
        });
      }
    } else {
      this.setState({ allCategoryItems: all, allDataisLoaded: true });
    }
    if (!tech) {
      if (this.fetchTech()) {
        this.fetchTech().then((result) => {
          this.setState({
            techCategoryItems: result,
            techDataisLoaded: true,
          });
        });
      }
    } else {
      this.setState({ techCategoryItems: tech, techDataisLoaded: true });
    }
    if (!clothing) {
      if (this.fetchClothing()) {
        this.fetchClothing().then((result) => {
          this.setState({
            clothingCategoryItems: result,
            clothingDataisLoaded: true,
          });
        });
      }
    } else {
      this.setState({
        clothingCategoryItems: clothing,
        clothingDataisLoaded: true,
      });
    }
  }
  //to calculate product's count
  getQuantity = () => {
    let cartItems = [...this.state.itemsAddedToCart];
    let tempQuantity = 0;
    cartItems.forEach((item) => {
      tempQuantity += item.counter;
    });
    localStorage.setItem("quantity", tempQuantity);
    this.setState({ quantity: tempQuantity });
  };
  //get product index
  getObjIndex = (arr, id) => {
    let index = arr.findIndex((object) => {
      return object.id === id;
    });
    return index;
  };
  //caluclate tax
  getTax = () => {
    //taxs is 21% of total
    //call total first
    this.getTotal();
    let total = this.state.total;
    let tax = (total * 21) / 100;
    this.setState({ Tax: tax.toFixed(2) });
  };
  //handle currency selection
  handleSelectedListItem = (e) => {
    let index = parseInt(e.currentTarget.getAttribute("data-value"));
    this.setState({ selectedCurrencyIndex: index });
    let text = e.currentTarget.childNodes[0].innerText;
    this.setState({ isFliped: false });
    this.setState({ selectedOption: text });
  };
  render() {
    let {
      allCategoryItems,
      clothingCategoryItems,
      techCategoryItems,
      total,
      productDetailsObject,
      itemsAddedToCart,
      attributes,
      isCartClicked,
      selectedCurrencyIndex,
      quantity,
      Tax,
      allDataisLoaded,
      techDataisLoaded,
      clothingDataisLoaded,
      isFliped,
      selectedOption,
    } = this.state;
    if (!allDataisLoaded || !techDataisLoaded || !clothingDataisLoaded)
      return (
        <div>
          <h1> Loading.... </h1>{" "}
        </div>
      );

    return (
      <Router>
        <div onClick={isFliped ? this.handleArrowFliping : () => {}}>
          {" "}
          <Navbar
            isFliped={isFliped}
            selectedOption={selectedOption}
            handleArrowFliping={this.handleArrowFliping}
            onCartClick={this.handleCartClicked}
            productCurrency={allCategoryItems.category.products[0].prices}
          
            itemsAddedToCart={itemsAddedToCart}
            getQuantity={this.getQuantity}
            cartItemsCount={quantity}
            handleSelectedListItem={this.handleSelectedListItem}
            handleCurrencyIndexSelection={this.handleCurrencyIndexSelection}
          />
          <MiniCart
            onClick={isFliped ? this.handleArrowFliping : () => {}}
            isCartClicked={isCartClicked}
            getTotal={this.getTotal}
            total={total}
            cartItemsCount={quantity}
            keepButtonActive={this.keepButtonActive}
            onIncrement={this.handlePlusCounter}
            onDecrement={this.handleMinusCounter}
            selectedCurrencyIndex={selectedCurrencyIndex}
            itemsAddedToCart={itemsAddedToCart}
            onCartClick={this.handleCartClicked}
          ></MiniCart>
          <Container onClick={isFliped ? this.handleArrowFliping : () => {}}>
            <Routes>
              <Route
                path="/"
                element={
                  <AllCategory
                    attributes={this.state.attributes}
                    getItemsAddedToCart={this.getItemsAddedToCart}
                    getDefaultAttributesSelection={
                      this.getDefaultAttributesSelection
                    }
                    category={allCategoryItems.category}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                    handleProductIdAndCategoryId={
                      this.handleProductIdAndCategoryId
                    }
                  />
                }
              >
                {" "}
              </Route>
              <Route
                path="/clothes"
                element={
                  <ClothingCategory
                    category={clothingCategoryItems.category}
                    attributes={this.state.attributes}
                    getItemsAddedToCart={this.getItemsAddedToCart}
                    getDefaultAttributesSelection={
                      this.getDefaultAttributesSelection
                    }
                    selectedCurrencyIndex={selectedCurrencyIndex}
                    handleProductIdAndCategoryId={
                      this.handleProductIdAndCategoryId
                    }
                  />
                }
              ></Route>
              <Route
                path="/tech"
                element={
                  <TechCategory
                    attributes={this.state.attributes}
                    getItemsAddedToCart={this.getItemsAddedToCart}
                    getDefaultAttributesSelection={
                      this.getDefaultAttributesSelection
                    }
                    category={techCategoryItems.category}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                    handleProductIdAndCategoryId={
                      this.handleProductIdAndCategoryId
                    }
                  />
                }
              ></Route>
              <Route
                path="/details/:id"
                element={
                  <ProductDetails
                    getSelectedProductSelectedAttributes={
                      this.getSelectedProductSelectedAttributes
                    }
                    addToCart={this.addToCart}
                    getProductDetailsObject={this.handleProductDetails}
                    product={productDetailsObject}
                    attributes={attributes}
                    keepButtonActive={this.keepButtonActive}
                    getDefaultAttributesSelection={
                      this.getDefaultAttributesSelection
                    }
                    getItemsAddedToCart={this.getItemsAddedToCart}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                  />
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  <Cart
                    keepButtonActive={this.keepButtonActive}
                    selectedCurrencyIndex={selectedCurrencyIndex}
                    itemsAddedToCart={itemsAddedToCart}
                    onIncrement={this.handlePlusCounter}
                    onDecrement={this.handleMinusCounter}
                    onRemove={this.handleRemoveFromCart}
                    Tax={Tax}
                    total={total}
                    getTotal={this.getTotal}
                    getTax={this.getTax}
                    quantity={quantity}
                  />
                }
              ></Route>
              <Route path="/checkout" element={<Checkout />}></Route>

              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </Container>
          <OverLayDiv
            onClick={() => {
              if (isFliped) this.handleArrowFliping();
              this.handleCartClicked();
            }}
            className="flex-center"
            clicked={isCartClicked ? "block" : "none"}
          ></OverLayDiv>
        </div>
      </Router>
    );
  }
}

// #endregion

export default App;
