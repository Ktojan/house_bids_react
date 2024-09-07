import React, { useContext, useState } from "react";
import { currencyFormatter } from "../helpers/currencyFormatter";
    import { navigationContext } from "./app";
import navValues from "../helpers/navValues";

const HouseRow = ({ house }) => { 
    const { currentNav, navigate } = useContext(navigationContext);
    // const priceTd = (house.price > 500000)  // example variable for condition jsx
    // ? <td className="text-primary">{currencyFormatter.format(house.price)}</td>
    // : <td>{currencyFormatter.format(house.price)}</td>

    return (
        <tr onClick={() => navigate(navValues.houseDetails, house)}>
            <td>{house.address}</td>
            <td>{house.country}</td>
            <td>{house.paranormal_feature || house.description}</td>
            { house.price > 0 &&(<td>
                {currencyFormatter.format(house.price)}</td>)}
            {/* {priceTd} */}
        </tr>
        )
}
const HouseRowMem = React.memo(HouseRow);

export default HouseRow;
export {HouseRowMem};
