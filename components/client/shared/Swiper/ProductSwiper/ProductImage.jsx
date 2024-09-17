import Image from "next/image";
const ProductImage = ({url, alt}) => {

    return (
         <Image
            src={url}
            alt={alt || 'product image'}
            // width={500}
            // height={500}
            fill
            sizes={'100vw'}
            priority={true}
            // width={600}
            // height={600}
        />
    )
};

export default ProductImage;