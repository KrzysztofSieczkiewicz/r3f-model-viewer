import React, { useEffect, useState } from "react"
import styles from './AssetModalBrowseModelsPage.module.css'

import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { ListedMeshMetadataGLTF, MaterialMetadataGLTF, useParseGLTF } from "../../sideMenu/hooks/useParseGLTF";

type Props = {
    fileName: string;
    blobUrl: string
    closeModal: () => void;
}

export const AssetModalBrowseModelsPage = ({fileName, blobUrl, closeModal}: Props) => {

    const { addAssetUnwrapped } = useSceneObjectsContext();

    const [meshes, setMeshes] = useState<ListedMeshMetadataGLTF[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [ selectedMesh, setSelectedMesh ] = useState<ListedMeshMetadataGLTF|null>(null);
    const [ selectedMaterial, setSelectedMaterial ] = useState<MaterialMetadataGLTF|null>(null);

    const { parseGLTF, loadGLTF } = useParseGLTF();

    useEffect( () => {
        setIsLoading(true);
        setError(null);

        parseGLTF(blobUrl)
            .then( (loadedMeshes) => {
                console.log({loadedMeshes})
                setMeshes(loadedMeshes);
                setIsLoading(false);
            })
            .catch( err => {
                console.error("Failed to read data from the GLTF file: ", err);
                setError("Failed to read contents of the file.")
                setIsLoading(false);
            });
    }, [blobUrl])

    const handleMeshSelection = (selected: ListedMeshMetadataGLTF) => {
        if (selected.geometry.id !== selectedMesh?.geometry.id) {
            setSelectedMesh(selected)
            setSelectedMaterial(selected.materials[0])
            console.log({selected})
        } else {
            setSelectedMesh(null)
            setSelectedMaterial(null)
        }
    }

    const handleMaterialSelection = (material: MaterialMetadataGLTF) => {
        if (material.id !== selectedMaterial?.id) {
            setSelectedMaterial(material)
        } else {
            setSelectedMaterial(null)
        }
    }

    const handleImportTrigger = () => {
        if (!selectedMesh) return;

        // TODO FIRST: rework DTOs into more reusable chunks and combinations, 
        // regarding meshes AND materials -> there is a lot of nesting with type/properties - flatten or make reusable
        // regarding materials -> all of them are "editable" - importing hook is safely parsing them and returning THREE.Material (you can access .type safely to determine wchich type of THREE.Material it is)
        // so you can safely just add material and depending on material type - present different properties and maps
        // double check if you cannot treat props as array of key-value pairs instead of typing each as variable (though this is also acceptable)

        // TODO SECOND: determine how to store materials for future upload to BE (Mesh is straightforward with single blobUrl, though you might double check the security of allowing that kind of upload)
        // Materials might be more tricky as these contain multiple maps (so probably array of id/blobURL pairs instead)
        
        // TODO: THIRD: clean up unused method and classes, it's getting crowded and unclear

        // TODO: the rest
        // TODO: next step - export these geometry/material data into separate blobUrl that will be lighter
        // check if already done via SceneObjectsContext.addAssetUnwrapped (it's calling createPersistentBlobUrl for geometry)
        // TODO: next step - consider -  if user selects entire file - skip that loading/uploading
        // TODO: reinstate error messaging, proper waiting, loading and buffering info and icons
        var testResult = loadGLTF(blobUrl, selectedMesh.geometry, selectedMesh.materials)
        .then( loaded => {
            console.log({geometry: loaded.geometry})
            console.log({materials: loaded.materials})

            if (loaded.materials) {
                var test = loaded.materials[0].type
                console.log({loadedMaterialType: test})
            }
                

            addAssetUnwrapped(loaded.geometry);
        });
    }

    const renderMeshTable = (available: ListedMeshMetadataGLTF[]) => {
        return (
            <table className={styles.table}>
                <thead><td><b>Mesh</b></td></thead>
                <tbody className={styles.tableBody}>
                    {available.map( (entry, index) => {
                        const mesh = entry.geometry;
                        const isOdd = index%2 === 1
                        const isSelected = mesh.id === selectedMesh?.geometry.id
                        return (
                            <tr key={mesh.id} onClick={() => handleMeshSelection(entry)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                                <td className={styles.tableCell}>{mesh.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    const renderMaterialsTable = (selected: ListedMeshMetadataGLTF | null) => {
        return (
            <table className={styles.table}>
                <thead><td><b>Material</b></td><td><b>Type</b></td></thead>
                <tbody className={styles.tableBody}>
                    {selected?.materials.map( (material, index) => {
                        const isOdd = index%2 === 1
                        const isSelected = material.id === selectedMaterial?.id
                        return (
                            <tr key={material.id} onClick={() => handleMaterialSelection(material)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                                <td className={styles.tableCell}>{material.name}</td>
                                <td className={styles.tableCell}>{material.type}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }


    return (
    <div className={styles.modalContents}>
        <div className={styles.tablesContainer}>

            <div className={styles.tableContainer}>
                {renderMeshTable(meshes)}
            </div>

            <div className={styles.tableContainer}>
                {renderMaterialsTable(selectedMesh)}
            </div>

        </div>
        <button onClick={handleImportTrigger}>Import</button>
    </div>
    )
}