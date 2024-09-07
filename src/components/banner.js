// import styles from "./banner.css"
import { useContext } from "react";
import { logo } from "./banner.module.css"
import { navigationContext } from "./app";
import navValues from "../helpers/navValues";
import cn from 'classnames';

const Banner = ({headerText, aboutProject}) => {
    
    const { navigate } = useContext(navigationContext);
    return (
        <header className="row mb-4">
            <div className="col-3"> 
                <img
                onClick={() => navigate(navValues.home)}
                // className={logo + ' pointer ' + bordered}
                className={cn(logo, 'pointer')}  // example classnames
                src="./logo2.jpeg" alt="logo" title="click to main page" />
            </div>
            <div className="col-8 text-xxl offset-1">
                <h2>{headerText}</h2>
                <p><i>{aboutProject}</i></p>
            </div>
        </header>
    )
}

export default Banner;
