import { useLoader } from "@react-three/fiber";



type fileFormat = 'gltf' | 'glb' | 'fbx' | 'image' | null;

// TODO: change to "getFileLoader" and make it return proper loader depending on filetype
const recognizeFileFormat = (fileName: string): fileFormat => {
    const parts = fileName.split( '.');
    const extension = parts[parts.length-1]
    
    switch(extension) {
        case 'gltf':
            return 'gltf';
        case 'glb':
            return 'glb';
        case 'fbx':
            return 'fbx';
        default:
            console.error('Failed to recognize the file format for file: ', fileName);
            return null;
    }
}

export const useLoad = () => {
}