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
            setSelectedMaterial(mesh.materials[0])
        } else {
            setSelectedMesh(null)
            setSelectedMaterial(null)
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
                <thead><td><b>Mesh</b></td></thead>
                <tbody className={styles.tableBody}>
                    {meshesList.map( (mesh, index) => {
                        const isOdd = index%2 === 1
                        const isSelected = mesh.uuid === selectedMesh?.uuid
                        console.log({isOdd})
                        return (<tr key={mesh.uuid} onClick={() => handleMeshSelection(mesh)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                            <td className={styles.tableCell}>{mesh.name}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        )
    }

    const renderMaterialsTable = () => {
        return (
            <table className={styles.table}>
                <thead><td><b>Material</b></td><td><b>Type</b></td></thead>
                <tbody className={styles.tableBody}>
                    {selectedMesh?.materials.map( (material, index) => {
                        const isOdd = index%2 === 1
                        const isSelected = material.uuid === selectedMaterial?.uuid
                        return (<tr key={material.uuid} onClick={() => handleMaterialSelection(material)} className={`${styles.tableRow} ${isOdd ? styles.odd : ''} ${isSelected ? styles.selected : ''}`}>
                            <td className={styles.tableCell}>{material.name}</td>
                            <td className={styles.tableCell}>{material.type}</td>
                        </tr>);
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
                {renderMaterialsTable()}
            </div>
        </div>
    </div>
    )
}