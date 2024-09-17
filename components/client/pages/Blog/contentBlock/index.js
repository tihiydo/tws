import { TextBlock } from "./blocks/TextBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TitleBlock } from "./blocks/TitleBlock";

const ContentBlock = ( props ) => {
	const Block = {
		"title": <TitleBlock {...props} />,
		"text": <TextBlock {...props} />,
		"image": <ImageBlock {...props} />
	}
	return (
		<section>
			{
				Block[props.type]
			}
		</section>
	)
}

export default ContentBlock;