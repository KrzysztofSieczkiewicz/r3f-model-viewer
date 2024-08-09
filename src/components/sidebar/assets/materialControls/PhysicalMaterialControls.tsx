import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { DEFAULT_MATERIAL_PHYSICAL, EditableMaterials, PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { ColorPicker } from "../../controls/ColorPicker";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";
import { ResetButton } from "../../controls/buttons/ResetButton";
import { SindleChoiceDropdown } from "../../controls/SingleChoiceDropdown";

type Props = {
    assetId: string,
    properties: PhysicalMaterialProperties
}

export const PhysicalMaterialControls = ( {assetId, properties}: Props) => {
    const { updateEditableMaterialProperties } = useSceneObjectsContext();

    const {transparent, opacity, flatShading, displayWireframe,
        color, emissive, roughness, metalness, ior, reflectivity,
        iridescence, iridescenceIor, sheen, sheenRoughness, sheenColor,
        clearcoat, clearcoatRoughness, specularIntensity, specularColor
    } = properties;

    const defaultProperties = DEFAULT_MATERIAL_PHYSICAL.properties as PhysicalMaterialProperties;


    return (<>
        <TraitsSection>
            <SingleLineTrait name="Material type">
                <SindleChoiceDropdown 
                    selected={EditableMaterials.Physical} selectionList={Object.values(EditableMaterials)} handleChange={ (value: string) => console.log(value)} />
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
            <SingleLineTrait name="Reflectivity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={reflectivity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {reflectivity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {reflectivity: defaultProperties.reflectivity} )} />
            </SingleLineTrait>
            <SingleLineTrait name="IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
                        value={ior}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {ior: defaultProperties.ior} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Iridescence">
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={iridescence}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {iridescence: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {iridescence: defaultProperties.iridescence} )} />
            </SingleLineTrait>
            <SingleLineTrait name="IOR">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={3} step={0.005} 
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
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {sheen: defaultProperties.sheen} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={sheenRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {sheenRoughness: defaultProperties.sheenRoughness} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={sheenColor}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {sheenColor: value} ) } />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Clearcoat">
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoat}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoat: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {clearcoat: defaultProperties.clearcoat} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Roughness">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={clearcoatRoughness}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughness: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {clearcoatRoughness: defaultProperties.clearcoatRoughness} )} />
            </SingleLineTrait>
        </TraitsSection>

        <TraitsSection displayName="Specular">
            <SingleLineTrait name="Intensity">
                <SliderLongContainer>
                    <SliderNumeric
                        min={0} max={1} step={0.005} 
                        value={specularIntensity}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {specularIntensity: value} )} />
                </SliderLongContainer>
                <ResetButton onReset={() => updateEditableMaterialProperties(assetId, {specularIntensity: defaultProperties.specularIntensity} )} />
            </SingleLineTrait>
            <SingleLineTrait name="Color">
                <ColorPicker
                    currentColor={specularColor}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColor: value} )} />
            </SingleLineTrait>
        </TraitsSection>
    </>);
}