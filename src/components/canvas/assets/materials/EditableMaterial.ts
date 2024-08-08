import { MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { EditableMaterials, EditableMaterialWrapper } from "../../../../models/assets/materials/EditableMaterial";

export const getEditableMaterial = (material: EditableMaterialWrapper) => {
    switch(material.type) {
        case EditableMaterials.Physical:

            const {transparent, opacity, flatShading, displayWireframe,
                color, emissive, roughness, metalness, ior, reflectivity,
                iridescence, iridescenceIor, sheen, sheenRoughness, sheenColor,
                clearcoat, clearcoatRoughness, specularIntensity, specularColor
            } = material.properties;

            return new MeshPhysicalMaterial({
                transparent: transparent,
                opacity: opacity,
                flatShading: flatShading,
                wireframe: displayWireframe,
                color: color,
                emissive: emissive,
                roughness: roughness,
                metalness: metalness,
                ior: ior,
                reflectivity: reflectivity,
                iridescence: iridescence,
                iridescenceIOR: iridescenceIor,
                sheen: sheen,
                sheenRoughness: sheenRoughness,
                sheenColor: sheenColor,
                clearcoat: clearcoat,
                clearcoatRoughness: clearcoatRoughness,
                specularIntensity: specularIntensity,
                specularColor: specularColor
            });

        case EditableMaterials.Standard:
            return new MeshStandardMaterial();
        case EditableMaterials.Basic:
            return new MeshPhongMaterial();
    }
}