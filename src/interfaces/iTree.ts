import { iAsset } from "./iAsset";
import { iLocation } from "./iLocation";


export interface iTreeBranch extends iTreeNodeLocations ,iTreeNodeAssets{
    children?: iTreeNodeAssets[] | iTreeNodeLocations[];
}

export interface iTreeNodeLocations extends iLocation{
    type?: "Asset" | "ComponentWithoutLocation" | "Component" | "Location"
    children?: iTreeNodeLocations[];
}

export interface iTreeNodeAssets extends iAsset {
    type?: "Asset" | "ComponentWithoutLocation" | "Component" | "Location";
    children?: iTreeNodeAssets[];
}