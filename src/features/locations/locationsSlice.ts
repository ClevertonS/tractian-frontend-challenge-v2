import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { iLocation } from "../../interfaces/iLocation"

const initialState: iLocation[] = []

export const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        setLocations(state, action: PayloadAction<iLocation[]>) {
            return action.payload
        },
        cleanLocations() {
            return []
        }
    }
})

export const {setLocations, cleanLocations} = locationsSlice.actions;
export default locationsSlice.reducer;