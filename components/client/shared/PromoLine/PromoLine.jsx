import classes from './promoLine.module.scss'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";


const PromoLine = ({promo}) => {
    const router = useRouter()
    const dbTranslate = useDynamicTranslate()
    if (!promo) return null
    return (
        <div className={classes.promoLine}>
            <div className={classes.box}
             onClick={()=> router.push('/bestsellers')}>
                <div className={classes.iconsLeft}>
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                </div>
                <div>{dbTranslate(promo, 'text')}</div>
                <div className={classes.iconsRight}>
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                    <Image src={'/assets/icons/iconDiscount.png'} width={20} height={20} alt={'discount'} />
                </div>

            </div>

            {/* <div>{phoneNumber}</div> */}
        </div>
    );
};

export default PromoLine;
