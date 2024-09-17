import classes from "./sidebar.module.scss";
import {motion} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {MdExpandMore} from "react-icons/md";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import { useTranslations } from "next-intl";

const SidebarItem = ({item, path}) => {
    const pathname = usePathname();
    // console.log("PATHNAME", pathname)
    const [open, setOpen] = useState(false);
    const itemPath = `${path}/${item?.slug}`
    const activeItemClasses = [classes.sidebar_item, classes.sidebar_item_active].join(' ');
    const activeHeaderClasses = [classes.sidebar_header, classes.sidebar_header_active].join(' ');
    const activeSubitemClasses = [classes.sidebar_subitem, classes.sidebar_subitem_active].join(' ');
    const category = useTranslations("сategories")
    const activeStyle = useMemo(() => {
        const subcategoryName = pathname?.split('/').pop();
        const isActive = open || (pathname === itemPath || item?.Subcategories?.find(sub => sub.slug === subcategoryName));
        if (isActive) {
            return activeItemClasses;
        } else {
            return classes.sidebar_item
        }
    }, [pathname, open])

    const activeItemStyle = useMemo(() => {
        const isActive = pathname === itemPath;
        if (isActive) {
            return activeHeaderClasses;
        } else {
            return classes.sidebar_header
        }
    }, [pathname])

    const activeSubitemStyle = useCallback((path) => {
        const isActive = pathname.split('/').pop() === path.split('/').pop();
        if (isActive) {
            return activeSubitemClasses;
        } else {
            return classes.sidebar_subitem
        }
    }, [pathname])
    // const activeItemStyle = () => {
    //     // console.log('ITEM STYLES', pathname, itemPath)
    //
    // }

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    const dbTranslate = useDynamicTranslate()

    function clickHandler() {
        setOpen(!open)
    }
    const itemStyle = open
        ? { animation: `${classes.itemFadeIn} 0.3s forwards` }
        : { animation: `${classes.itemFadeOut} 0.3s forwards` };

    const sidebarStyle = open
        ? { animation: `${classes.sidebarExpand} 0.3s forwards` }
        : { animation: `${classes.sidebarCollapse} 0.3s forwards` };


    const isRoomCategory = item.id === "c592aeef-4bcf-4af3-a9a8-3fd8873ff307";

    return (

        <li className={activeStyle}>
            {item?.Subcategories?.length
                ?
                <div className={activeItemStyle} onClick={clickHandler}>
                    <div className={classes.text}>
                        {item?.iconSrc?.length
                            ? <img src={item?.iconSrc} alt={item?.name} width={20} height={20} />
                            : null
                        }
                        {dbTranslate(item, 'name')}
                    </div>
                        <motion.span
                            style={{width: 25, height: 25}}
                            initial={'closed'}
                            animate={open ? 'collapsed' : 'closed'}
                            exit="collapsed"
                            variants={{
                                closed: {transform: 'rotate(0deg)'},
                                collapsed: {transform: 'rotate(-180deg)'}
                            }}
                            transition={{duration: 0.2, type: 'keyframes'}}
                        >
                            <MdExpandMore size={'1.6em'} />
                        </motion.span>
                </div>
                :
                <Link className={activeItemStyle} href={itemPath}>
                    <div className={classes.text}>
                        {item?.iconSrc?.length
                            ? <img src={item?.iconSrc} alt={item?.name} width={20} height={20} />
                            : null
                        }
                        {dbTranslate(item, 'name')}
                    </div>
                </Link>
            }


            {item?.Subcategories?.length ?
                    // {open && (
                        <ul style={sidebarStyle} className={classes.sidebar_items}>
                            {
                                !isRoomCategory &&
                                    <li className={activeSubitemStyle(itemPath)} style={itemStyle}>
                                        <Link href={itemPath}>
                                            {category("all")}
                                        </Link>
                                    </li>
                            }
                            {item?.Subcategories?.map((li, index) => (<li
                                    className={activeSubitemStyle(`${itemPath}/${li?.slug}`)}
                                    style={itemStyle}
                                    key={index}
                                >
                                    <Link
                                        href={`${itemPath}/${li?.slug}`}
                                    >
                                        {dbTranslate(li, 'name')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                : null
                // : null
            }
        </li>
    );
};

export default SidebarItem;