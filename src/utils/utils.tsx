import { Dispatch } from "@reduxjs/toolkit";
import { iAsset } from "../interfaces/iAsset";
import { iLocation } from "../interfaces/iLocation";
import { iTreeBranch, iTreeNodeAssets, iTreeNodeLocations } from "../interfaces/iTree";
import { setCompanyTree } from "../features/companyTree/companyTreeSlicer";



export async function fetchCompanyById(id: string, dispatch: Dispatch) {
    const locations: iLocation[] = [];
    const assets: iAsset[] = [];


    function handleAssetsChunk(chunk:iAsset[]) {
        assets.push(...chunk);
        updateTreeIfPossible();
    };


    function handleLocationsChunk(chunk: iLocation[]) {
        locations.push(...chunk);
        updateTreeIfPossible();
    };

    function updateTreeIfPossible() {
        if (locations.length > 0 && assets.length > 0) {
            const tree = SortNodesByChildrenCount(GenerateLocationsRoots(locations, assets));
            
            dispatch(setCompanyTree(tree));
        }
    };

    await Promise.all([
        fetchDataWithStreaming<iLocation>(`${import.meta.env.VITE_FAKE_API}/companies/${id}/locations`, handleLocationsChunk),
        fetchDataWithStreaming<iAsset>(`${import.meta.env.VITE_FAKE_API}/companies/${id}/assets`, handleAssetsChunk)
    ]);
}

const SortNodesByChildrenCount = (nodes: iTreeBranch[]): iTreeBranch[] => {
    return nodes.sort((a, b) => b.children!.length - a.children!.length);
};

function GenerateAssetsRoots(assetsTree: iTreeNodeAssets[]) {
    const nodeMap: { [key: string]: iTreeNodeAssets } = {};
    const rootsAssets: iTreeNodeAssets[] = [];

    assetsTree.forEach(asset => {
        const assetCopy = { ...asset, children: [] };
        assetCopy.type = determineAssetType(asset);
        nodeMap[asset.id] = assetCopy;
    });

    assetsTree.forEach(asset => {
        const assetCopy = nodeMap[asset.id];
        if (asset.parentId) {
            const parent = nodeMap[asset.parentId];
            if (parent) {
                parent.children!.push(assetCopy);
            }
        } else {
            rootsAssets.push(assetCopy);
        }
    });

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

async function fetchDataWithStreaming<T>(endpoint: string, onObjectParsed: (chunk: T[]) => void) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let jsonString = "";
        while (true) {
            console.log("Passei aqui")
            const { done, value } = await reader.read();
            if (done) break;
            jsonString += decoder.decode(value, { stream: true });
            onObjectParsed(JSON.parse(jsonString))
        }
        
    } catch (error) {
        console.error('Failed to fetch data:', error);
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