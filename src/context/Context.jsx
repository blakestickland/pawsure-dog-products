import { 
    createContext, 
    useState, 
    useEffect,
    useReducer, 
    useContext 
} 
from "react";
import { cartReducer } from "./Reducers";
import { getProducts } from "../services/products";
import { getCartItems } from "../services/cart";

export const Context = createContext();

const Provider = ({ children }) => {
    const [search, setSearch] = useState("");
    // const [myCart, setMyCart] = useState(null);
    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: [],
    });
    
    const populateProducts = async () => {
        console.log("propProds inside CONTEXT has been trigggered1");
        console.log("state.products inside CONTEXT", state.products);
        const productData = await getProducts();
        state.products = productData;
        console.log("state.products inside CONTEXT-2", state.products);
    };

    const populateCart = async () => {
      const cartData = await getCartItems();
      state.cart = cartData;
    };
    
    useEffect(() => {
      populateProducts();
      populateCart();
    }, []);

    const data = { 
        search, 
        setSearch,  
        // myCart, 
        // setMyCart, 
        state, 
        dispatch, 
        populateProducts,
        populateCart 
    };

    return (
        <Context.Provider value={data}>{children}</Context.Provider>
    );
};

export default Provider;

export const CartState = () => {
    return useContext(Context);
}
