// const getAllProductsStatic = async (req, res) => {
//     throw new Error('testing async errors')
//     res.status(200).json({msg: 'products testing routes'})
// }
const getAllProductsStatic = async (req, res, next) => {
    try {
      throw new Error('testing async errors'); // This will be caught
    } catch (error) {
      next(error); // Pass error to Express error handler
    }
  };
  

const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'products routes'})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic,
}