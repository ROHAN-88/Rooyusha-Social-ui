import { configureStore } from "@reduxjs/toolkit";

import darkModeReducer from "./darkThemeSlice";
export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});
