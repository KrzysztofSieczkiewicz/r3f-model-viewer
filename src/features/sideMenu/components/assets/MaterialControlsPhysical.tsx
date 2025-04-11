import React from "react";
import { Checkbox } from "../../../../components/sidebar/controls/buttons/Checkbox";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { ColorPicker } from "../common/controls/ColorPicker";
import { SliderLongContainer } from "../../../../components/sidebar/controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../../../components/sidebar/controls/SliderNumeric";
import { useSceneObjectsContext } from "../../../../components/contexts/SceneObjectsContext";
import { ResetButton } from "../../../../components/sidebar/controls/buttons/ResetButton";
import { SingleChoiceDropdown } from "../../../../components/sidebar/controls/SingleChoiceDropdown";
import { TexturePicker } from "../../../../components/sidebar/controls/TexturePicker";
import { SlidersArray } from "../../../../components/sidebar/controls/SlidersArray";
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
                <SingleChoiceDropdown 
                    selected={EditableMaterials.Physical} 
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
            <TraitSingle name="Reflectivity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={reflectivity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {reflectivity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {reflectivity: defaultProperties.reflectivity} )} />
            </TraitSingle>
            <TraitSingle name="Dispersion">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={dispersion}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {dispersion: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {dispersion: defaultProperties.dispersion} )} />
            </TraitSingle>
            <TraitSingle name="IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2.333} step={0.005} 
                        value={ior}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {ior: defaultProperties.ior} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Specular">
            <TraitSingle name="Color map">
                <TexturePicker
                    map={specularColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={specularColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColor: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity map">
                <TexturePicker
                    map={specularIntensityMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensityMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2} step={0.005} 
                        value={specularIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {specularIntensity: defaultProperties.specularIntensity} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Attenuation">
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={attenuationColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationColor: value} )} />
            </TraitSingle>
            <TraitSingle name="Distance">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={Infinity} step={0.005} 
                        value={attenuationDistance}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationDistance: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {attenuationDistance: defaultProperties.attenuationDistance} )} />
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
                        min={0} max={3} step={0.005} 
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Transmission map">
                <TexturePicker
                    map={transmissionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transmissionMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Transmission">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={transmission}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {transmission: value} )} />
                </SliderLongContainer>
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

        <TraitSection name="Clearcoat">
            <TraitSingle name="Map">
                <TexturePicker
                    map={clearcoatMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoat}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoat: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Roughness Map">
                <TexturePicker
                    map={clearcoatRoughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoatRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughness: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Normal Map">
                <TexturePicker
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
                <TexturePicker
                    map={anisotropyMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={anisotropy}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropy: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={anisotropyRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyRotation: value} )} />
                </SliderLongContainer>
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Iridescence">
            <TraitSingle name="Map">
                <TexturePicker
                    map={iridescenceMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={iridescence}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescence: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2.333} step={0.005} 
                        value={iridescenceIor}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceIor: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {iridescenceIor: defaultProperties.iridescenceIor} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Sheen">
            <TraitSingle name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheen}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheen: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Roughness Map">
                <TexturePicker
                    map={sheenRoughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughnessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheenRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughness: value} )} />
                </SliderLongContainer>
            </TraitSingle>
            <TraitSingle name="Color Map">
                <TexturePicker
                    map={sheenColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenColorMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={sheenColor}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {sheenColor: value} )} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Thickness">
            <TraitSingle name="Map">
                <TexturePicker
                    map={thicknessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {thicknessMap: value} )} />
            </TraitSingle>
            <TraitSingle name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={5} step={0.005} 
                        value={thickness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {thickness: value} )} />
                </SliderLongContainer>
            </TraitSingle>
        </TraitSection>
    </>);
}