import React from "react";
import { AssetWrapper } from "../../models/Asset";
import { LightWrapper } from "../../models/Light";

// TODO: SKOPIUJ
type EditableWrapper = AssetWrapper | LightWrapper
type Props = {
    asset: EditableWrapper,
    updateProperty: (id:string, property: keyof EditableWrapper, value:any) => void
}

export const VisibilityEyeButton = ({asset, updateProperty} :Props): JSX.Element => {
    return (
        <span className={`visibility-icon header-icon ${!asset.visible ? "suppressed" : ""}`} 
            onClick={(e) => {
                e.stopPropagation();
                updateProperty(asset.id, 'visible', !asset.visible)
            }}
        >&#128065;</span>
    );
}