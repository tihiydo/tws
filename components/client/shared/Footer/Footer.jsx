import { useTranslations } from 'next-intl';
import classes from './footer.module.scss'
import {useRouter} from "next/navigation";

const Footer = () => {
    const router = useRouter();

    const products = useTranslations("сategories")
    const info = useTranslations("info")
    const footer = useTranslations("footer")

    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.cols}>
                    <div className={classes.col}>
                        <div className={classes.title}>
                            {
                                info("products")
                            }
                        </div>
                        <div onClick={() => router.push('/categories/pufy')} className={classes.item}>
                            {
                                products("pufFiveInOne")
                            }
                        </div>
                        <div onClick={() => router.push('/categories/stiltsi')} className={classes.item}>
                            {
                                products("stiltsi")
                            }
                        </div>
                        <div onClick={() => router.push('/categories/stoly')} className={classes.item}>
                            {
                                products("stoly")
                            }
                        </div>
                        <div onClick={() => router.push('/categories/miaka_stinka')} className={classes.item}>
                            {
                                products("stinky")
                            }
                        </div>

                    </div>
                    <div className={classes.col}>
                        <div className={classes.title}>
                            {
                                info("contacts")
                            }
                        </div>
                        <div className={classes.item}>
                            <a target="_blank" href="https://maps.app.goo.gl/2QmRZhwGTfrxL7YYA">
                               {info('locale')}
                            </a>
                            </div>
                        <div className={classes.item}><a target="_blank" href="tel:+38 (073) 999 00 77">{footer("hotline")}: <br/>+38 (073) 999 00 77</a></div>
                        <div className={classes.item}><a target="_blank" href="tel:+38 (063() 161 04 27">{footer("salesDepartment")}: <br/>+38 (063) 161 04 27</a></div>
                        <div className={classes.item}><a target="_blank" href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwQnjlrHCVPlJfmxHHLXLtmbGCbvrbvVlDDbwfdwzfpTlTCbdvlgwkwbQDfGhnxTDpLvCQX">twinsann.info@gmail.com</a></div>
                        <div className={classes.item}>Twinsann</div>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.title}>
                            {
                                info("howOrder")
                            }
                        </div>
                        <div onClick={() => router.push('/info/aboutPay')} className={classes.item}>
                            {
                                info("howOrder")
                            }
                        </div>
                        <div onClick={() => router.push('/info/questions')} className={classes.item}>
                            {
                                info("questions")
                            }
                        </div>
                        <div onClick={() => router.push('/info/warranty')} className={classes.item}>
                            {
                                info("waranty")
                            }
                        </div>
                        <div onClick={() => router.push('/info/pay')} className={classes.item}>
                            {
                                info("howPay")
                            }
                        </div>
                         <div onClick={() => router.push('/info/privacyPolicy')} className={classes.item}>
                            {
                                info("privacyPolicy")
                            }
                         </div>
                        <div  className={classes.socialIcons}>
						<a href="https://www.instagram.com/twin_sann/">
							<img src={'/assets/icons/instagram.svg'} alt="instargam icon"/>
						</a>
						<a href="https://www.facebook.com/TwinSann/">
                        	<img src={'/assets/icons/facebook.svg'} alt="facebook icon"/>
						</a>
						<a href="https://t.me/twin_sann">
                        	<img src={'/assets/icons/telegram.svg'} alt="telegram icon"/>
						</a>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
