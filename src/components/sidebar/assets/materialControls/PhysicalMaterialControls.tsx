import React from "react";
import { SingleLineTrait } from "../../commons/traitContainers/SingleLineTrait";
import { Checkbox } from "../../controls/buttons/Checkbox";
import { PhysicalMaterialProperties } from "../../../../models/assets/materials/EditableMaterial";
import { ColorPicker } from "../../controls/ColorPicker";
import { SliderLongContainer } from "../../controls/sliderContainers/SliderLongContainer";
import { SliderNumeric } from "../../controls/SliderNumeric";
import { TraitsSection } from "../../commons/traitContainers/TraitsSection";
import { useSceneObjectsContext } from "../../../contexts/SceneObjectsContext";

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


    return (
        <>
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
            </SingleLineTrait>
            </TraitsSection>

            <TraitsSection displayName="Display">
                <SingleLineTrait name="Flat shading">
                    <Checkbox
                        value={flatShading}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {flatShading: value} )} />
                </SingleLineTrait>
                <SingleLineTrait name="Display wireframe">
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
                </SingleLineTrait>
                <SingleLineTrait name="Metalness">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={1} step={0.005} 
                            value={metalness}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {metalness: value} )} />
                    </SliderLongContainer>
                </SingleLineTrait>
                <SingleLineTrait name="Reflectivity">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={1} step={0.005} 
                            value={reflectivity}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {reflectivity: value} )} />
                    </SliderLongContainer>
                </SingleLineTrait>
                <SingleLineTrait name="IOR">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={3} step={0.005} 
                            value={ior}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                    </SliderLongContainer>
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
                </SingleLineTrait>
                <SingleLineTrait name="IOR">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={3} step={0.005} 
                            value={iridescenceIor}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {ior: value} )} />
                    </SliderLongContainer>
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
                <SingleLineTrait name="Roughness">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={1} step={0.005} 
                            value={sheenRoughness}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {sheenRoughness: value} )} />
                    </SliderLongContainer>
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
                </SingleLineTrait>
                <SingleLineTrait name="Roughness">
                    <SliderLongContainer>
                        <SliderNumeric
                            min={0} max={1} step={0.005} 
                            value={clearcoatRoughness}
                            handleChange={(value) => updateEditableMaterialProperties(assetId, {clearcoatRoughness: value} )} />
                    </SliderLongContainer>
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
                </SingleLineTrait>
                <SingleLineTrait name="Color">
                    <ColorPicker
                        currentColor={specularColor}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {specularColor: value} )} />
                </SingleLineTrait>
            </TraitsSection>
        </>
    );
}