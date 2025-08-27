import React, { useEffect, useState } from "react"
import styles from './AssetModalUploadPage.module.css';
import { FileDiskUploader } from "../../common/FileDiskUploader";
import { AssetModalBrowseModelsPage } from "./AssetModalBrowseModelsPage";

type PageState = 'fileSelect' | "detailsSelect";

export const AssetModalUploadPage = () => {
    const [pageState, setPageState] = useState<PageState>('fileSelect');
    const [fileName, setFileName] = useState<string|null>(null);
    const [fileContents, setFileContents] = useState<string|null>(null);

    const handleFileUpload = (name: string, contents: string) => {
        setFileName(name);
        setFileContents(contents);

        console.log({name})

        setPageState('detailsSelect');
    }
    
    return (<>
        {pageState === 'fileSelect' &&
            <FileDiskUploader onUploadComplete={handleFileUpload} />
        }
        {pageState === 'detailsSelect' && fileContents &&
            <AssetModalBrowseModelsPage src={fileContents} closeModal={()=>{}}/>
        }
        
    </>)
}