export const products = [
  // Students Array of objects
  { productName: "Deluxe Bone", productType: "Bones", price: 100, salePrice: 80, size: "large", weight: 560, stock: 10, id: 1 },
  { productName: "Medium Bone", productType: "Bones", price: 80, salePrice: 56, size: "medium", weight: 340, stock: 20, id:  2},
  { productName: "Petite Bone", productType: "Bones", price: 45, salePrice: 41, size: "small", weight: 120, stock: 11, id: 3 },
];

const idProducts = products.map((product, index) => {
  product.id = index + 1;
  product.browniePoints = Math.floor(Math.random() * 100);
  return product;
});

export default idProducts;
