export interface iAsset {
    id: string;
    locationId?: string | null;
    name: string;
    parentId: string | null;
    sensorId?: string;
    sensorType?: "energy" | "vibration" | null;
    status?: "operating" | "alert" | null;
    gatewayId?: string;
}