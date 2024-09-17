import styles from './languageSwitcher.module.scss'

import {useRouter} from 'next/router'
import Link from "next/link";

const LanguageSwitcher = () => {
    const router = useRouter()
    const currentLang = router.locale;


    return (
        <div className={styles.box}>
            <Link
                href={router.asPath}
                className={
                    currentLang === 'uk' ? styles.lang_active : styles.lang
                }
                locale={'uk'}
            >
                UA
            </Link>
            <div className={styles.separator}></div>
            <Link
                href={router.asPath}
                locale={'ru'}
                className={
                    currentLang === 'ru' ? styles.lang_active : styles.lang
                }
            >
                RU
            </Link>
        </div>

    )
}


export default LanguageSwitcher;
