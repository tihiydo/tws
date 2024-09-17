"use client"

import styles from './colorItem.module.scss'

const ColorItem = ({thisColor}) => {
    return (
        <div className={styles.color} style={{backgroundColor: thisColor}}></div>
    )
}

export default ColorItem