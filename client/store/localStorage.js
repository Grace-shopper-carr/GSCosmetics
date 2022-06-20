export const removeFromLocal = (product) => {
  let guestCart = JSON.parse(localStorage.getItem("cart"));
  if (!guestCart) {
    guestCart = [];
  }
  let filteredCart = JSON.parse((eachProduct) => eachProduct.id !== product.id);
  localStorage.setItem("cart", JSON.stringifiy(filteredCart));
  return filteredCart;
};

export const addToLocal = (product) => {
  let guestCart = JSON.parse(localStorage.getItem("cart"));
  if (!guestCart) {
    guestCart = [];
  }
  product.quantity = 1;
  guestCart.push(product);
  localStorage.setItem("cart", JSON.stringify(guestCart));
  return guestCart;
};

export const increaseQtyLocal = (productId) => {
  let guestCart = JSON.parse(localStorage.getItem("cart"));
  guestCart.forEach((product) => {
    if (product.id === productId) {
      product.quantity++;
    }
  });
  localStorage.setItem("cart", JSON.stringify(guestCart));
  return guestCart;
};

export const decreaseQtyLocal = (productId) => {
  let guestCart = JSON.parse(localStorage.getItem("cart"));
  guestCart.forEach((product) => {
    if (product.id === productId) {
      product.quantity--;
    }
  });
  localStorage.setItem("cart", JSON.stringify(guestCart));
  return guestCart;
};
