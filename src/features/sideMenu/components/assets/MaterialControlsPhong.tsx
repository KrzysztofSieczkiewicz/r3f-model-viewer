import React from "react";

import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhongMaterialProperties } from "../../../../models/assets/materials/EditableMaterial"
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { Dropdown } from "../../../common/Dropdown";
import { Checkbox } from "../common/controls/Checkbox";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../../../components/sidebar/controls/SliderNumeric";
import { ButtonReset } from "../common/controls/ButtonReset";
import { ColorPicker } from "../common/controls/ColorPicker";
import { TraitSingle } from "../common/traits/TraitSingle";
import { TraitSection } from "../common/traits/TraitSection";

type Props = {
    assetId: string,
    properties: PhongMaterialProperties
}

export const MaterialControlsPhong = ({assetId, properties}: Props) => {
    const { updateEditableMaterialProperties, changeEditableMaterialType } = useSceneObjectsContext();

    const { transparent, opacity, flatShading, displayWireframe,
        color, emissive, specular, shininess } = properties;

        const defaultProperties = DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Basic].properties;
        
    return (<>
        <TraitSection>
            <TraitSingle name="Material type">
                <Dropdown 
                    selected={EditableMaterials.Basic} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleChange={ (type: EditableMaterials) => changeEditableMaterialType(assetId, type)} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Transparency">
            <TraitSingle name="Transparent">
                <Checkbox
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
            </TraitSingle>
            <TraitSingle name="Opacity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005}
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {opacity: defaultProperties.opacity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Display">
            <TraitSingle name="Flat shading">
                <Checkbox
                    value={flatShading}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {flatShading: value} )} />
            </TraitSingle>
            <TraitSingle name="Wireframe">
                <Checkbox
                    value={displayWireframe}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displayWireframe: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Surface">
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </TraitSingle>
            <TraitSingle name="Specular">
                <ColorPicker
                    currentColor={specular}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {specular: value} )} />
            </TraitSingle>
            <TraitSingle name="Shininess">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={shininess}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {shininess: value} )} />
                </SliderLongContainer>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {shininess: defaultProperties.shininess} )} />
            </TraitSingle>
            <TraitSingle name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </TraitSingle>
        </TraitSection>
    </>)
}