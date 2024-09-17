/** @type {import('next').NextConfig} */
const nextConfig = {

    skipTrailingSlashRedirect: true,
    trailingSlash: false,

    sassOptions: {
        prependData: `@import "styles/variables.scss"; @import "styles/mixins.scss";`
    },
    images: {
        domains: ['twinsann.com', 'epztumesqkzxdiftmdpj.supabase.co', 'cdn-icons-png.flaticon.com'],
    },
    i18n: {
        locales: ['uk', 'ru'],
        defaultLocale: 'uk',
        localeDetection: false
    },
    async redirects() {
        return [
            {
                source: '/categories/:path*/',
                destination: '/categories/:path*',
                statusCode: 301,
            },

            {
                "source": "/products/pufyk_tiffani_60kh40",
                "destination": "/products/pufyk-tiffani-60kh40-a6746f63-9e8d-492d-a558-0444c455dd91",
                "statusCode": 301
            },
            {
                "source": "/products/liuks_yakist_za_tsinoiu__ekonomu",
                "destination": "/products/liuks-iakist-za-tsinoiu--ekonomu-851ca133-f8ab-4798-addc-b3e7740af341",
                "statusCode": 301
            },
            {
                "source": "/products/puf_6v1_zi_stolykom_",
                "destination": "/products/puf-6v1-zi-stolykom-7874c4f4-1c92-498d-98de-2ddd06efe8b3",
                "statusCode": 301
            },
            {
                "source": "/products/liuks__yakist_za__tsinoiu__ekonomu",
                "destination": "/products/liuks--iakist-za--tsinoiu--ekonomu-d52e67c5-ec25-4904-bffe-77f1ec7fa86c",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_preston_140kh80",
                "destination": "/products/dyvan-preston-140kh80-fb1c275f-b00e-4cd5-a8ba-5bd2caa99728",
                "statusCode": 301
            },
            {
                "source": "/products/krislo__klaud",
                "destination": "/products/krislo--klaud-d5d466bb-a619-40c7-bb13-0e42e4f2fed8",
                "statusCode": 301
            },
            {
                "source": "/products/puf_metal_|_banketka_dlia_vzuttia_60sm",
                "destination": "/products/puf-metal--banketka-dlia-vzuttia-60sm-c51f27b5-ab2e-4701-ab99-94f6604c26d8",
                "statusCode": 301
            },
            {
                "source": "/products/krislo___klaud",
                "destination": "/products/krislo---klaud-2e7cd043-c046-4bf8-9cbc-85ff8dfbedd8",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1_zi_stolykom_liuks",
                "destination": "/products/puf-5v1-zi-stolykom-liuks-4e6e5e61-3336-47f5-8b05-1be0119c61a7",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-_miro_|__derevo",
                "destination": "/products/stilets-miakyi-zi-spynkoiu---miro---derevo-4201db8a-f3ff-47bc-94e4-3ad0c8b9ffb9",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_milano__|_derevo",
                "destination": "/products/stilets-barnyi---milano---derevo-f5d9accd-114b-4f26-8654-ac679e83d712",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-_miro",
                "destination": "/products/stilets-miakyi-zi-spynkoiu---miro-5708c98c-5cf7-474f-a217-f9455de3209b",
                "statusCode": 301
            },
            {
                "source": "/products/puf_metal_|_banketka_dlia_vzuttia_100sm",
                "destination": "/products/puf-metal--banketka-dlia-vzuttia-100sm-76bd8cb1-9e71-4831-93ad-73540a5578f8",
                "statusCode": 301
            },
            {
                "source": "/products/_puf_metal_|_banketka_dlia_vzuttia_80sm",
                "destination": "/products/puf-metal--banketka-dlia-vzuttia-80sm-9f9950e9-53e0-4de5-8110-f0cd456d905b",
                "statusCode": 301
            },
            {
                "source": "/products/komplekt__dlia__domu",
                "destination": "/products/komplekt--dlia--domu-0f3b281f-67aa-4a6d-9002-97ddd27c55b3",
                "statusCode": 301
            },
            {
                "source": "/products/banketka_dlia_vzuttia_80sm",
                "destination": "/products/banketka-dlia-vzuttia-80sm-47f54db1-9aa2-4607-b315-8c608bc7a3c0",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1_zi__stolykom_ekonom",
                "destination": "/products/puf-5v1-zi--stolykom-ekonom-04d81236-f2c9-4489-876c-de6e8e91ee9c",
                "statusCode": 301
            },
            {
                "source": "/products/stil_luna",
                "destination": "/products/stil-luna-e60fdb5f-f280-48c7-80fb-8c26b4932197",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1_zi_stolykom_top",
                "destination": "/products/puf-5v1-zi-stolykom-top-9eb7f219-5880-4960-8367-01e6fa38133c",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_preston_140_kh_80_",
                "destination": "/products/dyvan-preston-140-kh-80-d280dc51-37ea-4e32-aaca-0a56e0054cbf",
                "statusCode": 301
            },
            {
                "source": "/products/stil_pluton",
                "destination": "/products/stil-pluton-bdce8194-58dc-414c-80db-2afbe7da5bfc",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_preston_80_kh_80",
                "destination": "/products/dyvan-preston-80-kh-80-5ecc2e47-a405-489a-ba4e-5db7ede7fe0a",
                "statusCode": 301
            },
            {
                "source": "/products/napivkpislo_miake_zi_spynkoiu_-_matis_",
                "destination": "/products/napivkpislo-miake-zi-spynkoiu---matis-2604d966-6bb9-494e-9ee5-b9a12abcb74c",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_mark",
                "destination": "/products/stilets-barnyi---mark-80b8b6e3-f721-4bc7-b2a8-49dc4e9edfef",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-_mark_|_derevo",
                "destination": "/products/stilets-miakyi-zi-spynkoiu---mark--derevo-0c91eb91-eac6-44c4-adb3-5f8671c84dde",
                "statusCode": 301
            },
            {
                "source": "/products/napivkrislo_miake_zi_spynkoiu_-_matis_|_derevo",
                "destination": "/products/napivkrislo-miake-zi-spynkoiu---matis--derevo-e84c06bb-8bb1-4a07-96b7-3181f3a47caa",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_miro",
                "destination": "/products/stilets-barnyi---miro-2455deb6-8aa4-4633-bf91-528f4ea75b98",
                "statusCode": 301
            },
            {
                "source": "/products/stil_argan",
                "destination": "/products/stil-argan-06029279-bbee-43f8-acaa-bfe08144f0a8",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_miro_|_derevo",
                "destination": "/products/stilets-barnyi---miro--derevo-c0dc2a7f-1087-4fa0-a177-b569780c9d6e",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_matis",
                "destination": "/products/stilets-barnyi---matis-0ca14beb-cc04-4d96-8a81-bfbedc61f351",
                "statusCode": 301
            },
            {
                "source": "/products/polychka_dlia_vzuttia_60sm",
                "destination": "/products/polychka-dlia-vzuttia-60sm-5dd6031a-b3aa-4d53-830c-bbbd10fd80b5",
                "statusCode": 301
            },
            {
                "source": "/products/banketka_dlia_vzuttia_60sm",
                "destination": "/products/banketka-dlia-vzuttia-60sm-00f03371-cecc-4543-a0a2-f98a19b843b9",
                "statusCode": 301
            },
            {
                "source": "/products/napivkrislo_miake_zi_spynkoiu_-_marsel_|_derevo",
                "destination": "/products/napivkrislo-miake-zi-spynkoiu---marsel--derevo-1be18789-2e05-40eb-9040-0c7183d838b5",
                "statusCode": 301
            },
            {
                "source": "/products/komplekt_dlia_kukhni",
                "destination": "/products/komplekt-dlia-kukhni-6f6f35df-f7c2-404e-ad0e-e981f45ef31a",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-_mark",
                "destination": "/products/stilets-miakyi-zi-spynkoiu---mark-a536a235-d766-481c-81c9-0993240d037c",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_matis_|_derevo",
                "destination": "/products/stilets-barnyi---matis--derevo-cb8ccb0e-6545-430d-a40a-6e8dbc54e059",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-__miro",
                "destination": "/products/stilets-miakyi-zi-spynkoiu----miro-a9cee6db-610e-499a-a52d-b4529fdf2877",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_napivbarnyi_-_milano__|_derevo",
                "destination": "/products/stilets-napivbarnyi---milano---derevo-3551be08-59ae-4bd2-9d14-7daa67ee97b0",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_napivbarnyi_-_miro_|_derevo",
                "destination": "/products/stilets-napivbarnyi---miro--derevo-5f80bf36-e1aa-40bc-935e-28e535874e7c",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_marsel_|_metal",
                "destination": "/products/stilets-barnyi---marsel--metal-638900bb-4769-4c8a-93f1-6fdcf5d7bea5",
                "statusCode": 301
            },
            {
                "source": "/products/napivkrislo_miake_zi_spynkoiu_-_marsel",
                "destination": "/products/napivkrislo-miake-zi-spynkoiu---marsel-232f62d1-f75f-44a8-9334-6fbeafac403d",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_marsel_|_derevo",
                "destination": "/products/stilets-barnyi---marsel--derevo-75439d24-f5e6-45ae-95be-6f78e9c600ec",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_napivbarnyi_-_matis_|_derevo",
                "destination": "/products/stilets-napivbarnyi---matis--derevo-9a8dd746-a2d3-4c1a-a6cd-eaabe5e4e0c4",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_napivbarnyi_-_marsel_|_derevo",
                "destination": "/products/stilets-napivbarnyi---marsel--derevo-3bda91de-3e91-4eb5-bfdf-7786ae0af619",
                "statusCode": 301
            },
            {
                "source": "/products/komplekt__dlia__kukhni",
                "destination": "/products/komplekt--dlia--kukhni-88ca485f-0c15-4a79-8bfa-f04df1ef820e",
                "statusCode": 301
            },
            {
                "source": "/products/banketka_dlia_vzuttia_100sm",
                "destination": "/products/banketka-dlia-vzuttia-100sm-74928e27-9d01-4aeb-83cd-eab60ce68377",
                "statusCode": 301
            },
            {
                "source": "/products/komplekt_dlia_domu_boston_|_matis",
                "destination": "/products/komplekt-dlia-domu-boston--matis-c2522d51-7d1f-4126-8073-839a392f540c",
                "statusCode": 301
            },
            {
                "source": "/products/stil_uran",
                "destination": "/products/stil-uran-a7cfb372-636b-44aa-a8ba-68d8e864694f",
                "statusCode": 301
            },
            {
                "source": "/products/polychka_dlia_vzuttia_100sm",
                "destination": "/products/polychka-dlia-vzuttia-100sm-d76599cf-3b88-47ad-bcdd-9da0c537a0b4",
                "statusCode": 301
            },
            {
                "source": "/products/komplekt__dlia_domu",
                "destination": "/products/komplekt--dlia-domu-e11fbe27-189a-4696-a26a-11121f7c7877",
                "statusCode": 301
            },
            {
                "source": "/products/polychka_dlia_vzuttia_80sm",
                "destination": "/products/polychka-dlia-vzuttia-80sm-9339262f-83eb-47d0-8e49-1ba7f04f2771",
                "statusCode": 301
            },
            {
                "source": "/products/miaka_stinka_z_hachkamy__80kh130",
                "destination": "/products/miaka-stinka-z-hachkamy--80kh130-6c8c4cc7-76c8-40fc-9e1e-53d41eff247a",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1__|_metal_ekonom_",
                "destination": "/products/puf-5v1---metal-ekonom-744c32f0-bc99-4e45-944a-ea51719a4333",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1._|_metal_top",
                "destination": "/products/puf-5v1.--metal-top-85d1dbdc-6ee7-4a5a-99e8-251a4d4c6d53",
                "statusCode": 301
            },
            {
                "source": "/products/stil_xenon",
                "destination": "/products/stil-xenon-858306fa-e061-4792-9ac7-2c02df47a30b",
                "statusCode": 301
            },
            {
                "source": "/products/krislo_klaud",
                "destination": "/products/krislo-klaud-92a23c03-d74e-4187-a285-148d5dd4c199",
                "statusCode": 301
            },
            {
                "source": "/products/stil_kruhlyi",
                "destination": "/products/stil-kruhlyi-75c0853e-8166-4f45-8048-6904275ccebe",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_preston_200_kh_80",
                "destination": "/products/dyvan-preston-200-kh-80-a2f67e76-9b9a-4654-ab32-442432850205",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_preston_170_kh_80",
                "destination": "/products/dyvan-preston-170-kh-80-4c5c7384-d53a-4e30-9bf7-d65a69e9085e",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1_|_metal_standart",
                "destination": "/products/puf-5v1--metal-standart-4143a461-be1e-4bee-8503-901c2b0c678c",
                "statusCode": 301
            },
            {
                "source": "/products/pufyk_tiffani_40kh40",
                "destination": "/products/pufyk-tiffani-40kh40-ccd402ae-941e-4ffa-82f3-068f3c72497f",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_miakyi_zi_spynkoiu_-_miro_|_derevo",
                "destination": "/products/stilets-miakyi-zi-spynkoiu---miro--derevo-b99e61ed-14cc-447a-8076-0c0e0f21d0bb",
                "statusCode": 301
            },
            {
                "source": "/products/puf__liuks_yakosti_po_tsini_ekonomu",
                "destination": "/products/puf--liuks-iakosti-po-tsini-ekonomu-e7f8475d-5a50-4a9a-8afe-25813358c35b",
                "statusCode": 301
            },
            {
                "source": "/products/pufyk_tiffani_80kh40",
                "destination": "/products/pufyk-tiffani-80kh40-5a0c0d67-1f21-4838-a80f-c08ef57f1eed",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_napivbarnyi_-_mark_|_derevo",
                "destination": "/products/stilets-napivbarnyi---mark--derevo-69ae65fd-5075-42ae-ad94-ac2256014c03",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan__cloud_",
                "destination": "/products/dyvan--cloud-75763b1c-64ea-47e2-a46a-07e8960a0266",
                "statusCode": 301
            },
            {
                "source": "/products/puf_5v1_zi_stolykom_standart",
                "destination": "/products/puf-5v1-zi-stolykom-standart-e21c84bc-5e4d-4d1c-979d-9911f12171a7",
                "statusCode": 301
            },
            {
                "source": "/products/dyvan_cloud_",
                "destination": "/products/dyvan-cloud-29f20c13-08b8-4f43-8e61-8c41dc7fcbeb",
                "statusCode": 301
            },
            {
                "source": "/products/pufyk_motti",
                "destination": "/products/pufyk-motti-ec64c168-4b07-406d-aa57-e014c7ed25e2",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_mark_|_derevo",
                "destination": "/products/stilets-barnyi---mark--derevo-a3f1fd38-79cb-41ff-8207-a458a174367e",
                "statusCode": 301
            },
            {
                "source": "/products/stilets_barnyi_-_milano",
                "destination": "/products/stilets-barnyi---milano-57db8cca-5db3-4b38-b22a-31942b27d86d",
                "statusCode": 301
            },
            {
                "source": "/products/napivkrislo_miake_zi_spynkoiu_-_milano__|_derevo",
                "destination": "/products/napivkrislo-miake-zi-spynkoiu---milano---derevo-feee58aa-9b17-482f-a049-be6a01eff722",
                "statusCode": 301
            },
            {
                "source": "/products/napivkrislo_miake_zi_spynkoiu_-_milano",
                "destination": "/products/napivkrislo-miake-zi-spynkoiu---milano-a7ca825d-50ef-4026-a2d1-8608c31a0cd5",
                "statusCode": 301
            },
            {
                "source": "/products/liuks_yakist_za_tsinoiu_ekonomu",
                "destination": "/products/liuks-iakist-za-tsinoiu-ekonomu-647846d9-8cdf-486b-aac3-63d29d8ed200",
                "statusCode": 301
            },
            {
                "source": "/products/puf_liuks_za_tsinoiu_ekonomu",
                "destination": "/products/puf-liuks-za-tsinoiu-ekonomu-42e455db-1433-495b-a6a5-8b0a7cd833ab",
                "statusCode": 301
            },
            {
                "source": "/categories/banketky/polychky_dlia_vzuttia",
                "destination": "/categories/banketky/polychky-dlia-vzuttia",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/pufy_zi_stolykom",
                "destination": "/categories/pufy/pufy-zi-stolykom",
                "statusCode": 301
            },
            {
                "source": "/categories/stiltsi/krisla_\|_napivkrisla",
                "destination": "/categories/stiltsi/krisla-|-napivkrisla",
                "statusCode": 301
            },
            {
                "source": "/categories/stiltsi/obidni_stiltsi",
                "destination": "/categories/stiltsi/obidni-stiltsi",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/malenki_pufyky",
                "destination": "/categories/pufy/malenki-pufy",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/pufy_transformery",
                "destination": "/categories/pufy/pufy-transformery",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/pufy_5v1",
                "destination": "/categories/pufy/pufy-5v1",
                "statusCode": 301
            },
            {
                "source": "/blog/pufy-transformery",
                "destination": "/categories/pufy/pufy-transformery",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/puf_6v1",
                "destination": "/categories/pufy/puf-6v1",
                "statusCode": 301
            },
            {
                "source": "/blog/pufy-5-v-1",
                "destination": "/categories/pufy/pufy-5v1",
                "statusCode": 301
            },
            {
                "source": "/categories/pufy/pufy_5v1_zi_stolykom",
                "destination": "/categories/pufy/pufy-5v1",
                "statusCode": 301
            },
            {
                "source": "/categories/tables",
                "destination": "/categories/stoly",
                "statusCode": 301
            },
            {
                "source": "/categories/puf_6v1",
                "destination": "/categories/pufy/puf-6v1",
                "statusCode": 301
            },
            {
                "source": "/categories/malenki_pufyky",
                "destination": "/categories/pufy/malenki-pufy",
                "statusCode": 301
            },
            {
                "source": "/categories/polychky_dlia_vzuttia",
                "destination": "/categories/banketky/polychky_dlia_vzuttia",
                "statusCode": 301
            }
        ]
    }
}

module.exports = nextConfig
