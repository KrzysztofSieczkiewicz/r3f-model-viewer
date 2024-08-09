import React from "react";
import { DEFAULT_MATERIAL_STANDARD, EditableMaterials, StandardMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { SindleChoiceDropdown } from "../../controls/SingleChoiceDropdown";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { ColorPicker } from "../../controls/ColorPicker";


type Props = {
    assetId: string,
    properties: StandardMaterialProperties
}

export const StandardMaterialControls = ({assetId, properties}: Props) => {
    const { updateEditableMaterialProperties } = useSceneObjectsContext();

    const { transparent, opacity, flatShading, displayWireframe,
        color, emissive, roughness, metalness } = properties;

    const defaultProperties = DEFAULT_MATERIAL_STANDARD.properties as StandardMaterialProperties;


    return (<>
        <TraitsSection>
            <SingleLineTrait name="Material type">
                <SindleChoiceDropdown 
                    selected={EditableMaterials.Standard} selectionList={Object.values(EditableMaterials)} handleChange={ (value: string) => console.log(value)} />
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
            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={roughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {roughness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {roughness: defaultProperties.roughness} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Metalness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={metalness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {metalness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.metalness} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </SingleLineTrait>
        </TraitsSection>
    </>)
}