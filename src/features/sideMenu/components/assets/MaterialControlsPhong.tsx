import React from "react";

import { DEFAULT_EDITABLE_MATERIALS, EditableMaterials, PhongMaterialProperties } from "../../../../models/assets/materials/EditableMaterial"
import { useSceneObjectsContext } from "../../../common/contexts/SceneObjectsContext";
import { DropdownItemTrait } from "../common/controls/DropdownItemTrait";
import { CheckboxItemTrait } from "../common/controls/CheckboxItemTrait";
import { SliderContainerLong } from "../common/controls/SliderContainerLong";
import { Slider } from "../common/controls/Slider";
import { ButtonReset } from "../common/controls/ButtonReset";
import { ColorPicker } from "../common/controls/ColorPicker";
import { TraitSingle } from "../common/traits/TraitSingle";
import { TraitSection } from "../common/traits/TraitSection";

type Props = {
    assetId: string,
    properties: PhongMaterialProperties
}

export const MaterialControlsPhong = ({assetId, properties}: Props) => {
    const { updateEditableMaterialProperties, changeEditableMaterialType } = useSceneObjectsContext();

    const { transparent, opacity, flatShading, displayWireframe,
        color, emissive, specular, shininess } = properties;

        const defaultProperties = DEFAULT_EDITABLE_MATERIALS[EditableMaterials.Basic].properties;
        
    return (<>
        <TraitSection>
            <TraitSingle name="Material type">
                <DropdownItemTrait 
                    selected={EditableMaterials.Basic} 
                    selectionList={Object.values(EditableMaterials)} 
                    handleSelect={ (index: number) => changeEditableMaterialType(assetId, Object.values(EditableMaterials)[index])} />
            </TraitSingle>
        </TraitSection>

        <TraitSection name="Transparency">
            <TraitSingle name="Transparent">
                <CheckboxItemTrait
                    value={transparent}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {transparent: value} )} />
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

        <TraitSection name="Surface">
            <TraitSingle name="Color">
                <ColorPicker
                    currentColor={color}
                    handleChange={(value) => updateEditableMaterialProperties(assetId, {color: value} )} />
            </TraitSingle>
            <TraitSingle name="Specular">
                <ColorPicker
                    currentColor={specular}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {specular: value} )} />
            </TraitSingle>
            <TraitSingle name="Shininess">
                <SliderContainerLong>
                    <Slider
                        min={0} max={1} step={0.005} 
                        value={shininess}
                        handleChange={(value) => updateEditableMaterialProperties(assetId, {shininess: value} )} />
                </SliderContainerLong>
                <ButtonReset onReset={() => updateEditableMaterialProperties(assetId, {shininess: defaultProperties.shininess} )} />
            </TraitSingle>
            <TraitSingle name="Emissive">
                <ColorPicker
                    currentColor={emissive}
                    handleChange={(value) =>  updateEditableMaterialProperties(assetId, {emissive: value} )} />
            </TraitSingle>
        </TraitSection>
    </>)
}