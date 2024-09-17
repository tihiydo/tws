"use client"
import { Rating } from '@mui/material';
import classes from './reviewItem.module.scss'
import {PhotoProvider, PhotoView} from "react-photo-view";

import 'react-photo-view/dist/react-photo-view.css';
import {useTranslations} from "next-intl";



const ReviewItem = ({user, starsRate, reviewText, images}) => {

	const t = useTranslations('Product')

    return (
        <div className={classes.item}>
            <div className={classes.name}>
                {user}
            </div>
            <div className={classes.info}>
                <div className={classes.rate}>
                <Rating defaultValue={4} size="large" readOnly value={starsRate}/>
                </div>
                <span>{t('comment')}:</span>
                <div className={classes.text}>
                   {reviewText}
                </div>
                {images?.items?.length ?
                    <div style={{marginTop: 10}}>
                        <div style={{fontSize: 18, fontWeight: 500}}>
                            Фото:
                        </div>
                        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', margin: '12px 0'}}>
                            <PhotoProvider>
                                {images?.items?.map((item, index) => (
                                    <PhotoView key={index} src={item?.url} >
                                        <img src={item?.url} alt="" style={{objectFit: "cover", borderRadius: 5, width: 100, height: 100}}/>
                                    </PhotoView>
                                ))}
                            </PhotoProvider>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}
export default ReviewItem;