// import React from "react";

// class GuestCart extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       guestCart: [],
//     };
//     this.handleAddProduct = this.handleAddProduct.bind(this);
//     this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
//     this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
//   }

//   componentDidMount() {
//     locallyStoredCart = JSON.parse(locallyStoredCart);
//     if (locallyStoredCart) {
//       this.state.guestCart = locallyStoredCart;
//     }
//   }

//   handleAddProduct(product) {
//     let cartCopy = [...this.state.guestCart];
//     let productId = product.id;
//     let productExist = cartCopy.find(
//       (cartProduct) => cartProduct.id == productId
//     );
//     if (productExist) {
//       productExist.quantity += product.quantity;
//     } else {
//       cartCopy.push(product);
//     }
//     this.state.guestCart = cartCopy;
//     let stringCart = JSON.stringify(cartCopy);
//     localStorage.setItem("guestCart", stringCart);
//   }

//   handleUpdateProduct(productId, quantity) {
//     let cartCopy = [...this.state.guestCart];
//     let productExist = cartCopy.find(
//       (cartProduct) => cartProduct.id == productId
//     );
//     if (productExist) {
//       productExist.quantity += quantity;
//     } else {
//       return;
//     }
//     this.state.guestCart = cartCopy;
//     let stringCart = JSON.stringify(cartCopy);
//     localStorage.setItem("guestCart", stringCart);
//   }

//   handleDeleteProduct(productId) {
//     let cartCopy = [...this.state.guestCart];
//     cartCopy = cartCopy.filter((product) => product.id != productId);
//     this.state.guestCart = cartCopy;
//     let stringCart = JSON.stringify(cartCopy);
//     localStorage.setItem("guestCart", stringCart);
//   }

//   render() {
//     let locallyStoredCart = locallyStoredCart.getItem("guestCart");
//   }
// }
