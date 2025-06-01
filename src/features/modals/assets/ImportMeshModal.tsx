import React from "react"
import { useListContentsGLTF } from "../../sideMenu/hooks/useListContentsGLTF"

export const ImportMeshModal = (src: string) => {

    const { meshes } =  useListContentsGLTF(src)

    return (
    <div>
        <ul>
            {meshes.map( (mesh) => {
                return (<li key={mesh.name}>
                    <p>{mesh.name}</p>
                    {mesh.materials.map( (material) => {
                        return (
                            <p>{material.name} - {material.type}</p>
                        )
                    })}
                </li>)
            })}
        </ul>
    </div>
    )
}