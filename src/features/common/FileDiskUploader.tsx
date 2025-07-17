import React, { ChangeEvent, useCallback, useState } from "react";

type UploadStatus = 'idle' | 'reading' | 'uploading' | 'success' | 'error'

type UploaderProps = {
    onUploadStart?: (fileName: string) => void,
    onUploadComplete?: (fileName: string, content: string) => void,
    onUploadError?: (error: string) => void;
}

export const FileDiskUploader = ({
    onUploadStart,
    onUploadComplete,
    onUploadError,
}: UploaderProps) => {
    const [file, setFile] = useState<File|null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [error, setError] = useState<string|null>(null);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setStatus('idle');

        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
            setError("Failed to load selected file");
        }
    }, []);

    const handleFileUpload = async () => {
        if (!file) {
            setError("No file selected");
            return;
        }

        setStatus('uploading');
        setError(null);

        if (onUploadStart) {
            onUploadStart(file.name);
        }

        try {
            const reader = new FileReader();

            const readPromise = new Promise<string|ArrayBuffer>((resolve, reject) => {
                reader.onload = () => {
                    if (reader.result) {
                        resolve(reader.result);
                    } else {
                        reject(new Error("FileReader result is null"));
                    }
                };
                reader.onerror = () => {
                    reject(new Error("Error occured while reading the file"));
                };
                reader.onabort = () => {
                    reject(new Error("File reading was aborted"));
                };

                reader.readAsDataURL(file);
            });

            const content = await readPromise.toString();
            setStatus('success');
            setError(null);

            if (onUploadComplete) { 
                onUploadComplete(file.name, content);
            }

        } catch (err: any) {
            console.error("File reading failed: ", err);
            setError(err.message || 'An error occured during file processing')

            if (onUploadError) {
                onUploadError(err.message || "An unknown error occured");
            }
        }
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

        {status === 'success' &&
        <p>Upload successful</p>}

        {status === 'error' &&
        <p>Upload failed: {error}</p>}
        
    </div>
}