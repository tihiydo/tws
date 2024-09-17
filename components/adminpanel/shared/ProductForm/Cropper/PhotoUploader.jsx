import React, {useEffect, useState} from 'react';
import classes from "./cropper.module.scss";
import Image from "next/image";
import FileUploader from "@/components/adminpanel/shared/UI/FileUploader/FileUploader";
import {IoMdClose} from "react-icons/io";

const PhotoUploader = ({file, setFile, width = 290, height = 290, placeholder = '/assets/icons/image_uploader_plus.svg'}) => {
    const [image, setImage] = useState(null);
    const handleFileUpload = (file) => {
        setFile(file);
    }

    useEffect(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl)
        } else {
            setImage(null)
        }
    }, [file])

    return (
        <div style={{width, height}}>

            {image
                ?
                <div
                    className={classes.uploadImage}
                >
                    <div className={classes.overlay}>
                    </div>
                    <Image src={image} alt={'uploader'} width={width} height={height} />
                    <div
                        className={classes.close}
                        onClick={(e) => {
                            e.stopPropagation()
                            setImage(null)
                            setFile(null)
                        }}
                    >
                        <IoMdClose size={width > 200 ? '30px' : '20px'} />
                    </div>
                </div>
                :
                <FileUploader style={{width: width, height: height}} className={classes.uploadImage} handleFile={handleFileUpload}>
                    <Image src={placeholder} alt={'uploader'} width={width} height={height} />
                </FileUploader>
            }
        </div>
    );
};

export default PhotoUploader;