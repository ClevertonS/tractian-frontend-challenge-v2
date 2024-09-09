import { iAsset } from "./iAsset";
import { iLocation } from "./iLocation";


export interface iTreeBranch extends iTreeNodeAssets, iTreeNodeLocations{
    children?: iTreeNodeLocations[] | iTreeNodeAssets[];
}

export interface iTreeNodeLocations extends iLocation{
    type?: "Asset" | "ComponentWithoutLocation" | "Component" | "Location"
    children?: iTreeNodeLocations[];
}

export interface iTreeNodeAssets extends iAsset {
    type?: "Asset" | "ComponentWithoutLocation" | "Component" | "Location";
    children?: iTreeNodeAssets[];
}