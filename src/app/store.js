import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../states/contentReducer";

export const store=configureStore({
    reducer:{
        content: contentReducer
    }
}
)