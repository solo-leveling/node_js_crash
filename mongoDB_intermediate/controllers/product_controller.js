const Product = require("../models/Product");

const insertData = async (req, res) => {
  try {
    const data = [
      {
        name: "Wireless Mouse",
        category: "Electronics",
        price: 29.99,
        inStock: true,
        tags: ["computer", "accessory", "wireless", "USB"],
      },
      {
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: 14.99,
        inStock: true,
        tags: ["fashion", "casual", "cotton", "unisex"],
      },
      {
        name: "Cooking Pan Set",
        category: "Kitchen",
        price: 49.99,
        inStock: false,
        tags: ["cookware", "non-stick", "kitchen", "home"],
      },
      {
        name: "Bluetooth Headphones",
        category: "Electronics",
        price: 89.99,
        inStock: true,
        tags: ["audio", "wireless", "bluetooth", "music"],
      },
      {
        name: "Notebook",
        category: "Stationery",
        price: 3.5,
        inStock: true,
        tags: ["paper", "school", "office", "writing"],
      },
    ];
    const result = await Product.insertMany(data);
    res.status(201).json({
      success: true,
      message: `Inserted ${result.length} data.`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred in inserting data",
    });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          price: {
            $gte: 20,
          },
          inStock: true,
        },
      },
    ]);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      message: "Can't find Products",
    });
  }
};

module.exports = { insertData, getProductStats };
