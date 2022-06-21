const { db, User, Product, Cart, CartProduct } = require("./server/db/models");
const { green, red } = require("chalk");

const products = [
    {
        brandName: "TOM FORD",
        productName: "Eye Color Quad",
        productType: "eye",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2230266-main-zoom.jpg?imwidth=612",
        price: 89,
        stock: 110,
        description:
            "A palette of coordinated eyeshadows that comes in a range of finishes designed to create iconic, soft-to-bold TOM FORD eyes.",
    },
    {
        brandName: "Benefit",
        productName: "Eyebrow Gel",
        productType: "eye",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2181329-main-zoom.jpg?imwidth=612",
        price: 14,
        stock: 59,
        description:
            "A perfect try-me size of brow-volumizing, tinted fiber gel to boost the look of brow volume.",
    },
    {
        brandName: "Givenchy",
        productName: "Mascara",
        productType: "eye",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2235950-main-zoom.jpg?imwidth=612",
        price: 27,
        stock: 0,
        description:
            "A mascara with up to 24 hours wear, and excessive volume and curve.",
    },
    {
        brandName: "Gucci",
        productName: "Nail Polish",
        productType: "nail",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2560316-main-zoom.jpg?imwidth=612",
        price: 30,
        stock: 0,
        description:
            "A brilliant, intense plant-based varnish for long-lasting glossy shine and yesteryear glamour—available in an array of shades.",
    },
    {
        brandName: "Dior",
        productName: "Nail Glow",
        productType: "nail",
        imageURL:
            "https://www.sephora.com/productimages/sku/s1495811-main-zoom.jpg?imwidth=612",
        price: 28,
        stock: 2,
        description:
            "A nail enhancer that gives your natural nails a shiny, healthy glow.",
    },
    {
        brandName: "Nars",
        productName: "Foundation",
        productType: "face",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2514586-main-zoom.jpg?imwidth=630",
        price: 49,
        stock: 100,
        description:
            "An advanced makeup-skincare-hybrid foundation with a natural finish that quickly blurs and smooths while visibly improving skin’s clarity over time.",
    },
    {
        brandName: "Bobbi Brown",
        productName: "Primer",
        productType: "face",
        imageURL:
            "https://www.sephora.com/productimages/sku/s1292820-main-zoom.jpg?imwidth=630",
        price: 64,
        stock: 10,
        description:
            "A bestselling, multivitamin-enriched primer that nourishes, visibly plumps, and preps skin with healthy hydration to improve the look of foundation.",
    },
    {
        brandName: "Nars",
        productName: "Lipstick",
        productType: "lip",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2116770-main-zoom.jpg?imwidth=1224",
        price: 34,
        stock: 88,
        description:
            "A matte lipstick that features a long-lasting, buildable, and hydrating formula",
    },
    {
        brandName: "Dior",
        productName: "Lipstick",
        productType: "lip",
        imageURL:
            "https://www.sephora.com/productimages/sku/s2509263-main-zoom.jpg?imwidth=630",
        price: 39,
        stock: 20,
        description:
            "A Dior Addict lipstick for up to 24 hours of hydration and up to six hours of color and shine, in a refillable couture case.",
    },
];

const adminUsers = [
    {
        email: "admint@1.com",
        password: "test",
        userType: "admin",
    },
    {
        email: "bellahadid@gmail.com",
        password: "theweekend",
        deliveryAddress: "380 72 Rd Santa Barbara, CA",
        creditCard: "2580 3069 5479 8150",
        userType: "admin",
    },
];

const users = [
    {
        email: "timotheechalamet@gmail.com",
        password: "dune",
        deliveryAddress: "5 Bloom ln, Hollywood, CA",
        creditCard: "4564 7676 8734 9012",
    },
    {
        email: "taylorswift@gmail.com",
        password: "tswifty15",
        deliveryAddress: "190 E 25th St New York, NY",
        creditCard: "8932 9456 3421 8673",
    },
    {
        email: "selenagomez@gmail.com",
        password: "loveyoulikealovesong",
        deliveryAddress: "10 Waverly Pl Dallas, TX",
        creditCard: "9762 2518 7436 6982",
    },
    {
        email: "lanadelrey@yahoo.com",
        password: "brooklynbaby",
        deliveryAddress: "17 Marshwood st, Venice, CA",
        creditCard: "2341 5626 8756 9080",
    },
    {
        email: "mitski@gmail.com",
        password: "washingmachineheart",
        deliveryAddress: "43 beach st, Phoenix, AZ",
        creditCard: "4586 9080 7272 2348",
        userType: "admin", // this will fail back to customer
    },
];

const seed = async () => {
    try {
        await db.sync({ force: true });

        // Only the first users can be admin. Sequelize create runs so fast in parallel that all users here can be the "first" user.
        // All users here can be admins
        await Promise.all(
            adminUsers.map((user) => {
                return User.create(user);
            })
        );

        // Database now has more than one user, so no more users can be admin
        await Promise.all(
            users.map((user) => {
                return User.create(user);
            })
        );

        await Promise.all(
            products.map((product) => {
                return Product.create(product);
            })
        );
    } catch (err) {
        console.log(red(err));
    }
};

module.exports = seed;

if (require.main === module) {
    seed()
        .then(() => {
            console.log(green("Seeding success!"));
            db.close();
        })
        .catch((err) => {
            console.error(red("Oh noes! Something went wrong!"));
            console.error(err);
            db.close();
        });
}
