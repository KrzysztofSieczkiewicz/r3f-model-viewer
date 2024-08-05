import { MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { EditableMaterials, EditableMaterialWrapper } from "../../../../models/assets/materials/EditableMaterial";

export const getEditableMaterial = (material: EditableMaterialWrapper) => {
    switch(material.type) {
        case EditableMaterials.Physical:
            return new MeshPhysicalMaterial();
        case EditableMaterials.Standard:
            return new MeshStandardMaterial();
        case EditableMaterials.Basic:
            return new MeshPhongMaterial();
    }
}