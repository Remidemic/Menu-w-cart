import React, { useContext, useEffect, useState } from "react"
import CartContext from "../../Store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartCxt = useContext(CartContext)

    const { items } = cartCxt;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () =>{
            clearTimeout(timer);
        }

    }, [items]);


    return (

        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>)
}

export default HeaderCartButton