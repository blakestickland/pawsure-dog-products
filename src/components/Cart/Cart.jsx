import Button from "react-bootstrap/Button";
import styles from "./Cart.module.scss";

const Cart = ({ cartItems, onAdd, onRemove }) => {
    console.log("cartItems before:", cartItems);
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.1;
    const shippingPrice = itemsPrice > 2000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    return (
        <div className={styles.Cart}>
            <h2>Cart Items</h2>
            <>
                {cartItems.length === 0 && <p>Cart is empty</p>}
            </>
            {cartItems.map(item => (
                <div key={item.id} className="row">
                    <p>{item.productName}</p>
                    <div>
                        <button onClick={()=>onAdd(item)} className="add">
                            +
                        </button>
                        <button onClick={()=>onRemove(item)} className="add">
                            -
                        </button>
                    </div>
                    <div>
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>
            ))}
            {cartItems.length !== 0 && (
                <div> 
                    <hr></hr>
                    <div className="row">
                        <div>Items Price</div>
                        <div>${itemsPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div>GST</div>
                        <div>${taxPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div>Shipping Price</div>
                        <div>${shippingPrice.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div><strong>Total Price</strong></div>
                        <div><strong>${totalPrice.toFixed(2)}</strong></div>
                    </div>
                    <hr />
                    <div className="row">
                        <Button onClick={() => alert("Implement Checkout")}>
                            Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
