"use client"

import styles from './itemImage.module.scss'
import Image from 'next/image'

const ImageItem = () => {
    return (
        <div className={styles.box}>
            <Image src="https://twinsann.com/components/src/itemImages/img_63063c51c930a.webp" fill alt={'photo'}/>
        </div>
    )
}

export default ImageItem