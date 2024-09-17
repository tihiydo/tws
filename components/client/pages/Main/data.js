export default {
	swiper: {
		data: {
			desktop: [
				{
					id: 0,
					title: 'main-banner',
					src: '/assets/images/pcSwiperBannerV1.webp'
				}
			],
			mobile: [
				{
					id: 2,
					title: 'main-banner',
					src: '/assets/images/mobileSwiperBannerV2.png'
				}
			],
		},
		settings: {
			banner: {
				slidesPerView: 1,
				spaceBetween: 20,
				// speed: 500,
				// loop: "true",
				// autoplay: {
				// 	delay: 2000,
				// 	disableOnInteraction: true,
				// },
				// pagination: {
				// 	el: '.swiperPagination',
				// 	type: 'bullets',
				// 	clickable: true,
				// 	dynamicBullets: true,
				// 	dynamicMainBullets: 1,
				// },
			},
			cards: {
				speed: 500,
				spaceBetween: 10,
				breakpoints: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					150: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					428: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					600: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					991: {
						slidesPerView: 4,
						slidesPerGroup: 1,
					},
					1140: {
						slidesPerView: 5,
						slidesPerGroup: 1,
					},
					1500: {
						slidesPerView: 6,
						slidesPerGroup: 1,
					},
				},
			},
			BlogCards: {
				speed: 500,
				spaceBetween: 10,
				breakpoints: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					150: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					428: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					600: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					991: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					1140: {
						slidesPerView: 4,
						slidesPerGroup: 1,
					},
					1500: {
						slidesPerView: 4,
						slidesPerGroup: 1,
					},
				},
			},
			cooperation: {
				speed: 500,
				spaceBetween: 10,
				breakpoints: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					150: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					428: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					600: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					991: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					1140: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					1500: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
				},
			},
			bestReviews: {
				speed: 500,
				spaceBetween: 10,
				breakpoints: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					428: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					600: {
						slidesPerView: 2,
						slidesPerGroup: 1,
					},
					991: {
						slidesPerView: 3,
						slidesPerGroup: 1,
					},
					1500: {
						slidesPerView: 4,
						slidesPerGroup: 1,
					},
				},
			}
		}
	},
	reviews: {
		data: [
			{
				id: 1,
				userName: 'Marina Lagutenko',
				userRateValue: 5,
				userReview: 'Заказ сделала 23 декабря, понимаю что попала в новогодние праздники, но все-же, на изготовление по обещали 30 рабочих дней! Стулья приехали даже раньше, 1 февраля уже его получила на почте. На связь выходили, держали в курсе всех дней ожидания. Упакован хорошо, качество хорошее, очень удобный и практичный. Заказывала на подарок  очень понравился! Рекомендую'
			},
			{
				id: 2,
				userName: 'Надія Бондаренко',
				userRateValue: 5,
				userReview: 'Приобрела обалденно красивые стулья Миро, качеством очень довольна. Не знаю что говорят все остальные ноу меня пришло во время'
			},
			{
				id: 3,
				userName: 'Александра Суходуб',
				userRateValue: 5,
				userReview: 'Быстрая доставка, приятное обслуживание!!!'
			},
			{
				id: 4,
				userName: 'Виктория Малая',
				userRateValue: 5,
				userReview: 'Гарна якість, привітні працівники, отримала замовлення швидше ніж планувалось. Дякую за співпрацю! Процвітання вашій компанії!'
			},
			{
				id: 5,
				userName: 'Ілона Лебедь',
				userRateValue: 5,
				userReview: 'Замовляла у них них стільчики на новосілля, отримала вчасно,якість на найвищому рівні, ще краще ніж я очікувала дуже приємні менеджери,сервіс просто супер!!! Рекомендую усім❤️'
			},
			{
				id: 6,
				userName: 'Annushka Sit',
				userRateValue: 5,
				userReview: 'Norm'
			},
		]
	},
	instagram: {
		data: [
			// {
			// 	caption: '5 стільчиків чи 1 пуф Ми змогли поєднати! Пуф 5в1 - це 1 стильний та міцний пуф, який розкладається на 5 стільчиків Потрібно лише 20 секунд, щоб розібрати пуф та стільки ж, щоб зібрати!',
			// 	videoUrl: '/assets/images/instPost1.MP4',
			// 	link: 'https://www.instagram.com/reel/Cj7m5NDAcqf/?igshid=YmMyMTA2M2Y=',
			// 	__typename: 'GraphVideo'
			// },
			{
				caption: '5 стільчиків чи 1 пуф Ми змогли поєднати! Пуф 5в1 - це 1 стильний та міцний пуф, який розкладається на 5 стільчиків Потрібно лише 20 секунд, щоб розібрати пуф та стільки ж, щоб зібрати!',
				thumbnail: '/assets/images/instPost1.jpg',
				link: 'https://www.instagram.com/twin_sann/',
				__typename: 'GraphImage'
			},
			{
				caption: 'Пуф - трансформер 5 в 1😍 На свята чи просто на веселі вечори ви можете розкласти цей маленький пуфик аж на 5 стільців, уявляєте?)',
				thumbnail: '/assets/images/instPost2.webp',
				link: 'https://www.instagram.com/twin_sann/',
				__typename: 'GraphImage'
			},
			{
				caption: 'Lorem ipsum dolor sit amet',
				thumbnail: '/assets/images/instPost3.webp',
				link: 'https://www.instagram.com/twin_sann/',
				__typename: 'GraphImage'
			},
		]
	}
}