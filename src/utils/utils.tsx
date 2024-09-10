import { iAsset } from "../interfaces/iAsset";
import { iLocation } from "../interfaces/iLocation";
import { iTreeBranch, iTreeNodeAssets, iTreeNodeLocations } from "../interfaces/iTree";



export async function fetchCompanyById(id: string): Promise<iTreeBranch[]> {
    const locations = await fetchLocations(id);
    const assets = await fetchAssets(id);
    return SortNodesByChildrenCount(GenerateLocationsRoots(locations, assets));
}

const SortNodesByChildrenCount = (nodes: iTreeBranch[]): iTreeBranch[] => {
    return nodes.sort((a, b) =>  b.children!.length - a.children!.length);
  };

function GenerateAssetsRoots(assetsTree: iTreeNodeAssets[]) {
    const nodeMap: { [key: string]: iTreeNodeAssets } = {};
    const rootsAssets: iTreeNodeAssets[] = [];

    assetsTree.forEach(asset => {
        asset.children = [];
        asset.type = determineAssetType(asset)
        nodeMap[asset.id] = asset
    });

    assetsTree.forEach(asset => {
        if (asset.parentId) {
            const parent = nodeMap[asset.parentId];
            if (parent) {
                parent.children!.push(asset);
            }
        } else {
            rootsAssets.push(asset);
        }
    })

    return rootsAssets;
}



function GenerateLocationsRoots(locationsTree: iTreeNodeLocations[], assets: iAsset[]) {
    const assetsRoots = GenerateAssetsRoots(assets);

    const assetsMap: { [key: string]: iTreeNodeAssets } = {};
    const nodeMap: { [key: string]: iTreeBranch } = {};
    const rootsLocations: iTreeBranch[] = [];

    assetsRoots.forEach(asset => {
        assetsMap[asset.id] = asset
    });

    locationsTree.forEach(location => {
        location.children = [];
        location.type = "Location"
        nodeMap[location.id] = location
    });

    locationsTree.forEach(location => {
        if (location.parentId) {
            const parent = nodeMap[location.parentId]
            if (parent) {
                parent.children!.push(location);
            }
        } else {
            rootsLocations.push(location);
        }
    });

    locationsTree.forEach(location => {
        const locationId = location.id;
        const assetsUnderLocation = Object.values(assetsMap).filter(asset => asset.locationId === locationId)

        if (assetsUnderLocation.length > 0) {
            location.children!.push(...assetsUnderLocation)
        }
    })

    const componentWithoutLocationAssets = assetsRoots.filter(asset => asset.type === "ComponentWithoutLocation");

    componentWithoutLocationAssets.forEach(asset => {
        rootsLocations.push(asset)
    })

    return rootsLocations;
}

async function fetchLocations(id: string): Promise<iLocation[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_FAKE_API}/companies/${id}/locations`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const locations: iLocation[] = await response.json()

        return locations

    } catch (error) {
        console.error('Failed to fetch locations:', error);
        return []; 
    }
}

async function fetchAssets(id: string): Promise<iAsset[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_FAKE_API}/companies/${id}/assets`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const assets: iAsset[] = await response.json()

        return assets

    } catch (error) {
        console.error('Failed to fetch locations:', error);
        return []; 
    }
}

function determineAssetType(asset: iAsset): "Asset" | "ComponentWithoutLocation" | "Component" {
    if (asset.locationId == null && asset.parentId == null) {
        return "ComponentWithoutLocation";
    } else if (asset.sensorType == null) {
        return "Asset";
    } else {
        return "Component";
    }
}