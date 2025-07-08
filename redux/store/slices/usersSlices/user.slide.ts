import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStateRedux } from "@/models/responseInterface";
import { authService } from "@/services/auth.service";

const initialState: DataStateRedux<any> = {
  datas: undefined,
  loading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  "user/fetchProfiles",
  async (filters: { project: string } | undefined, thunkAPI) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch works");
    }
  }
);

// export const fetchYearWorks = createAsyncThunk(
//   "work/fetchYearWorks",
//   async (year: number, thunkAPI) => {
//     try {
//       const response = await activityService.getAllYearWorks(year);
//       return response;
//     } catch {
//       return thunkAPI.rejectWithValue("Failed to fetch works");
//     }
//   }
// );

// export const createWork = createAsyncThunk(
//   "work/createWork",
//   async (data: ICreateWork, thunkAPI) => {
//     try {
//       const response = await activityService.createWork(data);
//       return response;
//     } catch {
//       return thunkAPI.rejectWithValue("Failed to create work");
//     }
//   }
// );

// export const updateWork = createAsyncThunk(
//   "work/updateWork",
//   async (
//     { work_id, data }: { work_id: string; data: IUpdateWork },
//     thunkAPI
//   ) => {
//     try {
//       const response = await activityService.updateWork(work_id, data);
//       return response;
//     } catch {
//       return thunkAPI.rejectWithValue("Failed to update work");
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
  },
}).reducer;

export default userSlice;
