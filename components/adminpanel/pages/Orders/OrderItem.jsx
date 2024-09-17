import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';

import * as moment from 'moment'

export default function OrderItem({setIsVisible, setProducts, data, orders, setOrders}) {
    const momentObj = moment(data.createdAt)
    const newDatetimeString = `${momentObj.format('YYYY-MM-DD')} ${momentObj.format('HH:mm:ss')}`

    const openModal = () => {
        setProducts(data.OrderProducts)
        setIsVisible(true)
    }
    const getStatus = () => {
        switch (data.approved) {
            case 'new_order':
                return 'Нове замовлення'
            case 'approve':
                return 'Підтвердежний'
            default:
                return 'Не перевірений'
        }
    }

    const getPaymentStatus = () => {
        switch (data.payment_type) {
            case 'prepayment_buy':
                return 'Передплата'
            case 'now_buy':
                return 'Повна оплата - не підтверджена'
            case 'verificated':
                return 'Повна оплата - підтверджена'
            default:
                return 'Передплата'
        }
    }
    const updateStatus = async (id, status) => {
        try {
            const response = await fetch('/api/order/updateStatus', {
                method: "POST",
                body: JSON.stringify({
                    id,
                    approved: status
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json = await response.json();
            const newOrders = orders?.map(order => order.id === id ? json.data : order)
            setOrders(newOrders)
        } catch (e) {
            console.error(e)
            alert('ERROR')
        }
    }

    return (
        <Card sx={{minWidth: 275}} style={{marginTop: 15}}>
            <CardContent>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            ID: {data.id}
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Замовлено: {newDatetimeString}
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Номер телефону: {data.phone}
                        </Typography>
                    </div>

                    <Typography sx={{fontSize: 16}} color="text.secondary" gutterBottom>
                        Статус - {data.approved ? 'Підтвердежний' : 'Нове замовлення'}
                    </Typography>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography variant="h6" component="div">
                            {data.name} {data.surname}
                        </Typography>

                        {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                        {/*    Тип доставки: {data.shipping_type}*/}
                        {/*</Typography>*/}

                        {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                        {/*    Тип оплати: {data.payment_type}*/}
                        {/*</Typography>*/}


                        {data.shipping_type === 'address' ?
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Адреса доставки: {data.address}
                            </Typography>

                            :

                            <>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Місто: {data.city}
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Номер відділеня: {data.department}
                                </Typography>
                            </>
                        }

                        <Typography variant="body2">
                            Тип замовлення: {getPaymentStatus()}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Ціна: {data.price}грн
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" component="div">
                            {data.name} {data.surname}
                        </Typography>
                    </div>
                </div>


            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={openModal}>
                    Переглянути продукти
                </Button>
                <Button variant="contained" color="success" onClick={() => updateStatus(data.id, true)}>
                    Підтвердити
                </Button>
            </CardActions>
        </Card>
    )
}