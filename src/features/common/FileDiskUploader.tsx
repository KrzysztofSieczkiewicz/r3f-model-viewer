import React, { ChangeEvent, useCallback, useRef, useState } from "react";

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

    const lastUrlRef = useRef<string | null>(null);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setStatus('idle');

        if (e.target.files && e.target.files[0]) {
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

        if (lastUrlRef.current) { // Revoke last URL if exists
            URL.revokeObjectURL(lastUrlRef.current);
        }

        setStatus('uploading');
        setError(null);

        onUploadStart?.(file.name);

        try {
            const blobUrl = URL.createObjectURL(file);
            lastUrlRef.current = blobUrl;

            setStatus('success');
            setError(null);

            onUploadComplete?.(file.name, blobUrl);

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