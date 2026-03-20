import React, { useEffect, useState } from "react"
import styles from './AssetModalUploadPage.module.css';
import { FileDiskUploader } from "../../common/FileDiskUploader";
import { AssetModalBrowseModelsPage } from "./AssetModalBrowseModelsPage";

type PageState = 'fileSelect' | "detailsSelect";

export const AssetModalUploadPage = () => {
    const [pageState, setPageState] = useState<PageState>('fileSelect');
    const [fileName, setFileName] = useState<string|null>(null);
    const [blobUrl, setBlobUrl] = useState<string|null>(null);

    const handleFileUpload = (name: string, blobUrl: string) => {
        setFileName(name);
        setBlobUrl(blobUrl);

        setPageState('detailsSelect');
    }

    // TODO: Consider better blobURL management - at this moment the blobURL is revoked 
    // by FileDiskUploader - when another file is selected
    // and by this function when the AssetUploadPage is unmounted
    useEffect(() => {
        return () => {
            if (blobUrl)
                URL.revokeObjectURL(blobUrl);
        };
    }, [blobUrl]);
    
    return (<>
        {pageState === 'fileSelect' &&
            <FileDiskUploader onUploadComplete={handleFileUpload} />
        }
        {pageState === 'detailsSelect' && fileName && blobUrl &&
            <AssetModalBrowseModelsPage fileName={fileName} blobUrl={blobUrl} closeModal={()=>{}}/>
        }
    </>)
}