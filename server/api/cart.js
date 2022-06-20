const router = require("express").Router();
const req = require("express/lib/request");
const { Cart, Product, CartProduct } = require("../db/models");
module.exports = router;


//get a user's cart
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isCompleted: false,
      },
      include: Product,
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// //get a user's past order history
// router.get("/orders/:userId", async (req, res, next) => {
//   try {
//     const orders = await Cart.findAll({
//       where: {
//         userId: req.params.userId,
//         isCompleted: true,
//       },
//       include: Product,
//       CartProduct,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

//add to a user's cart
router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    //find user's uncompleted cart associated to their id
    const [cart, created] = await Cart.findOrCreate({
      where: { userId: req.params.userId },
      isCompleted: false,
      include: Product,
    });
    //
    const cartProduct = await CartProduct.findOne({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });
    if (cartProduct) {
      const updatedQty = cartProduct.quantity + 1;
      await cart.addProduct(product, {
        through: {
          quantity: updatedQty,
          price: product.price,
        },
      });
    } else {
      await cart.addProduct(product, {
        through: { quantity: 1, price: product.price },
      });
    }
    // console.log(product);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//update a single product 
// router.get("/:cartId/:productId", async (req, res, next) => {
//   try {
   
//     const cartProduct = await CartProduct.findOne({
//       where: {
//         cartId: req.params.cartId,
//         productId: req.params.productId,
//       },
//     });
//     await cartProduct.quantity+1
   
//     res.send(cartProduct);

//   } catch (err) {
//     next(err);
//   }
// });
router.put('/plusOne/:userId/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: Product,
    })
    const cartproduct = await CartProduct.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    const updatedTotalQty = cartproduct.quantity + 1
    await cart.addProduct(product, {through: {quantity: updatedTotalQty}})
    // console.log(cartproduct)
    res.send(cartproduct)
  } catch (error) {
    next(error)
  }
})


router.put('/minusOne/:userId/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
      },
      include: Product,
    })
    const cartproduct = await CartProduct.findOne({
      where: {cartId: cart.id, productId: product.id}
    })

    const updatedTotalQty = cartproduct.quantity - 1
    if (updatedTotalQty <= 0) {
      updatedTotalQty = 1
    } else {
      await cart.addProduct(product, {through: {quantity: updatedTotalQty}})
    }
    // console.log(cartproduct)
    res.send(cartproduct)
  } catch (error) {
    next(error)
  }
})


//remove a product from cart
router.delete("/:cartId/:productId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id:req.params.cartId},
      include: Product});
    const product = await Product.findByPk(req.params.productId);
    await cart.removeProduct(product,{
      through:{productId:product.id}
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//get specific product in cart to retrieve quantity
router.get("/:userId/:cartId", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        isCompleted: false,
      },
    });
    const cartProduct = await CartProduct.findAll({
      where: {
        cartId: cart.id,
      },
    });
    // console.log(cartProduct)
    res.send(cartProduct);
  } catch (error) {
    next(error);
  }
});

// //update
// router.put("/:userId/:productId", async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.id);
//     const product = await Product.findByPk(req.params.productId);
//     await cart.removeProduct(product);
//     res.send(cart);
//   } catch (err) {
//     next(err);
//   }
// });
