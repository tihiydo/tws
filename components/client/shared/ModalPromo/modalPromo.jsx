import {Modal, Skeleton, TextField} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState, useEffect} from "react";
import Button from "../../../shared/UI/Button/Button";
import {RxCross2} from 'react-icons/rx';
import classes from './modalPromo.module.scss'
import {addBitrixDeal} from "@/components/client/utils/bitrix";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import {useTranslations} from "use-intl";
import InputMask from "react-input-mask";


const ModalPromo = ({dataPopup}) => {
    console.log(dataPopup)
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowModal(true);
        }, 30000);
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name && phone) {
            // handle form submission here

            const url = `/api/application/add`;
            const data = {phone: phone, name: name, status: "active"};

            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(error => console.error(error));
            handleClose();
            await addBitrixDeal(false, {...data, payment_type: 'lead'})
        } else {
            setNameError(!name);
            setPhoneError(!phone);
        }
    };
    const matches = useMediaQuery('(min-width:600px)');
    const dbTranslate = useDynamicTranslate()
    const modal = useTranslations("ModalPromo");
    const form = useTranslations("form");
    const validation = useTranslations("validation");
    const buttons = useTranslations("buttons")

    if (!dataPopup) return null;

    return (
        <Modal open={showModal} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <div className={classes.box}>

                    <div className={classes.sideImage}>
                        {
                            dataPopup?.image != undefined ?
                                <img src={dataPopup?.image} alt="Image"/>
                                :
                                <Skeleton className="skeleton"/>
                        }
                    </div>


                    <div className={classes.sideText}>
                        <div className={classes.modalTitle}>
                            <div>{
                                modal("request")
                            }</div>
                            <RxCross2 onClick={handleClose} size="1.5rem"/>
                        </div>
                        <div className={classes.modalBody}>
                            {
                                dbTranslate(dataPopup, 'text') !== undefined ?
                                    <div className={classes.promoText}>{dbTranslate(dataPopup, 'text')}</div>
                                    :
                                    <>
                                        <Skeleton style={{width: '100%', height: '25px'}}/>
                                        <Skeleton style={{width: '55%', height: '25px'}}/>
                                        <Skeleton style={{width: '70%', height: '25px'}}/>
                                    </>

                            }

                            <Box className={classes.test}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label={form("name")}
                                    required
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                {nameError &&
                                    <span className={classes.errorText}>{validation("required")}</span>}


                                <InputMask
                                    mask="+380 (99) 999-99-99"
                                    maskChar={null}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            fullWidth
                                            size="small"
                                            label={form("phone")}
                                            placeholder="+380"
                                            required
                                        />
                                    )}
                                </InputMask>

                                {phoneError &&
                                    <span className={classes.errorText}>{validation("required")}</span>}
                            </Box>
                        </div>
                        <div className={classes.modaBtn}>
                            <Button variant="contained" type="submit">{
                                buttons("send")
                            }</Button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>

    );
};


export default ModalPromo;
