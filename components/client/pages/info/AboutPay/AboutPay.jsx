import Button from '@/components/shared/UI/Button/Button';
import classes from './HowToOrder.module.scss'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl, TextField } from '@mui/material';
import {useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx';
import {addBitrixDeal} from "@/components/client/utils/bitrix";
import SeoBlock from '@/components/client/SeoBlock/SeoBlock';
import SchemaBlock from '@/components/client/SeoBlock/SchemaBlock';
import { useTranslations } from 'next-intl';
import InputMask from 'react-input-mask';
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SeoText from "@/components/client/SeoBlock/SeoText";

const AboutPay = ({ seo }) => {
	const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Як замовити?",
          "item": `${process.env.NEXT_PUBLIC_API_URL}/info/aboutPay`
        }]
    }

	const t = useTranslations("AboutPay");
	const buttons = useTranslations("buttons")
	const dbTranslate = useDynamicTranslate()

	return (
		<>
			<SeoBlock
				title={!!seo && dbTranslate(seo, "title")}
				description={!!seo && dbTranslate(seo, "description")}
			/>
			<SchemaBlock schema={schema} />
			<div className={classes.pageInfo} style={{minHeight: '100vh'}}>
				<h1 className={classes.title}>
					{
						!!seo ?
							dbTranslate(seo, "h") : t("title")
					}
				</h1>
				<div className={classes.parts}>
					<div className={classes.part}>
						<div className={classes.upper}>
							<div className={classes.num}>
								1
							</div>
							<h2 className={classes.partTitle}>
								{
									t("stepOneTitle")
								}
							</h2>
						</div>
						<div className={classes.lower}>
							<div>{t("steOneDescr1")}</div>
							<div>{t("steOneDescr2")}</div>
							<div>{t("steOneDescr3")}</div>
							<div>{t("steOneDescr4")}</div>
						</div>
						<Link href={'/'}>
							<Button variant="contained">
								{
									buttons("toCatalog")
								}
							</Button>
						</Link>
					</div>
					<div className={classes.part}>
						<div className={classes.upper}>
							<div className={classes.num}>
								2
							</div>
							<h2 className={classes.partTitle}>
								{
									t("stepTwoTitle")
								}
							</h2>
						</div>
						<div className={classes.lower}>
							<div>{t("stepTwoDescr1")}</div>
							<div>{t("stepTwoDescr2")}</div>
							<div>{t("stepTwoDescr3")}</div>
						</div>
						<BasicModal />
					</div>
				</div>

				<SeoText seo={seo} />

			</div>
		</>
	)
}
export default AboutPay;









const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
};

const BasicModal = () => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [nameError, setNameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [sendApplication, setSendApplication] = useState(false);


	const t = useTranslations("buttons");
	const form = useTranslations("form");
	const validation = useTranslations("validation");

	const handleOpen = () => {
		setOpen(true);
		setName('');
		setPhone('');
		setNameError(false);
		setPhoneError(false);
	};
	const handleClose = () => setOpen(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
		setNameError(false);
	};

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
		setPhoneError(false);
	};

	const handleSubmit = async () => {
		if (!name) {
			setNameError(true);
		}
		if (!phone) {
			setPhoneError(true);
		}
		if (name && phone) {
			// submit form
			console.log(name)

			const url = `/api/application/add`;
			const data = { phone: phone, name: name, status: "active" };

			await fetch(url, {
				method: 'POST',
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(json => console.log(json))
				.then(() => setSendApplication(true))
				.catch(error => console.error(error));
			await addBitrixDeal(false, {...data, payment_type: 'lead'})
		}
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				{
					t("setRequest")
				}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className={classes.modalTitle}>
						{
							t("setRequest")
						}
						<RxCross2 onClick={handleClose}/>
					</div>
					{
						sendApplication == false ?
							<>
								<div className={classes.modalBody}>
									<FormControl variant="standard">
										<TextField
											fullWidth
											size="small"
											label={form("name")}
											value={name}
											onChange={handleNameChange}
											error={nameError}
											required
										/>
										{nameError && <span className={classes.errorText}>{validation("required")}</span>}
									</FormControl>
									<FormControl variant="standard">
										<InputMask
											mask="+380 (99) 999-99-99"
											maskChar={null}
											value={phone}
											placeholder="+380"
											onChange={handlePhoneChange}
											error={phoneError}
											required
										/>
										{phoneError && <span className={classes.errorText}>{validation("required")}</span>}
									</FormControl>
								</div>

								<div className={classes.modalBtn}>
									<Button variant="contained" onClick={handleSubmit} type="submit">
										{
											t("setRequest")
										}
									</Button>
								</div>
							</>
							:

							<>
								<div className={classes.modalBody}>
									<div style={{
										display: 'flex',
										justifyContent: 'center',
										flexWrap: 'wrap'
									}}>
										<Image src='/assets/icons/checked.png' width={150} height={150} alt={'promo photo'}/>
										<div style={{
											fontWeight: '600',
											fontSize: '25px'
										}}>
											Дякуємо за звернення
										</div>
										<div style={{
											fontWeight: '300',
											fontSize: '18px',
											textAlign: 'center'
										}}>
											Очікуйте на дзвінок менеджера для уточнення
										</div>
									</div>

								</div>
							</>
					}
				</Box>
			</Modal>
		</div>
	);
}
