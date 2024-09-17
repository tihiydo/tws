import SwiperComponent from "@/components/client/shared/Swiper/Swiper";
import classes from "./cooperation.module.scss";
import Link from "next/link";
import Image from "next/image";
import data from "../../Main/data";
import SeoBlock from "@/components/client/SeoBlock/SeoBlock";
import SchemaBlock from "@/components/client/SeoBlock/SchemaBlock";
import { useTranslations } from "next-intl";
import { LuLink2 } from "react-icons/lu";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SeoText from "@/components/client/SeoBlock/SeoText";

const Cooperation = ({ seo }) => {

  const t = useTranslations("Cooperation");
  const dbTranslate = useDynamicTranslate();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Співпраця",
      "item": `${process.env.NEXT_PUBLIC_API_URL}/info/cooperation`
    }]
}

const slides = [
  {
    id: "0",
    img: "/assets/images/cooperation/slide-1.png",
    title: t("slide1"),
  },
  {
    id: "1",
    img: "/assets/images/cooperation/slide-2.png",
    title: t("slide2"),
  },
  {
    id: "2",
    img: "/assets/images/cooperation/slide-4.png",
    title: t("slide3"),
  },
  {
    id: "3",
    img: "/assets/images/cooperation/slide-5.png",
    title: t("slide4"),
  },
];
  return (
    <>
      <SeoBlock
          title={!!seo && dbTranslate(seo, "title")}
          description={!!seo && dbTranslate(seo, "description")}
        ogImageUrl={`${process.env.NEXT_PUBLIC_API_URL}/assets/images/cooperation/slide-1.png`}
        ogImageWidth={400}
        ogImageHeight={500}
        ogImageAlt="About page photo"
			/>
      <SchemaBlock schema={schema} />
      <div className={classes.pageInfo} style={{ minHeight: "100vh" }}>
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
                <Image
                  src="/assets/icons/deal.png"
                  width={64}
                  height={64}
                  alt="handshake"
                />
              </div>
              <div className={classes.partTitle}>
                {
                  t("stepOneTitle")
                }
              </div>
            </div>
            <div className={classes.lower}>
              <div>
                {
                  t("stepOneDescr1")
                }
              </div>
              <div>
                {
                  t("stepOneDescr2")
                }
              </div>
              <div>
                {
                  t("stepOneDescr3")
                }
              </div>
              <div>
                {
                  t("stepOneDescr4")
                }
              </div>
              <div>
                {
                  t("stepOneDescr5")
                }
              </div>
            </div>
          </div>
          <div className={classes.part}>
            <div className={classes.upper}>
              <div className={classes.num}>
                <Image
                  src="/assets/icons/question.png"
                  width={64}
                  height={64}
                  alt="handshake"
                />
              </div>
              <div className={classes.partTitle}>
                {
                  t("stepTwoTitle")
                }
              </div>
            </div>
            <div className={classes.lower}>
              <div className={classes.link}>
                {
                  t("stepTwoDescr1")
                }
                <Link
                  href={
                    "https://docs.google.com/forms/d/1iiW6V_63PSskCbQfYI7qU6PLm9RBcaKlEhCbGuQXO7s/edit?hl=uk"
                  }
                  target='_blank'
                >
                  <LuLink2 style={{fontSize: "20px"}}/>
                </Link>
              </div>

              <div>
                {
                  t("stepTwoDescr2")
                } <br />{" "}
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  href="tel: 0930242708"
                >
                  {" "}
                  093 024 27 08
                </Link>{" "}
              </div>
            </div>
          </div>
          <div className={classes.part}>
            <div className={classes.upper}>
              <div className={classes.num}>
                <Image
                  src="/assets/images/iconAdvantages2.png"
                  width={64}
                  height={64}
                  alt="handshake"
                />
              </div>
              <div className={classes.partTitle}>
                {
                  t("stepThreeTitle")
                }
              </div>
            </div>
            <div className={classes.lower}>
              <div>
                {
                  t("stepThreeDescr1")
                }
              </div>
              <div>
                {
                  t("stepThreeDescr2")
                }
              </div>
              <div>
                {
                  t("stepThreeDescr3")
                }
              </div>
              <div>
                {
                  t("stepThreeDescr4")
                }
              </div>
              <div>
                {
                  t("stepThreeDescr5")
                }
              </div>
            </div>
          </div>
        </div>

        <div style={{textAlign: 'left'}}>
         {
            t("descr")
         }
          <br />
          <br />
          {
            t("withLove")
          }
        </div>
        <div className={classes.cooperation}>
          <h2>
            {
              t("result")
            }
          </h2>
          <SwiperComponent
            children={slides}
            type="cooperation"
            settings={data.swiper.settings.cooperation}
          />
        </div>


        <div className={classes.socialIcons}>
              <a href="https://instagram.com/twin_sann_cooperation?igshid=MzRlODBiNWFlZA==">
                <img src={'/assets/icons/instagram.svg'} alt="instargam icon"/>
              </a>
              <a href="tel:0930242708">
                            <img src={'/assets/icons/telegram.svg'} alt="telegram icon"/>
              </a>
                          <a href="tel:0930242708">
                            <img src={'/assets/icons/call.png'} alt="call icon"/>
              </a>
                      </div>

        <SeoText seo={seo} />
      </div>
    </>

    
  );
};

export default Cooperation;
