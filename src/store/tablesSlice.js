import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadTablesApi } from "../Api";

// ✅ Async thunk for loading table previews
export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async (selectedTables, { rejectWithValue }) => {
    try {
      const response = await loadTablesApi(selectedTables);
      if (response?.status === "tables loaded") {
        return {
          tables: response.tables || [],
          previews: response.previews || {},
        };
      } else {
        return rejectWithValue("Error loading tables");
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    selectedTable: [],
    LoadedTable: [],
    tablePreview: {},
    status: "idle",
    error: null,
  },
  reducers: {
    toggleSelectTable: (state, action) => {
      const table = action.payload;
      if (state.selectedTable.includes(table)) {
        state.selectedTable = state.selectedTable.filter((t) => t !== table);
      } else {
        state.selectedTable.push(table);
      }
    },
    removeTable: (state, action) => {
      const index = action.payload;
      const fileToRemove = state.LoadedTable[index];
      state.LoadedTable.splice(index, 1);
      state.selectedTable.splice(index, 1);
      delete state.tablePreview[fileToRemove];
    },
    clearAllTables: (state) => {
      state.selectedTable = [];
      state.LoadedTable = [];
      state.tablePreview = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.LoadedTable = action.payload.tables;
        state.tablePreview = {
          ...state.tablePreview,
          ...action.payload.previews,
        };
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleSelectTable, removeTable, clearAllTables } =
  tablesSlice.actions;

export default tablesSlice.reducer;
