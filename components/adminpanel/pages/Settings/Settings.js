import { Button, Skeleton, TextField } from "@mui/material";
import { useState } from "react";
import Cropper from "../../shared/ProductForm/Cropper/Cropper";
import TitlePage from "../../shared/titlePage/titlePage";
import SupabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import {PHOTO_STORAGE_URL} from "@/config";
import FileUploader from "../../shared/UI/FileUploader/FileUploader";
import { Oval } from "react-loader-spinner";
import { randomUUID } from "crypto";

const Settings = ({offer, popup}) => {
    const [newOffer, setNewOffer] = useState(offer[0].text)
    const [newOffer_ru, setNewOffer_ru] = useState(offer[0].text_ru)
    const [seeImg, setSeeImg] = useState(popup[0].image || null)
    const [loader, setLoader] = useState(false)
    const [popUpText, setPopUpText] = useState(popup[0].text || '')
    const [popUpText_ru, setPopUpText_ru] = useState(popup[0].text_ru || '')


    const handlerUploadPhoto = async (file) => {
        try {
            const nameFile = crypto.randomUUID();
            setLoader(true)
            setSeeImg(null)
            console.log(file)
            const ext = file.name.split('.').pop()
            console.log(ext)
            const resImg = await SupabaseFileService.uploadFile(file, 'images', `${nameFile}.${ext}`, `popup`);
            const imgUrl = `${PHOTO_STORAGE_URL}/${resImg.path}`
            console.log(imgUrl)
            setSeeImg(imgUrl)
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    }

    const handlerChangeOffer = (e) => {
        setNewOffer(e.target.value)
    }

    const handlerChangeOffer_ru = (e) => {
        setNewOffer_ru(e.target.value)
    }


    const handlerClickChangeOfer = async (e) => {
        
        const dataSend = {id: offer[0].id, text: newOffer, text_ru: newOffer_ru}
        console.log(dataSend)

        const resOffer = await fetch('/api/settings/updateOffer', {
            method: "PUT",
            body: JSON.stringify(dataSend)
        })

        const resOfferData = await resOffer.json()

        if(resOfferData.message == 'good'){
            alert('Оферта успешно изменена')
        }
    }

    const handlerClickChangePopupText = async (e) => {
        console.log(e.target.value)
        setPopUpText(e.target.value)
    }

    const handlerClickChangePopupText_ru = async (e) => {
        console.log(e.target.value)
        setPopUpText_ru(e.target.value)
    }

    const handlerChangePopUp = async (e) => {
        const dataSend = {id: popup[0].id, text: popUpText, text_ru: popUpText_ru, image: seeImg}
        console.log(dataSend)

        const resPopup = await fetch('/api/settings/updatePopup', {
            method: "PUT",
            body: JSON.stringify(dataSend)
        })

        const resPopupData = await resPopup.json()

        if(resPopupData.message == 'good'){
            alert('Данні Popup змінені')
        }else{
            alert('Помилка зміни данних в Popup')
        }
    }
    return (
        <>
            <TitlePage title="Налаштування"/>
            <div style={{fontSize: 25, fontWeight: 500, marginTop: 10, marginBottom: 7}}>Офер</div>
            <div style={{display: 'flex', gap: 20}}>
                <TextField id="outlined-basic" label="Текст для оферу" variant="outlined"  style={{width: 500}} onChange={handlerChangeOffer} defaultValue={offer[0].text} />
                <TextField id="outlined-basic" label="Текст для оферу RU" variant="outlined"  style={{width: 500}} onChange={handlerChangeOffer_ru} defaultValue={offer[0].text_ru} />
                <Button variant="contained" onClick={handlerClickChangeOfer}>Змінити</Button>
            </div>
            <div style={{fontSize: 25, fontWeight: 500, marginTop: 10, marginBottom: 7}}>PopUp</div>
            {/* <Cropper file={file} setFile={setFile} width={400} height={575} /> */}
            <div style={{display: 'flex', gap: 20}}>
                <FileUploader handleFile={handlerUploadPhoto}></FileUploader>
                <Oval
                    height={35}
                    width={35}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={loader}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={5}
                    strokeWidthSecondary={4}
                    />
            </div>
            
            <div style={{display: 'flex', gap: 20, marginTop: 10}}>
                {
                    seeImg != null ? 
                        <img src={seeImg} style={{width: '230px'}}></img>
                        :
                        <Skeleton variant="rectangular" width={230} height={400} />
                }
                <TextField 
                    style={{width: '350px'}}
                    id="outlined-multiline-static"
                    label="Введіть текст для PopUp"
                    multiline
                    rows={10}
                    defaultValue={popUpText}
                    onChange={handlerClickChangePopupText}
                />
                <TextField
                    style={{width: '350px'}}
                    id="outlined-multiline-static"
                    label="Введіть текст для PopUp RU"
                    multiline
                    rows={10}
                    defaultValue={popUpText_ru}
                    onChange={handlerClickChangePopupText_ru}
                />
            </div>
            
            <Button variant="contained" onClick={handlerChangePopUp} style={{marginTop: 20}}>Змінити данні в PopUp</Button>
        </>
    )
}

export default Settings;