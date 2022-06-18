import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {routes} from './routes'
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from "./Redux/Store";
import Layout from "./hoc/Layout";
import NotFound from "./screens/NotFound";

let persistor = persistStore(store);
const App = (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <div>
                        <Routes>
                            {routes.map(({element,...rest}, index)=> {
                                let Component = Layout(element)
                                return(
                                    <Route key={index} element={<Component {...rest}/>} {...rest}  />
                                )
                            })}
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
};

export default App;
