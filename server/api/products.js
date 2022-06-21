const router = require("express").Router();
const { Product } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(product);
    } catch (err) {
        next(err);
    }
});

// router.get("/eye", async (req, res, next) => {
//     try {
//         const eyeProducts = await Product.findAll({
//             where: {
//                 productType: "eye",
//             },
//         });
//         res.json(eyeProducts);
//     } catch (err) {
//         next(err);
//     }
// });

// router.get('/face', async (req, res, next) => {
//   try {
//     const faceProducts = await Product.findAll({
//       where: {
//         productTypes: 'face',
//       },
//     });
//     res.json(faceProducts);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/lip', async (req, res, next) => {
//   try {
//     const lipProducts = await Product.findAll({
//       where: {
//         productTyp: 'lip',
//       },
//     });
//     res.json(lipProducts);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/nail', async (req, res, next) => {
//   try {
//     const nailProducts = await Product.findAll({
//       where: {
//         productType: 'nail',
//       },
//     });
//     res.json(nailProducts);
//   } catch (err) {
//     next(err);
//   }
// });
