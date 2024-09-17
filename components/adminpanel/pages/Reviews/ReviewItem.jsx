import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import LinkMaterial from '@mui/material/Link';
import Link from 'next/link'
import 'react-photo-view/dist/react-photo-view.css';
import * as moment from 'moment'
import {PhotoProvider, PhotoView} from "react-photo-view";

export default function ReviewItem({data, reviews, setReviews}) {
  const momentObj = moment(data.createAt)
  // console.log(momentObj)
  const newDatetimeString = `${momentObj.format('YYYY-MM-DD')} ${momentObj.format('HH:mm:ss')}`
  async function updateData(id, status) {
    // console.log(status)
    try {
      const data = { id, updateData: {approved: status} };
      const response = await fetch(`/api/reviews`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
      })
      const json = await response.json();
      console.log(json)
      const newData = reviews.map(item => (item.id === id) ? {...item, approved: status} : item)
      console.log("NEW DATA", newData)
      setReviews(newData)
    } catch (e) {
      console.error(e)
    }
  }
  const getStatus = () => {
    switch (data.approved) {
      case 'discard':
        return 'Видалений'
      case 'approve':
        return 'Підтвердежний'
      default:
        return 'Не перевірений'
    }
  }
  return (
    <Card sx={{ minWidth: 275 }} style={{marginTop: 15}}>
      <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {newDatetimeString} - {data.phone}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Статус - {getStatus()}
          </Typography>
        </div>
        <Link href={`/products/${data?.Product?.slug}`}>
          <LinkMaterial>{data?.Product?.name}</LinkMaterial>
        </Link>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>

        <Rating name="read-only" value={data.rating} readOnly />

        <Typography variant="body2">
          {data.text}
        </Typography>
        {data?.images?.items?.length ?
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', margin: '15px 0'}}>
              <PhotoProvider>
                {data?.images?.items?.map((item, index) => (
                    <PhotoView key={index} src={item?.url} >
                      <img src={item?.url} alt="" style={{objectFit: "cover", width: 100, height: 100}}/>
                    </PhotoView>
                ))}
              </PhotoProvider>
            </div>
            : null
        }

      </CardContent>
      <CardActions>
        <Button variant="outlined" color="error" onClick={() => updateData(data.id, "discard")}>
          Видалити
        </Button>
        <Button variant="contained" color="success" onClick={() => updateData(data.id, "approve")}>
          Підтвердити
        </Button>
      </CardActions>
    </Card>
  )
}