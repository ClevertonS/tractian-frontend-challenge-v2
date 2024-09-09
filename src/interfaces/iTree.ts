import { iAsset } from "./iAsset";
import { iLocation } from "./iLocation";


export interface iTreeNodeLocations extends iLocation{
    children?: iTreeNodeLocations[] | iTreeNodeAssets[];
}

export interface iTreeNodeAssets extends iAsset {
    type?: "Asset" | "ComponentWithoutLocation" | "Component";
    children?: iTreeNodeAssets[];
}