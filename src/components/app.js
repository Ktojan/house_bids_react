import React, { useCallback, useState } from "react";
import Banner from "./banner"
import HouseList from "./houseList"
import HouseDetails from "./houseDetails"
import navValues from "../helpers/navValues"

// >>>>>>>>>>>>>>>>>  CONTEXT <<<<<<<<<<<<<<<<<<<<< //
const navigationContext = React.createContext(navValues.home);  // example GLOBAL CONTEXT

function viewsSwitch(param) {
    switch (param) {
        case navValues.home:
            return <HouseList />;
        case navValues.houseDetails: 
            return <HouseDetails />;
        default:
            return (
            <>
            <h3> There's no component for such navigation: {nav.current}</h3>
            <img src="./ghost.jpg" alt="ghost" title="just a ghost" />
            </> 
        )
    }
}

const App = () => { // param -> selected house
    const navigate =  useCallback((navTo, param) => setNav({ current: navTo, param, navigate}), []);  // 

    const [ nav, setNav ] = useState( { current: navValues.home, navigate });

    return (
        <navigationContext.Provider value={ nav }> 
            <Banner 
            headerText="I'm Andrey, and this is my demo project on basics of React 18 & Next + Bootstrap & tiny NodeJS API."
            aboutProject={`It's a kinda auction for houses - not usual ones, but with "things". 
            They all have some paranormal features. But the code is written without any "dark energy":
            only clean and optimized code, based on SOLID rules and other design patterns. Up-to-date: sept 2024`} />

        { viewsSwitch(nav.current) }

        </navigationContext.Provider>
    );
}

export { navigationContext };
export default App;
