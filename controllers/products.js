const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
   const products = await Product.find({price: {$gt : 30}})
  .sort('price')
  .select('name price')
    res.status(200).json({products, nbHits: products.length})
}
  


// const getAllProducts = async (req, res) => {
//   const {featured, company, name, sort, fields, numericFilters } = req.query
//   const queryObject = {}

//   if (featured) {
//     queryObject.featured = featured === 'true' ? true:false
//   }

//   if (company) {
//     queryObject.company = company
//   }

//   if (name) {
//     queryObject.name = { $regex: name, $options: 'i'}
//   }
// if (numericFilters) {
//  const operatorMap = {
//    '>': '$gt',
//    '>=': '$gte',
//    '=': '$eq',
//    '<': '$lt',
//    '<=': '$lte',
//  }
  
// const regEX = /\b(<|>|>=|=|<|<=)\b/g
// let filters = numericFilters.replace(
//   regEX, 
//   (match) =>`-${operatorMap[match]} -`
// )
// const options = ['price', 'rating'];
// filters = filters.split(',').forEach((item) => {
//   const  [field, operator, value] = item.split('-')
//   value = Number(value); // Convert to number
//   if (options.includes(field)) {
//     queryObject[field] = {[operator] : Number(value)}
//   }
// });

// }
//  console.log(queryObject)
// let  result = Product.find(queryObject)
// //
// if (sort) {
//   const sortList = sort.split(',').join(' ');
//   result = result.sort(sortList)
// }
// else{
//   result = result.sort('createdAt') 
// }

// if (fields) {
//   const fieldsList = fields.split(',').join(' ');
//   result = result.select(fieldsList)
// }

//  const page = Number(req.query.page) || 1
// const limit = Number(req.query.limit) || 10
// const skip = (page -1) * limit;

// result = result.skip(skip).limit(limit)
// //23
// //4 7 7 7 2



//     const products = await result
//   res.status(200).json({products, nbHits: products.length})
// }

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === 'true';
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: 'i' };

  if (numericFilters) {
    const operatorMap = { '>': '$gt', '>=': '$gte', '=': '$eq', '<': '$lt', '<=': '$lte' };
    const regEX = /\b(<|>|>=|=|<|<=)\b/g;
    
    let filters = numericFilters.replace(regEX, (match) => `-${operatorMap[match]}-`);
    const options = ['price', 'rating'];

    filters = filters.split(',').map((item) => {
      let [field, operator, value] = item.split('-');
      value = Number(value);
      return options.includes(field) ? { [field]: { [operator]: value } } : null;
    }).filter(Boolean);

    Object.assign(queryObject, ...filters);
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) result = result.sort(sort.split(',').join(' '));
  else result = result.sort('createdAt');

  if (fields) result = result.select(fields.split(',').join(' '));

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = await result.skip(skip).limit(limit); // ✅ Await Query Execution

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};


module.exports = {
    getAllProducts,
    getAllProductsStatic,
}