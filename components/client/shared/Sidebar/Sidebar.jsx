import classes from './sidebar.module.scss';
import {GrClose} from 'react-icons/gr'
import {motion, useAnimation} from "framer-motion";
import SidebarItem from "./SidebarItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setSidebarVisibilityAction} from "@/store/userReducer";
import Image from "next/image";
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useRef, useState} from "react";
import {useTranslations} from 'next-intl';
import LanguageSwitcher from "@/components/client/shared/Header/LanguageSwitcher/LanguageSwitcher";
import {MdExpandMore} from "react-icons/md";


const sidebarMotion = {
    visible: {
        x: 0,
        transition: {
            type: 'tween'
        }
    },
    hidden: {
        x: '-100%',
        transition: {
            type: 'tween'
        }
    },
    closeVisible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'tween',
            duration: 0.3
        }
    },
    closeHidden: {
        x: '-100%',
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.3
        }
    }
}
const Sidebar = ({categories}) => {
    const isSidebarVisible = useSelector(state => state.user.isSidebarVisible)
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const info = useTranslations("info")

    const controls = useAnimation();
    const scrollRef = useRef();
    const handleScroll = async () => {
        // await controls.start({ scrollTop: blockRef.current.scrollHeight, transition: { duration: 0.5 } });
        // await controls.start({
        //     overscrollBehaviorY: 200,
        //     transition: {
        //         duration: 0.5
        //     }
        // })
        scrollRef.current.scrollTop = scrollRef.current.scrollTop + 85;
    }

    const mobileInfo = [
        {
            name: info("howOrder"),
            slug: 'aboutPay',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/6516/6516116.png'
        },
        {
            name: info("questions"),
            slug: 'questions',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/7786/7786396.png'
        },
        {
            name: info("waranty"),
            slug: 'warranty',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/9252/9252729.png'
        },
        {
            name: info("howPay"),
            slug: 'pay',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/2769/2769339.png'

        }
    ];

    const desktopInfo = [
        {
            name: info("howOrder"),
            slug: 'aboutPay',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/6516/6516116.png'
        },
        {
            name: info("questions"),
            slug: 'questions',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/7786/7786396.png'
        },
        {
            name: info("waranty"),
            slug: 'warranty',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/9252/9252729.png'
        },
        {
            name: info("howPay"),
            slug: 'pay',
            iconSrc: 'https://cdn-icons-png.flaticon.com/32/2769/2769339.png'
        },
    ]

    useEffect(() => {
        dispatch(setSidebarVisibilityAction(false))
    }, [pathname])

    // const getCategories = async () => {
    //     try {
    //         const res = await fetch('/api/categories', {
    //             method: 'GET'
    //         });
    //         const json = await res.json()
    //         console.log(json)
    //         setItems(json.categories)
    //         setIsLoading(false);
    //     } catch (e) {
    //
    //     } finally {
    //         setIsLoading(false)
    //     }
    //
    // }
    //
    // useEffect(() => {
    //     getCategories()
    // }, [])


    return (
        <>
            <motion.aside
                className={classes.sidebar_mobile}
                variants={sidebarMotion}
                initial={'hidden'}
                animate={isSidebarVisible ? 'visible' : 'hidden'}
            >
                {/*<PromoLine*/}
                {/*    promoText={'Весняний розпродаж до -50%'}*/}
                {/*    phoneNumber={'+38 (073) 999 00 77'}*/}
                {/*/>*/}
                <div className={classes.columns}>
                    <div className={classes.content}>
                        <div className={classes.menu}>

                            {categories?.map(item =>
                                <SidebarItem
                                    key={item.name}
                                    item={item}
                                    path={'/categories'}
                                />
                            )}
                            <SidebarItem
                                item={{
                                    name: 'Bestsellers',
                                    slug: 'bestsellers',
                                    iconSrc: 'https://cdn-icons-png.flaticon.com/32/1685/1685230.png'
                                }}
                                path={''}
                            />
                        </div>
                        <hr style={{margin: '15px 0', width: '100%', opacity: '0.5'}}/>
                        <motion.div
                            ref={scrollRef}
                            className={classes.menu}
                            style={{height: "200px", overflowY: "scroll"}}
                            animate={controls}
                        >
                            <SidebarItem
                                item={{
                                    name: info("home"),
                                    slug: '',
                                    iconSrc: 'https://cdn-icons-png.flaticon.com/32/3648/3648700.png'
                                }}
                                path={''}
                            />
                            <SidebarItem
                                item={{
                                    name: info("about"),
                                    slug: 'about',
                                    iconSrc: 'https://cdn-icons-png.flaticon.com/32/157/157933.png'
                                }}
                                path={'/info'}
                            />
                            <SidebarItem
                                item={{
                                    name: info("cooperation"),
                                    slug: 'cooperation',
                                    iconSrc: 'https://cdn-icons-png.flaticon.com/32/157/157933.png'
                                }}
                                path={'/info'}
                            />
                            <SidebarItem
                                item={{
                                    name: info("blog"),
                                    slug: 'blog',
                                    iconSrc: 'https://cdn-icons-png.flaticon.com/512/4922/4922073.png'
                                }}
                                path={''}
                            />
                            {mobileInfo?.map(item =>
                                <SidebarItem
                                    key={item.name}
                                    item={item}
                                    path={'/info'}
                                />
                            )}
                        </motion.div>
                        <div onClick={handleScroll} style={{display: "flex", justifyContent: "center"}}>
                            <MdExpandMore size={'1.6em'}/>
                        </div>
                        <div style={{display: 'flex', padding: '10px 20px'}}>
                            <LanguageSwitcher/>
                        </div>

                    </div>
                    <motion.div
                        variants={sidebarMotion}
                        animate={isSidebarVisible ? 'closeVisible' : 'closeHidden '}
                        className={classes.close}
                    >
                        <GrClose fill={"#fff"} size={'1.8em'}
                                 onClick={() => dispatch(setSidebarVisibilityAction(false))}/>
                    </motion.div>
                </div>

            </motion.aside>
            <aside className={classes.sidebar}>
                <div className={classes.logo} onClick={() => router.push('/')}>
                    <Image src={'/assets/icons/TwinSann.svg'} fill alt={'logo'}/>
                </div>
                <div className={classes.menu}>

                    {
                        categories?.map(item =>
                            <SidebarItem
                                key={item.name}
                                item={item}
                                path={'/categories'}
                            />
                        )
                    }
                    <SidebarItem
                        item={{
                            name: 'Bestsellers',
                            slug: 'bestsellers',
                            iconSrc: 'https://cdn-icons-png.flaticon.com/32/1685/1685230.png'
                        }}
                        path={''}
                    />


                    <hr style={{margin: '15px 0', width: '100%', opacity: '0.5'}}/>
                    {desktopInfo?.map(item =>
                        <SidebarItem
                            key={item.name}
                            item={item}
                            path={'/info'}
                        />
                    )}
                </div>
                <LanguageSwitcher/>
            </aside>
        </>

    );
};

export default Sidebar;