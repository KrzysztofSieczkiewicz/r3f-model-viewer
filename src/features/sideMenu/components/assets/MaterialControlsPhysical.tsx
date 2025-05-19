import React from "react";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { PickerColor } from "../common/controls/PickerColor";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { Slider } from "../common/controls/Slider";
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { ButtonReset } from "../common/controls/ButtonReset";
import { DropdownItemTrait } from "../common/controls/DropdownItemTrait";
import { PickerTexture } from "../common/controls/PickerTexture";
import { SlidersArray } from "../common/controls/SlidersArray";
import { TraitSingle } from "../common/traits/TraitSingle";
import { TraitSection } from "../common/traits/TraitSection";

type Props = {
    assetId: string,
    properties: PhysicalMaterialProperties
}

export const MaterialControlsPhysical = ( {assetId, properties}: Props) => {
    const { updateEditableMaterialProperties, changeEditableMaterialType } = useSceneObjectsContext();

    const {
        flatShading, displayWireframe,
        colorMap, color, roughnessMap, roughness, metalnessMap, metalness, reflectivity, dispersion, ior,
        specularIntensityMap, specularIntensity, specularColorMap, specularColor,
        attenuationColor, attenuationDistance,
        environmentMap, environmentMapRotation, environmentMapIntensity,
        emissive, emissiveMap, emissiveIntensity,
        transparent, alphaMap, opacity, transmissionMap, transmission,
        ambientOcclusionMap, ambientOcclusionMapIntensity,
        normalMap, normalScale, bumpMap, bumpScale, displacementMap, displacementScale, displacementBias,
        clearcoatMap, clearcoat, clearcoatRoughnessMap, clearcoatRoughness, clearcoatNormalMap, clearcoatNormalScale, 
        anisotropyMap, anisotropy, anisotropyRotation,
        iridescenceMap, iridescence, iridescenceIor,
        sheen, sheenRoughnessMap, sheenRoughness, sheenColorMap, sheenColor,
        thicknessMap, thickness,
    } = properties;

    const defaultProperties = DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Physical].properties;


    return (<>
        <TraitSection>
            <TraitSingle name="Material type">
                <DropdownItemTrait 
                    selected={EditableMaterials.Physical} 
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
            <TraitSingle name="Reflectivity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={reflectivity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {reflectivity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {reflectivity: defaultProperties.reflectivity} )} />
            </TraitSingle>
            <TraitSingle name="Dispersion">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={dispersion}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {dispersion: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {dispersion: defaultProperties.dispersion} )} />
            </TraitSingle>
            <TraitSingle name="IOR">
                <SliderContainerLong>
                    <Slider
                        min={0} max={2.333} step={0.005} 
                        value={ior}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {ior: defaultProperties.ior} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Specular">
            <TraitSingle name="Color map">
                <PickerTexture
                    map={specularColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <PickerColor
                    currentColor={specularColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColor: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity map">
                <PickerTexture
                    map={specularIntensityMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensityMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={2} step={0.005} 
                        value={specularIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensity: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {specularIntensity: defaultProperties.specularIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Attenuation">
            <TraitSingle name="Color">
                <PickerColor
                    currentColor={attenuationColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationColor: value} )} />
            </TraitSingle>
            <TraitSingle name="Distance">
                <SliderContainerLong>
                    <Slider
                        min={0} max={Infinity} step={0.005} 
                        value={attenuationDistance}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationDistance: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {attenuationDistance: defaultProperties.attenuationDistance} )} />
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
                        min={0} max={3} step={0.005} 
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Transmission map">
                <PickerTexture
                    map={transmissionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transmissionMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Transmission">
                <SliderContainerLong>
                    <Slider
                        min={0} max={3} step={0.005} 
                        value={transmission}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {transmission: value} )} />
                </SliderContainerLong>
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

        <TraitSection name="Clearcoat">
            <TraitSingle name="Map">
                <PickerTexture
                    map={clearcoatMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={clearcoat}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoat: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Roughness Map">
                <PickerTexture
                    map={clearcoatRoughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={clearcoatRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughness: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Normal Map">
                <PickerTexture
                    map={clearcoatNormalMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatNormalMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Normal scale">
                    <SlidersArray
                        step={0.005} 
                        value={clearcoatNormalScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatNormalScale: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Anisotropy">
            <TraitSingle name="Map">
                <PickerTexture
                    map={anisotropyMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={anisotropy}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropy: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderContainerLong>
                    <Slider
                        min={0} max={360} step={0.005} 
                        value={anisotropyRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyRotation: value} )} />
                </SliderContainerLong>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Iridescence">
            <TraitSingle name="Map">
                <PickerTexture
                    map={iridescenceMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={iridescence}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescence: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderContainerLong>
                    <Slider
                        min={0} max={2.333} step={0.005} 
                        value={iridescenceIor}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceIor: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {iridescenceIor: defaultProperties.iridescenceIor} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Sheen">
            <TraitSingle name="Intensity">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={sheen}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheen: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Roughness Map">
                <PickerTexture
                    map={sheenRoughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={sheenRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughness: value} )} />
                </SliderContainerLong>
            </TraitSingle>
            <TraitSingle name="Color Map">
                <PickerTexture
                    map={sheenColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenColorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <PickerColor
                    currentColor={sheenColor}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {sheenColor: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Thickness">
            <TraitSingle name="Map">
                <PickerTexture
                    map={thicknessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {thicknessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderContainerLong>
                    <Slider
                        min={0} max={5} step={0.005} 
                        value={thickness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {thickness: value} )} />
                </SliderContainerLong>
            </TraitSingle>
        </TraitSection>
    </>);
}