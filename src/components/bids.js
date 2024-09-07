import { useEffect, useState } from "react";
import LoadingIndicator, {loadingStatus} from "./loadingIndicator";

export default function Bids ( {houseId} ) {
    const emptyBid = {
        houseId: houseId,
        bidder: "",
        amount: 0
    }
    // const { HOUSES, setHouses, actualLoadingState } = useHousesHook();
    const [ Bids, setBids ] = useState([]);
    const [ newBid, setNewBid ] = useState(emptyBid);
    const [ actualLoadingState, setLoadingState ] = useState(loadingStatus.isLoading);

    useEffect(() => {
        const getBids = async () => {
            setLoadingState(loadingStatus.isLoading);
            try {
                const response = await fetch(`/api/bids/${houseId}`);
                const receivedBids = await response.json();
                setBids(receivedBids);
                setLoadingState(loadingStatus.loaded);
            } catch {
                setLoadingState(loadingStatus.hasErrored);
            }
        };
        getBids();
    }, [houseId])

    function addBit(newBid) {
        const biggestAmount = Math.max(...Bids.map(bid => bid.amount));
        if (newBid.amount <= biggestAmount) {
            alert('Should be grater amount than the last bid');
            return;
        }
        if (newBid) {
            fetch(`/api/bids/${newBid.houseId}`, {
                method: 'POST',
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBid)
            }).then(async response => {
                const newPostedBid = await response.json();
                setBids([ ...Bids, newPostedBid ]);
                setNewBid(emptyBid);
            }).catch(er => console.error(er))
        } 
    }

    function submitNewBit(e) {
        e.preventDefault();
        addBit(newBid);
    }

    if (actualLoadingState !== loadingStatus.loaded) 
        return <LoadingIndicator loadingState={actualLoadingState}/>;

    return (
        <>
            { (Bids && Bids.length === 0)
                    ? <h2 className="rosy-text">No Bids for this strange stuff</h2>
                    : 
            (<table className="table">
                <thead>
                    <tr>
                        <th>Bidder</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    { Bids.map( bid => 
                    (<tr key={bid.id} style={{cursor: 'default'}}>
                        <td>{bid.bidder}</td>
                        <td>{bid.amount}</td>
                    </tr>
                    ))}
                </tbody>
            </table>)}
              
            <form onSubmit={submitNewBit} className="add-house-form row">
                <div className="col-4">
                    <input type="text"  name="bidder" placeholder="Bidder"
                    value={newBid.bidder} 
                    onChange={e => setNewBid({ ...newBid, bidder: e.target.value}) }/> 
                </div>
                <div className="col-3">
                    <input type="number"  name="price"
                    value={newBid.amount}
                    onChange={e => setNewBid({ ...newBid, amount: parseInt(e.target.value) }) }/> 
                </div>
                <div className="col-2">
                    <button className="btn add-new-button" type="submit">Add</button>
                </div>
                <div className="col-2"> 
                    <img width={'100%'} src="/houseImages/doll-head.jpg" alt="scary doll" title="scary doll" /> 
                </div>
            </form>
        </>
    )
}

