const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: 'vase table',
  })
    res.status(200).json({products, nbHits: products.length})
}
  


const getAllProducts = async (req, res) => {
  const {featured, company } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true:false
  }

  if (company) {
    queryObject.company = company
  }
  console.log(queryObject);
  
  const products = await Product.find(queryObject)
  res.status(200).json({products, nbHits: products.length})
}

// // const getAllProducts = async (req, res) => {
// //     try {
// //         const products = await Product.find({});
// //         res.status(200).json({ products, nbHits: products.length });
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server error', error });
// //     }
// // };

module.exports = { getAllProducts };



module.exports = {
    getAllProducts,
    getAllProductsStatic,
}