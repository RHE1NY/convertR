import {createStore} from "redux";
import {historyReducer} from "./historyReducer";



export const store = createStore(historyReducer);