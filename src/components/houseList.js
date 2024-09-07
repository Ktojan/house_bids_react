import HouseRow, { HouseRowMem } from "./houseRow";
import AddHouse from "./addHouse";
import useHousesHook from "../hooks/useHouses";
import LoadingIndicator, {loadingStatus} from "./loadingIndicator";

const HouseList = () => { 
    const { HOUSES, countries, setHouses, actualLoadingState } = useHousesHook();  // example custom hook

    if (actualLoadingState !== loadingStatus.loaded)
        return <LoadingIndicator loadingState={actualLoadingState}/>;

    return (
        <>
            <AddHouse setHouses={setHouses} HOUSES={HOUSES} countries={countries}/>
            <div className="row mb-2">
                <h3 className="text-center">
                Collection of paranormal houses for weird but rich people</h3>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Paranormal Features</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {HOUSES.sort((a,b) => a.id - b.id).map(h =>
                         <HouseRowMem key={h.id} house = {h} />
                    )}
                </tbody>
            </table>            
        </>
    )
}

export default HouseList;
