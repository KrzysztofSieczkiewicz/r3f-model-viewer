import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { ColorPicker } from "../../controls/ColorPicker";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { SingleChoiceDropdown } from "../../controls/SingleChoiceDropdown";
import { TexturePicker } from "../../controls/TexturePicker";

type Props = {
    assetId: string,
    properties: PhysicalMaterialProperties
}

export const PhysicalMaterialControls = ( {assetId, properties}: Props) => {
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
        <TraitsSection>
            <SingleLineTrait name="Material type">
                <SingleChoiceDropdown 
                    selected={EditableMaterials.Physical} 
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

        <TraitsSection displayName="Surface">
            <SingleLineTrait name="Roughness">
                <TexturePicker
                    map={roughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
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
                <TexturePicker
                    map={metalnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
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
            <SingleLineTrait name="Reflectivity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={reflectivity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {reflectivity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {reflectivity: defaultProperties.reflectivity} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Dispersion">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={dispersion}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {dispersion: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {dispersion: defaultProperties.dispersion} )} />
            </SingleLineTrait>
            <SingleLineTrait name="IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2.333} step={0.005} 
                        value={ior}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {ior: defaultProperties.ior} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Specular">
            <SingleLineTrait name="Color map">
                <TexturePicker
                    map={specularColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColorMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={specularColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColor: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Intensity map">
                <TexturePicker
                    map={specularIntensityMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensityMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2} step={0.005} 
                        value={specularIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {specularIntensity: defaultProperties.specularIntensity} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Attenuation">
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={attenuationColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationColor: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Distance">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={Infinity} step={0.005} 
                        value={attenuationDistance}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {attenuationDistance: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {attenuationDistance: defaultProperties.attenuationDistance} )} />
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
                        min={0} max={3} step={0.005} 
                        value={opacity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {opacity: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Transmission map">
                <TexturePicker
                    map={transmissionMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transmissionMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Transmission">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={transmission}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {transmission: value} )} />
                </SliderLongContainer>
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

        <TraitsSection displayName="Clearcoat">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={clearcoatMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoat}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoat: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Roughness Map">
                <TexturePicker
                    map={clearcoatRoughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughnessMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoatRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughness: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Normal Map">
                <TexturePicker
                    map={clearcoatNormalMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatNormalMap: value} )} />
            </SingleLineTrait>

            {/* // TODO: HANDLE DOUBLE SLIDER */}
            {/* <SingleLineTrait name="Normal scale">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoatNormalScale}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatNormalScale: value} )} />
                </SliderLongContainer>
            </SingleLineTrait> */}
        </TraitsSection>

        <TraitsSection displayName="Anisotropy">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={anisotropyMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={anisotropy}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropy: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={360} step={0.005} 
                        value={anisotropyRotation}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {anisotropyRotation: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Iridescence">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={iridescenceMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={iridescence}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescence: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Rotation">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={2.333} step={0.005} 
                        value={iridescenceIor}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescenceIor: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {iridescenceIor: defaultProperties.iridescenceIor} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Sheen">
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheen}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheen: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Roughness Map">
                <TexturePicker
                    map={roughnessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {roughnessMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheenRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughness: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
            <SingleLineTrait name="Color Map">
                <TexturePicker
                    map={sheenColorMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenColorMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={sheenColor}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {sheenColor: value} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Thickness">
            <SingleLineTrait name="Map">
                <TexturePicker
                    map={thicknessMap}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {thicknessMap: value} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Strength">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={5} step={0.005} 
                        value={thickness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {thickness: value} )} />
                </SliderLongContainer>
            </SingleLineTrait>
        </TraitsSection>
    </>);
}