import React from "react";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, StandardMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { SingleChoiceDropdown } from "../../../../components/sidebar/controls/SingleChoiceDropdown";
import { Checkbox } from "../../../../components/sidebar/controls/buttons/Checkbox";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../../../components/sidebar/controls/SliderNumeric";
import { ResetButton } from "../../../../components/sidebar/controls/buttons/ResetButton";
import { ColorPicker } from "../../../../components/sidebar/controls/ColorPicker";
import { TexturePicker } from "../../../../components/sidebar/controls/TexturePicker";
import { TraitSingle } from "../common/traits/TraitSingle";
import { TraitSection } from "../common/traits/TraitSection";


type Props = {
    assetId: string,
    properties: StandardMaterialProperties
}

export const MaterialControlsStandard = ({assetId, properties}: Props) => {
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
    // PREFERABLY MOVE INTO SEPARATE renderSection() functions
    return (<>
        <TraitSection>
            <TraitSingle name="Material type">
                <SingleChoiceDropdown 
                    selected={EditableMaterials.Standard} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleChange={ (type: EditableMaterials) => changeEditableMaterialType(assetId, type)} />
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

        <TraitSection name="Color">
            <TraitSingle name="Map">
                <TexturePicker
                    map={colorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {colorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Surface">
            <TraitSingle name="Roughness">
                <TexturePicker
                    map={roughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={roughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {roughness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {roughness: defaultProperties.roughness} )} />
            </TraitSingle>
            <TraitSingle name="Metalness">
                <TexturePicker
                    map={metalnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Metalness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={metalness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {metalness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.metalness} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Emissive">
            <TraitSingle name="Map">
                <TexturePicker
                    map={emissiveMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={emissiveIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {emissiveIntensity: defaultProperties.emissiveIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Environment">
            <TraitSingle name="Map">
                <TexturePicker
                    map={environmentMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={environmentMapRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapRotation: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapRotation} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={environmentMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Ambient occlusion">
            <TraitSingle name="Map">
                <TexturePicker
                    map={ambientOcclusionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={ambientOcclusionMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMapIntensity: value} )} />
                </SliderLongContainer>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Normal">
            <TraitSingle name="Map">
                <TexturePicker
                    map={normalMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {normalMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={normalScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {normalScale: value} )} />
                </SliderLongContainer>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Bump">
            <TraitSingle name="Map">
                <TexturePicker
                    map={bumpMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={bumpScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpScale: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.bumpScale} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Displacement">
            <TraitSingle name="Map">
                <TexturePicker
                    map={displacementMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={displacementScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementScale: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Bias">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={displacementBias}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementBias: value} )} />
                </SliderLongContainer>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Transparency">
            <TraitSingle name="Transparent">
                <Checkbox
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
            </TraitSingle>
            <TraitSingle name="Alpha map">
            <TexturePicker
                map={alphaMap}
                handleChange={(value) => updateEditableMaterialProperties(assetId, {alphaMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Opacity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005}
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {opacity: defaultProperties.opacity} )} />
            </TraitSingle>
        </TraitSection>
    </>)
}