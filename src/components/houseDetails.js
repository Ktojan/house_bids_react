import { useContext } from "react";
import { currencyFormatter } from "../helpers/currencyFormatter";
import { navigationContext } from "./app";
import navValues from "../helpers/navValues";
import Bids from "./bids";

const HouseDetails = () => {
  const { param: house, navigate } = useContext(navigationContext);
  const componentStyles = {
    borderTop: '2px solid gray',
    paddingTop: '3rem'
  }
  const imageStyles = {
    maxHeight: '70vh',
    width: 'auto',
    transform: 'rotate(-4deg)'
  }
  
  return (
    <div className="row" style={componentStyles}>
      <div className="col-6">
        <div className="row">
          <img style={imageStyles}            
            src = { "./houseImages/" + (house && house.photo ? house.photo : 'default') + ".jpg"}
            alt="House picture"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h2 className="col-8">{house && house.country}</h2>
          <button onClick={() => navigate(navValues.home)}
           className="col-2 btn btn-warning">Back</button>
        </div>
        <div className="row">
          <h5 className="col-12">{house &&  house.address}</h5>
        </div>
        <div className="row">
          <h2 className="col-12">
            {currencyFormatter.format(house && house.price)}
          </h2>
        </div>
        <div className="row">
          <div className="col-12 mt-3">{house && (house.description || house.paranormal_feature)}</div>
        </div>

        <Bids houseId={house.id}/>
      </div>
    </div>
  );
};

export default HouseDetails;
