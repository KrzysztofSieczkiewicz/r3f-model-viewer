import React, { useState } from "react"
import { ListedMaterial, ListedMesh, useListContentsGLTF } from "../../sideMenu/hooks/useListContentsGLTF"

type Props = {
    src: string;
    closeModal: () => void;
}

export const ImportMeshModal = ({src, closeModal}: Props) => {

    const [ selectedMesh, setSelectedMesh ] = useState<ListedMesh|null>(null);
    const [ selectedMaterial, setSelectedMaterial ] = useState<ListedMaterial|null>(null);

    const { meshes } =  useListContentsGLTF(src)

    const renderMeshList = () => {
        const meshesList = meshes.map( (mesh, index) => {
            if (index <=5) return mesh
        })
        return (
            meshesList.map( mesh => {
                if (!mesh) return
                return <p key={mesh.name} onClick={() => setSelectedMesh(mesh)}>{mesh.name}</p>
            })
        )
    }

    const renderMaterialsList = () => {
        return (
            selectedMesh?.materials.map( material => {
                return <p key={material.name} onClick={() => setSelectedMaterial(material)}>{material.name} - {material.type}</p>
            })
        )
    }

    return (
    <div>
        <div className="selection-container">
            <div className="selection-mesh">
                {renderMeshList()}
            </div>
            <div className="selection-material">
                {renderMaterialsList()}
            </div>
        </div>
    </div>
    )
}