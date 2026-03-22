import React, { useEffect, useState } from "react"
import styles from './AssetModalBrowseModelsPage.module.css'

import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";
import { ListedMeshMetadataGLTF, MaterialMetadataGLTF, useParseGLTF } from "../../sideMenu/hooks/useParseGLTF";
import { UnwrappedWrapper } from "../../../models/assets/meshes/Unwrapped";
import { UnwrappedAssetWrapper } from "../../../models/assets/Asset";

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

        // TODO: next step - export these geometry/material data into separate blobUrl that will be lighter
        // TODO: next step - consider -  if user selects entire file - skip that loading/uploading
        var testResult = loadGLTF(blobUrl, selectedMesh.geometry, selectedMesh.materials)
        .then( loaded => {
            console.log({geometry: loaded.geometry})
            console.log({materials: loaded.materials})
            // TODO: export geometry to the blobURL here
            // TODO: decide how to handle materials here

            // TODO: create new asset with meshURL here:
            const newAsset = { meshUrl: "BlobURLHere"} as Partial<UnwrappedAssetWrapper>

            addAssetUnwrapped(newAsset);
        });
    }

    const renderMeshTable = (available: ListedMeshMetadataGLTF[]) => {
        return (
            available.map( (entry, index) => {
                const mesh = entry.geometry;
                const isOdd = index%2 === 1
                const isSelected = mesh.id === selectedMesh?.geometry.id

                return (<tr key={mesh.id} onClick={() => handleMeshSelection(entry)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                    <td className={styles.tableCell}>{mesh.name}</td>
                </tr>);
            })
        );
    }

    const renderMaterialsTable = (selected: ListedMeshMetadataGLTF | null) => {
        return (
            selected?.materials.map( (material, index) => {
                const isOdd = index%2 === 1
                const isSelected = material.id === selectedMaterial?.id
                return (<tr key={material.id} onClick={() => handleMaterialSelection(material)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                    <td className={styles.tableCell}>{material.name}</td>
                    <td className={styles.tableCell}>{material.type}</td>
                </tr>);
            })
        )
    }


    return (
    <div className={styles.modalContents}>
        <div className={styles.tablesContainer}>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead><td><b>Mesh</b></td></thead>
                    <tbody className={styles.tableBody}>
                        {renderMeshTable(meshes)}
                    </tbody>
                </table>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead><td><b>Material</b></td><td><b>Type</b></td></thead>
                    <tbody className={styles.tableBody}>
                        {renderMaterialsTable(selectedMesh)}
                    </tbody>
                </table>
            </div>

        </div>
        <button onClick={handleImportTrigger}>Import</button>
    </div>
    )
}