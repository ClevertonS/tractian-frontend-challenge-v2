import { iAsset } from "../interfaces/iAsset";
import { iLocation } from "../interfaces/iLocation";
import { iTreeBranch, iTreeNodeAssets, iTreeNodeLocations } from "../interfaces/iTree";


export async function fetchCompanyById(id: string): Promise<iTreeBranch[]> {
    const locations = await fetchData<iLocation>(id, 'locations');
    const assets = await fetchData<iAsset>(id, 'assets');
    return await GenerateLocationsRoots(locations, assets);
}

async function GenerateAssetsRoots(assetsTree: iTreeNodeAssets[]): Promise<iTreeNodeAssets[]> {
    const nodeMap: { [key: string]: iTreeNodeAssets } = {};
    const rootsAssets: iTreeNodeAssets[] = [];

    await Promise.all(assetsTree.map(async (asset) => {
        asset.children = [];
        asset.type = determineAssetType(asset);
        nodeMap[asset.id] = asset;
    }));

    await Promise.all(assetsTree.map(async (asset) => {
        if (asset.parentId) {
            const parent = nodeMap[asset.parentId];
            if (parent) {
                parent.children!.push(asset);
            }
        } else {
            rootsAssets.push(asset);
        }
    }));

    return rootsAssets;
}

async function GenerateLocationsRoots(locationsTree: iTreeNodeLocations[], assets: iAsset[]): Promise<iTreeBranch[]> {
    const assetsRoots = await GenerateAssetsRoots(assets);
    const assetsMap: { [key: string]: iTreeNodeAssets } = {};
    const nodeMap: { [key: string]: iTreeBranch } = {};
    const rootsLocations: iTreeBranch[] = [];

    
    await Promise.all(assetsRoots.map(async (asset) => {
        assetsMap[asset.id] = asset;
    }));

    
    await Promise.all(locationsTree.map(async (location) => {
        location.children = [];
        location.type = "Location";
        nodeMap[location.id] = location;
    }));

    await Promise.all(locationsTree.map(async (location) => {
        if (location.parentId) {
            const parent = nodeMap[location.parentId];
            if (parent) {
                parent.children!.push(location);
            }
        } else {
            rootsLocations.push(location);
        }
    }));

    
    await Promise.all(locationsTree.map(async (location) => {
        const assetsUnderLocation = Object.values(assetsMap).filter(asset => asset.locationId === location.id);
        if (assetsUnderLocation.length > 0) {
            location.children!.push(...assetsUnderLocation);
        }
    }));

    
    const componentWithoutLocationAssets = assetsRoots.filter(asset => asset.type === "ComponentWithoutLocation");
    rootsLocations.push(...componentWithoutLocationAssets);

    return rootsLocations;
}


async function fetchData<T>(id: string, endpoint: string): Promise<T[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_FAKE_API}/companies/${id}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T[] = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return []; // Retorna um array vazio em caso de erro
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