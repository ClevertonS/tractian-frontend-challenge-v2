import { iAsset } from "../interfaces/iAsset";
import { iLocation } from "../interfaces/iLocation";
import { iTreeBranch, iTreeNodeAssets } from "../interfaces/iTree";


export async function fetchCompanyById(id: string): Promise<iTreeBranch[]> {
    const locations = await fetchData<iLocation>(id, 'locations');
    const assets = await fetchData<iAsset>(id, 'assets');

    const locationLookup = GenerateLocationTree(locations, assets)
    console.log(locationLookup)


    return locationLookup
}

function GenerateAssetsTree(assetsTree: iTreeNodeAssets[]): iTreeNodeAssets[] {
    const lookup: { [key: string]: iTreeNodeAssets } = {};
    const rootsAssets: iTreeNodeAssets[] = [];

    assetsTree.forEach(item => {
        const node: iTreeNodeAssets = {
            id: item.id,
            name: item.name,
            parentId: item.parentId,
            gatewayId: item.gatewayId,
            locationId: item.locationId,
            sensorId: item.sensorId,
            status: item.status,
            sensorType: item.sensorType,
            type: determineAssetType(item),
            children: []
        };

        lookup[item.id] = node;
    });
    
    assetsTree.forEach(item => {
        const node = lookup[item.id];

        if (item.parentId) {
            
            if (lookup[item.parentId]) {
                lookup[item.parentId].children!.push(node);
            } else {
                lookup[item.parentId] = {
                    id: item.parentId,
                    name: '',
                    parentId: null,
                    gatewayId: undefined,
                    locationId: undefined,
                    sensorId: undefined,
                    status: undefined,
                    sensorType: undefined,
                    type: undefined,
                    children: [node]
                };
            }
        } else {
            rootsAssets.push(node);
        }
    });
    return rootsAssets;
}

function GenerateLocationTree(locationFlatJsonObject: iTreeBranch[], assets: iAsset[]): iTreeBranch[] {
    const assetsTree = GenerateAssetsTree(assets)
    const componentWithoutLocation = assetsTree.filter((component) => component.type == "ComponentWithoutLocation")

    const lookup: { [key: string]: iTreeBranch } = {};
    const rootsLocation: iTreeBranch[] = [];

    locationFlatJsonObject.forEach(location => {
        const node: iTreeBranch = {
            id: location.id,
            name: location.name,
            parentId: location.parentId,
            type: 'Location',
            children: []
        };

        lookup[location.id] = node;
    });


    locationFlatJsonObject.forEach(location => {
        const node = lookup[location.id];

        if (location.parentId) {
            
            if (lookup[location.parentId]) {
                lookup[location.parentId].children!.push(node);
            } else {
                lookup[location.parentId] = {
                    id: location.parentId,
                    name: "",
                    parentId: null,
                    type: "Location",
                    children: [node]
                };
            }
        } else {
            const assets = assetsTree.filter(asset => asset.locationId == node.id)
            node.children!.push(...assets)
            rootsLocation.push(node);
        }
    });
    const result = rootsLocation.concat(componentWithoutLocation)
    return result
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