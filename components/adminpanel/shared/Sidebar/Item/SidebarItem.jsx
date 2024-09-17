"use client"

import styles from "./sidebarItem.module.scss"


const SidebarItem = ({title, onClick}) => {
    return (
        <div className={styles.itemBox} onClick={onClick}>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    )
}

export default SidebarItem