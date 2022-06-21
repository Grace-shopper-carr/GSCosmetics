const router = require("express").Router();

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

//update a single product's quantity 
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
    const updatedTotalQty = await cartproduct.quantity + 1
    await cart.addProduct(product, {through: {quantity: updatedTotalQty}})
    // console.log(cartproduct)
    const cartproduct1 = await CartProduct.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    res.send(cartproduct1)
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

    const updatedTotalQty = await cartproduct.quantity - 1
    if (updatedTotalQty <= 0) {
      updatedTotalQty = 1
    } else {
      await cart.addProduct(product, {through: {quantity: updatedTotalQty}})
    }
    // console.log(cart)
    const cartproduct1 = await CartProduct.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    res.send(cartproduct1)
    1
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

