import { createCartItem, deleteCartItem, updateCartItem } from "../services/cart";

export const cartReducer = (state, action) => {
        
    const handleDelete = async (action) => {
          await deleteCartItem(action.payload.id);
          console.log(action.payload.id);
        };

    // const handleIncrease = async (product) => {
    //   const partial = {
    //     qty: product.qty + 1,
    //   };
    //   await updateCartItem(product.id, partial);
    //   console.log(`${product.productName} updated in cart`, partial);
    // };


        // const handleSubmit = async () => {
        //   const partial = {
        //     qty: qty + 1,
        //   };

        //   await updateCartItem(item.id, partial);
        // //   setFirstName("");
        // //   onSubmit();
        // };

    switch (action.type) {
      case "ADD_TO_CART":
        return createCartItem({ ...action.payload, qty: 1 });
        // return {
        //   ...state,
        //   cart: [...state.cart, { ...action.payload, qty: 1 }],
        // };
      case "REMOVE_FROM_CART":
        // check to see if item is last item in cart
        // handleDelete(action);
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case "INCREASE_CART_QUANTITY":
          // update the current cartItem document
          //  handleIncrease();
        return {
          ...state,
          cart: state.cart.filter(item =>
             item.id === action.payload.id ?
             item.qty = item.qty+1 :
             item.qty),
        };
      case "DECREASE_CART_QUANTITY":
          // update the current cartItem document
        //   return handleSubmit();
        return {
          ...state,
          cart: state.cart.filter(item =>
             item.id === action.payload.id ?
             item.qty = item.qty - 1 :
             item.qty),
        };
      default:
        return state;
    }
}