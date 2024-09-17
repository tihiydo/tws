import styles from './style.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function NotFound() {
    const t = useTranslations("NotFound")
    const buttons = useTranslations("buttons")
    return (
        <div className={styles.container}>
            <Image
                fill
                src="/assets/icons/TwinSann.svg"
                alt="not-foung"
            />
            <div className={styles.contentWrapper}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>
                    {
                        t("title")
                    }
                </h2>
                <Link href="/" className={styles.homeBtn}>
                    {
                        buttons("toHome")
                    }
                </Link>
            </div>
        </div>
    )
}