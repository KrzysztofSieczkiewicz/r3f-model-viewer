import React from "react";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, StandardMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { SindleChoiceDropdown } from "../../controls/SingleChoiceDropdown";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { ColorPicker } from "../../controls/ColorPicker";
import { TexturePicker } from "../../controls/TexturePicker";


type Props = {
    assetId: string,
    properties: StandardMaterialProperties
}

export const StandardMaterialControls = ({assetId, properties}: Props) => {
    const { updateEditableMaterialProperties, changeEditableMaterialType } = useSceneObjectsContext();

    const { transparent, opacity, flatShading, displayWireframe,
        colorMap, color, roughnessMap, roughness, metalnessMap, metalness,
        environmentMap, environmentMapRotation, environmentMapIntensity,
        emissive, emissiveMap, emissiveIntensity,
        alphaMap, ambientOcclusionMap, ambientOcclusionMapIntensity,
        normalMap, normalScale, bumpMap, bumpScale,
        displacementMap, displacementScale, displacementBias } = properties;

    const defaultProperties = DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Standard].properties;

    // TODO: AFTER INTRODUCING CONDITIONAL DISPLAYING/GREYING OUT -> MAYBE SEPARATE THIS INTO SUBCOMPONENTS?
    return (<>
        <TraitsSection>
            <SingleLineTrait name="Material type">
                <SindleChoiceDropdown 
                    selected={EditableMaterials.Standard} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleChange={ (type: EditableMaterials) => changeEditableMaterialType(assetId, type)} />
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

        <TraitsSection displayName="Color">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={colorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {colorMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Rougness">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={roughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Value">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={roughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {roughness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {roughness: defaultProperties.roughness} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Metalness">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={metalnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Value">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={metalness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {metalness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.metalness} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Emissive">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={emissiveMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={emissiveIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {emissiveIntensity: defaultProperties.emissiveIntensity} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Environment">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={environmentMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={environmentMapRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapRotation: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapRotation} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={environmentMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapIntensity} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Ambient occlusion">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={ambientOcclusionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={ambientOcclusionMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMapIntensity: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Normal">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={normalMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {normalMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={normalScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {normalScale: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Bump">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={bumpMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={bumpScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpScale: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.bumpScale} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Displacement">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={displacementMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={displacementScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementScale: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Bias">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={displacementBias}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementBias: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Transparency">
            <SingleLineTrait name="Transparent">
                <Checkbox
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Alpha map">
            <TexturePicker
                map={alphaMap}
                handleChange={(value) => updateEditableMaterialProperties(assetId, {alphaMap: value} )} />
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
    </>)
}