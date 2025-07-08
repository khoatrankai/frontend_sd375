import { configureStore } from "@reduxjs/toolkit";
import statusMenu from "./slices/menu.slice";
import userSlice from "./slices/usersSlices/user.slide";
export const store = configureStore({
  reducer: {
    status_tab_menu: statusMenu,
    get_profile: userSlice,
  },
});

// Tạo các type cho RootState và AppDispatch để sử dụng TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
