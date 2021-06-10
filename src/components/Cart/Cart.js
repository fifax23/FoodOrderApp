import React, {useContext} from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import classes from './Cart.module.css';

const Cart = (props) => {
    const CartCtx = useContext(CartContext);

    const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
    const hasItems = CartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        CartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        CartCtx.addItem(item);
    };

    const cartItems = <ul className={classes['cart-items']}>
        {CartCtx.items.map(item => {
        return (
            <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
        )
    })}</ul>;
    return (
        <Modal onClick={props.onHideCard}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span> 
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCard}>close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
