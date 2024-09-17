import prisma from "@/prisma/client"


export default async function handler(req, res) {

    const body = JSON.parse(req.body)

    try {
        
        const resPopup = await prisma.Popup.update({
            where: {
                id: body.id
            },
            data: {
                text: body.text,
                text_ru: body?.text_ru,
                image: body.image
            }
        })
        res.status(200).json({ message: 'good', data: resPopup })
    } catch (error) {
        res.status(400).json({ message: 'ne good', error: error })
    }

  }
  