import React, { ChangeEvent, useState } from "react"

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export const FileUploader = () => {
    const [file, setFile] = useState<File|null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleFileUpload = async () => {
        if (!file) return;

        setStatus('uploading');

        const formData = new FormData();
        formData.append('file', file)

        try {
            const response = await fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            });
            console.log(await response.json());
        } catch (e) {
            console.error(e);
        };
    }


    return <div>
        <input type="file" onChange={handleFileChange}/>
        {file &&
            <div>
                <p>File name: {file.name}</p>
                <p>Size: {(file.size / 1024).toFixed(2)}KB</p>
                <p>Type: {file.type}</p>
            </div>
        }
        {file && status !== 'uploading' &&
            <button onClick={handleFileUpload}>Upload</button>
        }
    </div>
}