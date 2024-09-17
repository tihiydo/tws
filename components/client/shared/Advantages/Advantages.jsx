import classes from './advantages.module.scss'
import {CiDeliveryTruck} from "react-icons/ci";
import {BsShieldCheck} from "react-icons/bs";
import {TfiFaceSmile} from "react-icons/tfi";
import {BsCreditCard2Back} from "react-icons/bs";




const Advantages =() => {
    return (
        <div className={classes.box}>
            <div className={classes.upper}>

                <div className={classes.item}>
                <div className={classes.icon}><img src="/assets/images/iconAdvantages1.png" /></div>
                    <div className={classes.text}>
                        <div className={classes.title}>ДОСТАВКА<br/>УКРАЇНОЮ</div>
                        <div className={classes.descr}>Надійно й швидко доставимо покупку у ваше місто транспортними компаніями</div>
                    </div>
                </div>
                <div className={classes.item}>
                    <div className={classes.icon}><img src="/assets/images/iconAdvantages2.png" /></div>
                    <div className={classes.text}>
                        <div className={classes.title}>ГАРАНТІЯ <br/> ДО 12 МІСЯЦІВ</div>
                        <div className={classes.descr}>У відповідності до закону про Захист прав споживачів</div>
                    </div>
                </div>
                <div className={classes.item}>
                <div className={classes.icon}><img src="/assets/images/iconAdvantages3.png" /></div>
                    <div className={classes.text}>
                        <div className={classes.title}>НАДІЙНІСТЬ<br/>  СПІВПРАЦІ</div>
                        <div className={classes.descr}>Ми працюємо на ринку України больше, ніж 10 років. Наші шоуруми у найкращих ТЦ України.</div>
                    </div>
                </div>
                <div className={classes.item}>
                <div className={classes.icon}><img src="/assets/images/iconAdvantages4.png" /></div>
                    <div className={classes.text}>
                        <div className={classes.title}>ЗРУЧНА <br/> СИСТЕМА ОПЛАТИ</div>
                        <div className={classes.descr}>
                            Платіть як вам зручно
                            • готівкою в салоні чи вдома
                            • платіжною картою
                            • безготівковий розрахунок
                        </div>
                    </div>
                </div>
                
            </div>
            {/* <div className={classes.lower}>
                <div className={classes.left}>
                    <div className={classes.item}>
                        <div>3001</div>
                        <span>Моделей на складі</span>
                    </div>
                    <div className={classes.item}>
                        <div>609</div>
                        <span>Замовлень в цьому році</span>
                    </div>
                </div>
                <div className={classes.right}>
                </div>
            </div> */}
            
        </div>
    )
}
export default Advantages;