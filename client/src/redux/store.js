import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import rootReducer from "./reducers/index";

// const persistConfig = {
//     key: "redux",
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// const persistor = persistStore(store);

const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            {children}
            {/* </PersistGate> */}
        </Provider>
    );
};

export default DataProvider;
