import style from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { findProduct } from "../../services/products";
import { getCartItems, createCartItem, updateCartItem } from "../../services/cart";

import Cart from "../../components/Cart";

import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";



const Product = ({ onRemove }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizeState, setSizeState] = useState("small");
  const [priceState, setPriceState] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(null);

  // const product = products.find((product) => {
  //     return product.id === parseInt(id);
  // })
  const populateCart = async () => {
    const cartData = await getCartItems();
    setShoppingCart(cartData);
    console.log("run this first, cartData", cartData)
  }

  useEffect(() => {
    const populateProduct = async () => {
      const data = await findProduct(id);
      setProduct(data);
      setSelectedProduct({...data, size: data.size[0], price: data.price[0]});
    };
    populateProduct();
    populateCart();
  }, [id]);

  // changes the price when the user changes size on the dropdown menu;
  // updates the selectedProduct state;
  useEffect(() => {
    if (selectedProduct) {
      switch (sizeState) {
        case product.size[0]:
          setPriceState(product.price[0]);
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[0],
          });
          break;
        case product.size[1]:
          setPriceState(product.price[1]);
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[1],
          });
          break;
        case product.size[2]:
          setPriceState(product.price[2]);
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[2],
          });
          break;

        default:
          break;
      }
    }
  }, [sizeState, product]);

  if (!product) {
    return <h2>Product with Id: {id} not found.</h2>;
  }

  const handleSizeStateSelection = (event) => {
    event.preventDefault();
    setSizeState(event.target.value);
  };
  // ------------------------------------------------------

  const handleAddToCart = async (product) => {
    
    console.log("shoppingCart at start of handleAddToCart", shoppingCart);
    // check to see if the item (being added to cart) is already in cart
    const exist = await shoppingCart.find((x) => x.id === product.id);
    console.log("exist, handleAddToCart in Product", exist);
    // if item exists in cart, map through, find it add 1 to qty via UPDATE;
    if (exist) {
      console.log("shopponCart", shoppingCart);
        shoppingCart.map((x) =>
          x.id === product.id ? updateCartItem(x.id, { qty: exist.qty + 1 }) : x
        );
    } else {
      // or if it does not exist in cart yet, add the item with a qty of 1;
      await createCartItem({ ...product, qty: 1 });
      populateCart();
      }
    };

  // const addToCart = (product) => {
  //   // check to see if the item (being added to cart) is already in cart
  //   const exist = cartItems.find((x) => x.id === product.id);
  //   // if item exists in cart, map through and add 1 to qty;
  //   if (exist) {
  //     createCartItem(
  //       cartItems.map((x) =>
  //         x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     );
  //   } else {
  //     // or if it does not exist in cart yet, add the item with a qty of 1;
  //     createCartItem([...cartItems, { ...product, qty: 1 }]);
  //   }
  // };
  // const onAdd = (product) => {
  //   const exist = cartItems.find((x) => x.id === product.id);
  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, qty: 1 }]);
  //   }
  // };
  // taken from <Button> property:  onClick={() => onAdd(selectedProduct)}
  // also removed onAdd from being received as a prop in function declaration

  return (
    <>
      <Container className={style.Product}>
        <h2>
          {product.productName} [{product.productType}]
        </h2>
        <img
          src={product.image}
          alt={product.productName}
          width="100%"
          height="300px"
        />
        <p>size: {sizeState}</p>
        <div className={style.Product__selector}>
          <Form.Select
            aria-label="Select size of product"
            onChange={handleSizeStateSelection}
          >
            {product.size &&
              product.size.map((size, index) => (
                <option value={size} key={index}>
                  {size}
                </option>
              ))}
          </Form.Select>
        </div>
        <p>Price: ${priceState}</p>
        <p>Type: {product.productType}</p>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add To Cart
          </Button>
        </div>
      </Container>
      <Container>
        {/* <Cart cartItems={cartItems} addToCart={addToCart} onRemove={onRemove} /> */}
        {/* <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} /> */}
      </Container>
    </>
  );
};

export default Product;
