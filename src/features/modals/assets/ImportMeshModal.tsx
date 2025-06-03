import React, { useState } from "react"
import styles from './ImportMeshModal.module.css'

import { ListedMaterial, ListedMesh, useListContentsGLTF } from "../../sideMenu/hooks/useListContentsGLTF"

type Props = {
    src: string;
    closeModal: () => void;
}

export const ImportMeshModal = ({src, closeModal}: Props) => {

    const [ selectedMesh, setSelectedMesh ] = useState<ListedMesh|null>(null);
    const [ selectedMaterial, setSelectedMaterial ] = useState<ListedMaterial|null>(null);

    const { meshes } =  useListContentsGLTF(src)


    const handleMeshSelection = (mesh: ListedMesh) => {
        if (mesh.uuid !== selectedMesh?.uuid) {
            setSelectedMesh(mesh)
        } else {
            setSelectedMesh(null)
        }
    }

    const handleMaterialSelection = (material: ListedMaterial) => {
        if (material.uuid !== selectedMaterial?.uuid) {
            setSelectedMaterial(material)
        } else {
            setSelectedMaterial(null)
        }
    }

    const renderMeshTable = (meshesList: ListedMesh[]) => {
        return (
            <table className={styles.table}>
                {meshesList.map( (mesh) => {
                    return (<tr onClick={() => handleMeshSelection(mesh)}>
                        <td>{mesh.name}</td>
                    </tr>);
                })}
            </table>
        )
    }

    const renderMaterialsTable = () => {
        return (
            <table className={styles.table}>
                {selectedMesh?.materials.map( (material) => {
                    return (<tr onClick={() => handleMaterialSelection(material)}>
                        <td>{material.name}</td>
                        <td>{material.type}</td>
                    </tr>);
                })}
            </table>
        )
    }


    return (
    <div className={styles.modalContents}>
        <div className={styles.tablesContainer}>
            <div className={styles.table}>
                {renderMeshTable(meshes)}
            </div>
            <div className={styles.table}>
                {renderMaterialsTable()}
            </div>
        </div>
    </div>
    )
}