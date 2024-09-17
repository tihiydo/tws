import { TextBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/TextBlock";
import { ImageBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/ImageBlock";
import { TitleBlock } from "@/components/adminpanel/pages/Blog/contentBlock/blocks/TitleBlock";


const ContentBlock = ( props ) => {
	const Block = {
		"title": <TitleBlock {...props} />,
		"text": <TextBlock {...props} />,
		"image": <ImageBlock {...props} />
	}
	return (
		<>
			{
				Block[props.type]
			}
		</>
	)
}

export default ContentBlock;