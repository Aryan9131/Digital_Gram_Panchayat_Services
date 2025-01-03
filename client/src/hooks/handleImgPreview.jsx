import { useState } from 'react'


export const useImgPreview = function () {
    console.log("useImgPreview called !")
    const [mediaUrl, setMediaUrl] = useState(null);
    const handleMediaChange = (docType, file, handleMediaUrlChange) => {
        console.log("handleMediaChange called -> "+docType + " "+JSON.stringify(file));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaUrl(reader.result);
                handleMediaUrlChange(docType, reader.result)
                console.log("reader.result --> " + reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const clearMedia = () => {
        setMediaUrl(null);
        setIsVideo(false);
    };
    const setMedia = (url) => {
        setMediaUrl(url)
    }
    return { handleMediaChange, mediaUrl, clearMedia, setMedia }
}

