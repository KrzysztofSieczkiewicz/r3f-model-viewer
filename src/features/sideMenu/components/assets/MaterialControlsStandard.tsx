import React from "react";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, StandardMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { DropdownItemTrait } from "../common/controls/DropdownItemTrait";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { Slider } from "../common/controls/Slider";
import { ButtonReset } from "../common/controls/ButtonReset";
import { PickerColor } from "../common/controls/PickerColor";
import { PickerTexture } from "../common/controls/PickerTexture";
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
                <DropdownItemTrait 
                    selected={EditableMaterials.Standard} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleSelect={ (index: number) => changeEditableMaterialType(assetId, Object.values(EditableMaterials)[index])} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Display">
            <TraitSingle name="Flat shading">
                <CheckboxItemTrait
                    value={flatShading}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {flatShading: value} )} />
            </TraitSingle>
            <TraitSingle name="Wireframe">
                <CheckboxItemTrait
                    value={displayWireframe}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displayWireframe: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Color">
            <TraitSingle name="Map">
                <PickerTexture
                    map={colorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {colorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <PickerColor
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Surface">
            <TraitSingle name="Roughness">
                <PickerTexture
                    map={roughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={roughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {roughness: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {roughness: defaultProperties.roughness} )} />
            </TraitSingle>
            <TraitSingle name="Metalness">
                <PickerTexture
                    map={metalnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Metalness">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={metalness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {metalness: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.metalness} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Emissive">
            <TraitSingle name="Map">
                <PickerTexture
                    map={emissiveMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <PickerColor
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={emissiveIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {emissiveIntensity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {emissiveIntensity: defaultProperties.emissiveIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Environment">
            <TraitSingle name="Map">
                <PickerTexture
                    map={environmentMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderContainerLong>
                    <Slider
                        min={0} max={360} step={0.005} 
                        value={environmentMapRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapRotation: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapRotation} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={environmentMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {environmentMapIntensity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.environmentMapIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Ambient occlusion">
            <TraitSingle name="Map">
                <PickerTexture
                    map={ambientOcclusionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={ambientOcclusionMapIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ambientOcclusionMapIntensity: value} )} />
                </SliderContainerLong>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Normal">
            <TraitSingle name="Map">
                <PickerTexture
                    map={normalMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {normalMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={normalScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {normalScale: value} )} />
                </SliderContainerLong>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Bump">
            <TraitSingle name="Map">
                <PickerTexture
                    map={bumpMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={bumpScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {bumpScale: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {metalness: defaultProperties.bumpScale} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Displacement">
            <TraitSingle name="Map">
                <PickerTexture
                    map={displacementMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Scale">
                <SliderContainerLong>
                    <Slider
                        min={0} max={360} step={0.005} 
                        value={displacementScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementScale: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Bias">
                <SliderContainerLong>
                    <Slider
                        min={0} max={360} step={0.005} 
                        value={displacementBias}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {displacementBias: value} )} />
                </SliderContainerLong>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Transparency">
            <TraitSingle name="Transparent">
                <CheckboxItemTrait
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
            </TraitSingle>
            <TraitSingle name="Alpha map">
            <PickerTexture
                map={alphaMap}
                handleChange={(value) => updateEditableMaterialProperties(assetId, {alphaMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Opacity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005}
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {opacity: defaultProperties.opacity} )} />
            </TraitSingle>
        </TraitSection>
    </>)
}