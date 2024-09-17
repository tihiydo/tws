import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const SeoRecordCard = ({ record }) => {
	return (
		<Card sx={{minWidth: 275}} style={{marginTop: 15}}>
			<CardContent style={{maxWidth: 1187}}>
				<div>
					<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
						URL: { record.url }
					</Typography>
				</div>

				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div>
						<Typography variant="h6" component="div">
							{ record.title }
						</Typography>
						<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom
									dangerouslySetInnerHTML={{
										__html: record.description
									}}
						>
						</Typography>
					</div>
				</div>
			</CardContent>
			<CardActions style={{ display: "flex", gap: 16}}>
				<Button variant="outlined" href={record.url} target={"_blank"}>
					Переглянути сторінку
				</Button>
				<Button variant="contained" href={`/adminpanel/seo/${record.id}`}>
					Редагувати
				</Button>
			</CardActions>
		</Card>
	)
}

export default SeoRecordCard;