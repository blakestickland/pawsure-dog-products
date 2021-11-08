import styles from "./Cart.module.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Image, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { CartState } from "../../context/Context";

const Cart = () => {
    const { state: { cart }, dispatch } = CartState();
    const [total, setTotal] = useState();
    const [totalItems, setTotalItems] = useState();

    useEffect(() => {
      setTotal(cart.reduce((acc, curr) => acc + parseFloat(curr.price) * curr.qty, 0).toFixed(2));
      setTotalItems(cart.reduce((sum, item) => sum + parseInt(item.qty), 0));
    }, [cart]);
    
    return (
      <Container className="d-flex">
        <div className={styles.Cart}>
          <ListGroup>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <ListGroupItem
                    className={styles.Cart__cartItem}
                    key={item.id}
                  >
                    <Row>
                      <Col md={2} className="my-auto">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={2} className="my-auto">
                        <span>{item.productName}</span>
                      </Col>
                      <Col md={2} className="my-auto">
                        <span>${item.price[0].toFixed(2)}</span>
                      </Col>
                      <Col md={2} className="my-auto">
                        <span>Size: {item.size[0]}</span>
                      </Col>
                      <Col md={2} className="my-auto">
                        <p>Availble: {item.stock - item.qty}</p>
                        <p>Stock: {item.stock}</p>
                      </Col>
                      <Col md={2} className="my-auto">
                        <span>
                          <p>Quantity: {item.qty}</p>
                          <div>
                            <Button
                              variant="secondary"
                              className="increase mx-1"
                              onClick={() =>
                                dispatch({
                                  type: "INCREASE_CART_QUANTITY",
                                  payload: {
                                    id: item.id,
                                    qty: 1,
                                  },
                                })
                              }
                            >
                              +
                            </Button>
                            <Button
                              variant="secondary"
                              className="decrease mx-1"
                              onClick={() =>
                                dispatch({
                                  type: "DECREASE_CART_QUANTITY",
                                  payload: {
                                    id: item.id,
                                    qty: 1,
                                  },
                                })
                              }
                            >
                              -
                            </Button>
                          </div>
                          <div>
                            {/* {item.qty} x ${item.price.toFixed(2)} */}
                          </div>
                        </span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty</span>
            )}
          </ListGroup>
        </div>
        <div className={styles.Summary}>
          <h2>Cart Summary</h2>
          <span className="title">Subtotal ({ totalItems }) items</span>
          <span className={styles.Summary__total}>Total: $ {total}</span>
          <Button
            className={styles.Summary__button}
            type="button"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Container>
    );
}

export default Cart
