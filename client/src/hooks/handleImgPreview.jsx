import { useState } from 'react'


export const useImgPreview = function () {
    const [mediaUrl, setMediaUrl] = useState(null);
    const handleMediaChange = (docType, file, handleMediaUrlChange) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaUrl(reader.result);
                handleMediaUrlChange(docType, reader.result)
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

