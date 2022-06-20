import React from "react";
import { connect } from "react-redux";
import { singleProduct } from "../store/singleProduct";
import {
  addItemLocally,
  addToCartThunk,
  fetchCartLocally,
} from "../store/cart";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.singleProduct(id);
  }

  handleClick(event) {
    const productId = event.target.value;
    const userId = 1;
    this.props.addToCart(userId, productId);
  }

  render() {
    const product = this.props.product;
    //add to cart button and functionality needed
    return (
      <div>
        <h3>{product.productType}</h3>
        <h2>{product.brandName}</h2>
        <h1>{product.productName}</h1>
        <h4>{product.description}</h4>
        <h2>{product.price}</h2>
        <h2>
          <img src={product.imageURL} width="200" />
        </h2>
        <button type="button" value={product.id} onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.singleProductReducer,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    singleProduct: (id) => dispatch(singleProduct(id)),
    addToCart: (userId, productId) => {
      if (userId) {
        dispatch(addToCartThunk(userId, productId));
      } else {
        return dispatch(addItemLocally);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
