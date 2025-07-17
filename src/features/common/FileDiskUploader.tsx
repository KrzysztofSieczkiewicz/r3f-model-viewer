import React, { ChangeEvent, useCallback, useState } from "react";

type UploadStatus = 'idle' | 'reading' | 'uploading' | 'success' | 'error'

export const FileDiskUploader = () => {
    const [file, setFile] = useState<File|null>(null);
    const [fileContents, setFileContents] = useState<string|null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [error, setError] = useState<string|null>(null);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setStatus('idle');
        setFileContents(null);

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
            setFileContents(content);
            setStatus('success');
            setError(null);

        } catch (err: any) {
            console.error("File reading failed: ", err);
            setError(err.message || 'An error occured during file processing')
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
        <p>Upload failed</p>}
        
    </div>
}