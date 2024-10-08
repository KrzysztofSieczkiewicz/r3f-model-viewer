import React from "react";

import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhongMaterialProperties } from "../../../../models/assets/materials/EditableMaterial"
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { SingleChoiceDropdown } from "../../controls/SingleChoiceDropdown";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { ColorPicker } from "../../controls/ColorPicker";

type Props = {
    assetId: string,
    properties: PhongMaterialProperties
}

export const PhongMaterialControls = ({assetId, properties}: Props) => {
    const { updateEditableMaterialProperties, changeEditableMaterialType } = useSceneObjectsContext();

    const { transparent, opacity, flatShading, displayWireframe,
        color, emissive, specular, shininess } = properties;

        const defaultProperties = DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Basic].properties;
        
    return (<>
        <TraitsSection>
            <SingleLineTrait name="Material type">
                <SingleChoiceDropdown 
                    selected={EditableMaterials.Basic} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleChange={ (type: EditableMaterials) => changeEditableMaterialType(assetId, type)} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Transparency">
            <SingleLineTrait name="Transparent">
                <Checkbox
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Opacity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005}
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {opacity: defaultProperties.opacity} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Display">
            <SingleLineTrait name="Flat shading">
                <Checkbox
                    value={flatShading}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {flatShading: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Wireframe">
                <Checkbox
                    value={displayWireframe}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displayWireframe: value} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Surface">
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Specular">
                <ColorPicker
                    currentColor={specular}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {specular: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Shininess">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={shininess}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {shininess: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {shininess: defaultProperties.shininess} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </SingleLineTrait>
        </TraitsSection>
    </>)
}