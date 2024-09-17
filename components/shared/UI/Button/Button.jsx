import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import classes from './button.module.scss';
import {MdShoppingCart} from "react-icons/md";

const btn_buyClasses = [classes.btn, classes.btn_buy].join(' ');
const btn_orderClasses = [classes.btn, classes.btn_order].join(' ');
const btn_buy_activeClasses = [classes.btn, classes.btn_buy, classes.btn_buy_active].join(' ');

const Button = ({children, text, variant, style, ...props}) => {
    switch (variant) {
        case 'buy':
            return (
                // <AnimatePresence>
                    <motion.button
                        {...props}
                        style={style}
                        type={'button'}
                        className={btn_buyClasses}
                        animate={{scale: [1, 1.05, 1]}}
                        transition={{duration: 0.8, repeat: Infinity, ease: "easeInOut", type: 'spring'}}
                    >
                        {children ? children : text}
                        <MdShoppingCart className={classes.btn_cart} size={'1.2em'}/>
                    </motion.button>
                // </AnimatePresence>
            )
        case 'order':
            return (
                // <AnimatePresence>
                <button
                    style={style}
                    {...props}
                    type={'button'}
                    className={btn_orderClasses}
                >
                    {children ? children : text}
                </button>
                // </AnimatePresence>
            )
        case 'buy_active':
            return (
                // <AnimatePresence>
                <button
                    style={style}
                    {...props}
                    type={'button'}
                    className={btn_buy_activeClasses}
                >
                    {children ? children : text}
                    <MdShoppingCart className={classes.btn_cart} size={'1.2em'}/>
                </button>
                // </AnimatePresence>
            )
        default:
            return (
                <button
                    style={style}
                    type={'button'}
                    className={classes.btn}
                    {...props}
                >
                    {children ? children : text}
                </button>
            );
    }
};

export default Button;