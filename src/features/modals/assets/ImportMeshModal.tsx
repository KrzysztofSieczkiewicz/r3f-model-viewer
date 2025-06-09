import React, { useEffect, useState } from "react"
import styles from './ImportMeshModal.module.css'

import { ListedMetadataGLTF, MaterialMetadataGLTF, useImportGLTF } from "../../sideMenu/hooks/useImportGLTF"
import { useSceneObjectsContext } from "../../common/contexts/SceneObjectsContext";

type Props = {
    src: string;
    closeModal: () => void;
}

export const ImportMeshModal = ({src, closeModal}: Props) => {

    const { addAssetUnwrapped } = useSceneObjectsContext();

    const [meshes, setMeshes] = useState<ListedMetadataGLTF[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [ selectedMesh, setSelectedMesh ] = useState<ListedMetadataGLTF|null>(null);
    const [ selectedMaterial, setSelectedMaterial ] = useState<MaterialMetadataGLTF|null>(null);

    // TODO: Check why it executes twice
    const { getContents, loadContents } =  useImportGLTF()

    useEffect( () => {
        setIsLoading(true);
        setError(null);

        getContents(src)
            .then( (loadedMeshes) => {
                setMeshes(loadedMeshes.meshes);
                setIsLoading(false);
            })
            .catch( err => {
                console.error("Failed to read data from the GLTF file: ", err);
                setError("Failed to read contents of the file.")
                setIsLoading(false);
            });
    }, [src])

    const handleMeshSelection = (selected: ListedMetadataGLTF) => {
        if (selected.mesh.id !== selectedMesh?.mesh.id) {
            setSelectedMesh(selected)
            setSelectedMaterial(selected.materials[0])
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

        const change = {
            mesh: {
                src: src,
                geometries: [selectedMesh.mesh]
            }
        }
        addAssetUnwrapped(change);
    }

    const renderMeshTable = (available: ListedMetadataGLTF[]) => {
        return (
            available.map( (entry, index) => {
                const mesh = entry.mesh;
                const isOdd = index%2 === 1
                const isSelected = mesh.id === selectedMesh?.mesh.id

                return (<tr key={mesh.id} onClick={() => handleMeshSelection(entry)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                    <td className={styles.tableCell}>{mesh.name}</td>
                </tr>);
            })
        );
    }

    const renderMaterialsTable = (selected: ListedMetadataGLTF | null) => {
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