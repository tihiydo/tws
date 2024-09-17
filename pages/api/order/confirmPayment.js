import HmacMD5 from "crypto-js/hmac-md5";
import prisma from "@/prisma/client";
export default async function handler(req, res) {
    try {
        const method = req.method;
        if (method === 'POST') {
            // let stringified = JSON.stringify(req.body).slice(2, -5)


            const body = JSON.parse(Object.keys(req.body)[0]);

            let changedStatus = false

            if (body.transactionStatus === 'Approved') {
                await prisma.order.update({
                    where: {
                        id: body.orderReference,
                    },
                    data: {
                        payment_type: 'verificated',
                    },
                })
                changedStatus = true
            }

            const timestampMillis = Date.now();
            const timestampSeconds = Math.floor(timestampMillis / 1000);

            const merchantSecretKey = '1e866388930e0556e88234d502dc502e85fd982b';
            const orderReference = body.orderReference;
            const status = 'accept';
            const time = timestampSeconds;

            const str = `${orderReference};${status};${time}`;

            const signature = HmacMD5(str, merchantSecretKey).toString();



            res.status(changedStatus ? 201 : 200).json({
                orderReference,
                status,
                time,
                signature
            })

        } else {
            res.status(500).json({message: 'Unsupported method'})
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message})
    }
}