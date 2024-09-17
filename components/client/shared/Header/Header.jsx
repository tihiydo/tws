import classes from './header.module.scss'
import {MdShoppingCart} from 'react-icons/md';
// import {AiOutlineSearch} from 'react-icons/ai';
import {RxHamburgerMenu} from 'react-icons/rx';
// import {useIsMobile} from "@/hooks/useIsMobile";
import {useDispatch, useSelector} from "react-redux";
import {setSidebarVisibilityAction} from "@/store/userReducer";
import {setIsModalCartVisibleAction} from "@/store/cartReducer";
import {motion} from "framer-motion";
import {Badge} from "@mui/material";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {checkOutStepOne} from "@/components/client/lib/gtm/events/checkoutSteps";
import { useTranslations } from 'next-intl';
import SearchInput from "@/components/client/shared/Header/Search/Search";
import MobileSearch from "@/components/client/shared/Header/Search/MobileSearch";
// import {AiOutlineSearch} from "react-icons/all";
const Header = () => {
    // const isMobile = useMediaQuery('(max-width: 768px)');
    const dispatch = useDispatch();
    const pathname = usePathname();
    const activeClasses = [classes.link, classes.active].join(' ');
    const products = useSelector(state => state.cart.products);
    const info = useTranslations("info")
    const productsCount = products.reduce((acc, pr) => {
        return acc += 1;
    }, 0)

    const getStyles = (path) => {
        if (pathname === path) {
            return activeClasses
        }
        else {
            return classes.link
        }
    }

    const cartClickHandler = () => {
        dispatch(setIsModalCartVisibleAction(true))
    }
    return (
        <>
            <header className={classes.header_mobile}>
                 {/*<AiOutlineSearch size={'1.8em'} />*/}
                <div style={{display: 'flex'}}>
                    <RxHamburgerMenu
                        onClick={() => dispatch(setSidebarVisibilityAction(true))}
                        size={'1.8em'}
                    />
                </div>
                <Link className={classes.logo} href={"/"}>
                    <Image src={'/assets/icons/TwinSann.svg'} alt="logo" fill />
                </Link>
                <div style={{display: 'flex', justifySelf: 'end', gap: 8}}>
                    <div>
                        <MobileSearch />
                    </div>
                    <motion.div
                        style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        whileHover={{scale: 1.1}}
                    >
                        <Badge
                            color={'secondary'}
                            badgeContent={productsCount}
                        >
                            <MdShoppingCart
                                onClick={cartClickHandler}
                                size={'1.8em'}
                            />
                        </Badge>
                    </motion.div>

                </div>
            </header>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <Link
                        href={"/"}
                        className={getStyles('/')}
                    >
                        {
                            info("home")
                        }
                    </Link>
                    <Link
                        href={"/info/about"}
                        className={getStyles('/info/about')}
                    >
                        {
                            info("about")
                        }
                    </Link>
                    <Link
                        href={"/info/cooperation"}
                        className={getStyles('/info/cooperation')}
                    >
                        {
                            info("cooperation")
                        }
                    </Link>
                    <Link
                        href={"/blog"}
                        className={getStyles('/blog')}
                    >
                        Блог
                    </Link>
                    {/* <Link
                        href={"news"}
                        className={getStyles('/news')}
                    >
                        Новини
                    </Link> */}
                </nav>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <SearchInput />
                    <motion.div
                        style={{cursor: 'pointer'}}
                        whileHover={{scale: 1.1}}
                    >
                        <Badge
                            color={'secondary'}
                            badgeContent={productsCount}
                        >
                            <MdShoppingCart
                                onClick={cartClickHandler}
                                size={'1.8em'}
                            />
                        </Badge>
                    </motion.div>
                </div>

            </header>
    </>
    );
};

export default Header;