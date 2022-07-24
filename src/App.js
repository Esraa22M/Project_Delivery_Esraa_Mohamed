import React from "react";
//graphql import
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { LOADD_CURRENCY } from "./graphql/currency";
import { Query } from "react-apollo";
//react router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//style file
import { OverLayDiv } from "./styles/Category.style";
import { Container } from "./styles/Category.style";
//external components import
import ProductDetails from "./components/ProductDetails";
import Category from "./components/Category";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import MiniCart from "./components/MiniCart";
import Checkout from "./components/checkout";
import { LOAD_CATEGORIES } from "./graphql/categories";
//define apolloClient
const client = new ApolloClient({
  uri: "http://localhost:4000/",
});
var currentCategoryName="all";
var excuted = false;
class App extends React.Component {
  constructor(props) {
   
    super(props);
    var url = window.location.href;

    currentCategoryName = url.substring(url.lastIndexOf("/")+1)?url.substring(url.lastIndexOf("/")+1):"all";
     console.log(currentCategoryName)
    this.state = {
      //define state variable for each category
      currencyItems: [],
      Categories: [],
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
      currencyisLoaded: false,

      //hold selected productf attributes
      attributes: [],

      //hold items added to cart
      itemsAddedToCart: JSON.parse(localStorage.getItem("itemsAddedToCart"))
        ? JSON.parse(localStorage.getItem("itemsAddedToCart"))
        : [],
      isCartClicked: false,
      selectedCurrencyIndex: 0,
      productId: "",
      categoryId: "",
      currentCategory:"all",
      isFliped: false,
      selectedOption: "$",
      links: this.getInitalRouteValue(),
    };
  }
  getCurrentCategory=(currentCategory)=>{
    this.setState({currentCategory})
  }
  getInitalRouteValue = () => {
    let url = window.location.pathname;
    let index = 0;
    if (url === "/clothes") {
      index = 1;
    } else if (url === "/tech") {
      index = 2;
    } else {
      index = 0;
    }
    let tempLinks = [false];
    tempLinks[index] = true;
    return tempLinks;
  };
  fetchCurrency = async () => {
    let response = await client.query({
      query: LOADD_CURRENCY,
    });
    return await response.data;
  };
  fetchCategories = async () => {
    let response = await client.query({
      query: LOAD_CATEGORIES,
    });
    return await response.data;
  };
  handleOnLinkClick = (index) => {
    let tempLinks = [...this.state.links];
    for (var i = 0; i < tempLinks.length; i++) {
      tempLinks[i] = false;
      
    }

    tempLinks[index] = true;
    this.setState({ links: tempLinks });
  };
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
  setSiteLocalStorage = () => {
    localStorage.setItem(
      "itemsAddedToCart",
      JSON.stringify(this.state.itemsAddedToCart)
    );
    localStorage.setItem("currency", JSON.stringify(this.state.currencyItems));
    localStorage.setItem("tax", JSON.stringify(this.state.Tax));
    localStorage.setItem("quantity", JSON.stringify(this.state.quantity));
    localStorage.setItem("total", JSON.stringify(this.state.total));
  };
  calculateTotalAndTax = (prevState) => {
    if (
      JSON.stringify(this.state.itemsAddedToCart) !==
        JSON.stringify(prevState.itemsAddedToCart) &&
      this.props.itemsAddedToCart
    ) {
      this.props.getTotal();
      this.props.getTax();
    }
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
    this.setSiteLocalStorage();
    if(!excuted){
    this.getCurrentCategory(currentCategoryName);
  excuted=true;}
    this.calculateTotalAndTax(prevState);
  }

  /* get clicked product details  */
  handleProductDetails = (productItem) => {
    let product = { ...productItem };
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
  getItemsAddedToCart = (categoryId, product, attributes) => {
    let productAddedToCart = [...this.state.itemsAddedToCart];
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
  
  getCurrency = () => {
    let currency = JSON.parse(localStorage.getItem("currency"));
    if (!currency) {
      if (this.fetchCurrency()) {
        this.fetchCurrency().then((result) => {
          this.setState({
            currencyItems: result,
            currencyisLoaded: true,
          });
        });
      }
    } else {
      this.setState({ currencyItems: currency, currencyisLoaded: true });
    }
  };
  componentDidMount() {
    this.getCurrency();
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
  getRoutes = () => {
    return (
      <Route
        path={this.state.currentCategory === "all"? "/" : `/${this.state.currentCategory}`}
        element={
          <Category
            attributes={this.state.attributes}
            getItemsAddedToCart={this.getItemsAddedToCart}
            getDefaultAttributesSelection={this.getDefaultAttributesSelection}
            categoryName={this.state.currentCategory}
            getCurrentCategory={this.getCurrentCategory}
            selectedCurrencyIndex={this.state.selectedCurrencyIndex}
            handleProductIdAndCategoryId={this.handleProductIdAndCategoryId}
          />
        }
      ></Route>
    );
  };

  render() {
    let {
      total,
      itemsAddedToCart,
      currencyItems,
      attributes,
      isCartClicked,
      selectedCurrencyIndex,
      quantity,
      Tax,
      links,
      isFliped,
      selectedOption,
      currencyisLoaded,
    } = this.state;
    if (!currencyisLoaded)
      return (
        <div>
          <h1> Loading.... </h1>
        </div>
      );

    return (
      <ApolloProvider client={client}>
        <Router>
          <div onClick={isFliped ? this.handleArrowFliping : () => {}}>
          <Query query={LOAD_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <></>;
            if (error) console.log(error);
            return (
               <Navbar
              isFliped={isFliped}
              Categories={data.categories}
              getCurrentCategory={this.getCurrentCategory}
              selectedOption={selectedOption}
              handleArrowFliping={this.handleArrowFliping}
              handleOnLinkClick={this.handleOnLinkClick}
              onCartClick={this.handleCartClicked}
              productCurrency={currencyItems.currencies}
              getInitalRouteValue={this.getInitalRouteValue}
              itemsAddedToCart={itemsAddedToCart}
              getQuantity={this.getQuantity}
              links={links}
              cartItemsCount={quantity}
              handleSelectedListItem={this.handleSelectedListItem}
              handleCurrencyIndexSelection={this.handleCurrencyIndexSelection}
            />
            );
          }}
        </Query>
           
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
                {this.getRoutes()}
                <Route
                  path="/details/:id"
                  element={
                    <ProductDetails
                      getSelectedProductSelectedAttributes={
                        this.getSelectedProductSelectedAttributes
                      }
                      handleOnLinkClick={this.handleOnLinkClick}
                      addToCart={this.addToCart}
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
              className={`flex-center ${isCartClicked?"":"hide"}`}
            ></OverLayDiv>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

// #endregion

export default App;
