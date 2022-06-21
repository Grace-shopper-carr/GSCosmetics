import React from "react";
import { connect } from "react-redux";
import { getCartProductThunk } from "../store/cartProduct";
import { addQuantityThunk,subQuantityThunk } from "../store/cartProduct";



class EditCart extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
  }
  componentDidMount() {
    
    this.props.getCartProduct(this.props.userId, this.props.cartId);
   
  }

  handleAdd(){
   
    const userId=this.props.userId
    const productId=this.props.productId
  
    this.props.addQuantity(userId,productId);

  }

  handleSub(){
   
    const userId=this.props.userId
    const productId=this.props.productId
  
    this.props.subQuantity(userId,productId);

  }
 

  render() {
  //  console.log('cartProduct',this.props.cartProduct)
    return (
      <div>
        <button onClick={this.handleAdd}> + </button>
        {this.props.cartProduct ?
        <div>
          {this.props.cartProduct.map((product)=>{
            if(parseInt(product.productId)=== parseInt(this.props.productId)){
              return  (
              <div key = {product.productId}> 
              <span>Qty:{product.quantity}</span>
              </div>
              )
            }
           })
          }
        </div>
        :(<p>-</p>)
        }
          <button onClick={this.handleSub}> - </button>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProduct: state.cartProductReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCartProduct: (userId, cartId) =>
    dispatch(getCartProductThunk(userId, cartId)),
  addQuantity : (userId, productId) =>
    dispatch(addQuantityThunk (userId, productId)),
  subQuantity : (userId, productId) =>
    dispatch(subQuantityThunk (userId, productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCart);
