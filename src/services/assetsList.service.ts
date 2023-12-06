import { AssetWrapper } from "../interfaces/asset.model";
import { AssetService } from "./asset.service";

const addAsset = (assetsArray: AssetWrapper[]): AssetWrapper[] => {
    const newAsset = new AssetService().createDefault();

    assetsArray.push(newAsset)

    return assetsArray;
}

const updateAsset = (assetsArray: AssetWrapper[], id: string, asset:AssetWrapper): AssetWrapper[] => {
    const index = assetsArray.findIndex(asset => asset.id === id);

    assetsArray[index] = asset;

    return assetsArray;
}

const deleteAsset = (assetsArray: AssetWrapper[], id: string): AssetWrapper[] => {
    const index = assetsArray.findIndex(asset => asset.id === id);

    assetsArray.splice(index, 1);

    return assetsArray;
}