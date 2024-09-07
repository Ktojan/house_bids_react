import { useState } from "react";

export default function AddHouse({ setHouses, HOUSES, countries }) {
    const defaultObject = { country: countries[0], address: '', description: '', price: ''}
    const [newHouse, setNewHouse] = useState(defaultObject);

    function inputChange(e) { 
        const val = (e.target.name === 'price' && e.target.value) ? Number(e.target.value) : e.target.value;
        setNewHouse({ ...newHouse, [e.target.name]: val});
    } 

    function submitNewHouse(e) {
        e.preventDefault();
        console.log('Adding new house: ', newHouse);
        if (!newHouse || !newHouse.address || newHouse.address.length < 5 || !newHouse.price) {
            alert('Check, please, that you have provided a valid price and address is not too short')
        } else {
            addHouse(newHouse);
        }
    }

    function addHouse(newHouse) {
        fetch('/api/houses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHouse)
        }).then(async response => {
            const newPostedHouse = await response.json();
            setHouses([ ...HOUSES, newPostedHouse ]);
            setNewHouse(defaultObject);
        }).catch(er => console.error(er))
    }

    return (
    <details>
        <summary>Add new house</summary>               
        <form onSubmit={submitNewHouse} className="add-house-form row">
        <div className="col-3">
            <label>Address *</label>
            <input type="text"  name="address"
            value={newHouse.address} onChange={inputChange}/>
        </div>
        <div className="col-2">
            <label>Country </label>
            <select name="country" value={newHouse.country} onChange={inputChange}>
                {countries.map((country, i) => 
                    <option value={country} key={i}>{country}</option>
                )}
            </select>            
        </div>
        <div className="col-2">
            <img width={'100%'} src="./hands1.webp" alt="ghost" title="just a ghost" /> 
        </div>
        <div className="col-1">
            <label>Price, $ *</label>
            <input type="number"  name="price"
            value={newHouse.price} onChange={inputChange}/>
        </div>
        <div className="col-3">
            <label>Description </label>
            <textarea rows="1" type="text" name="description" style={{display: 'block', width: '100%'}}
            value={newHouse.description}  onChange={inputChange}/>
        </div>      
        <div  className="col-1">
            <button className="btn add-new-button" type="submit" style={{padding: '0.8rem 1.2rem'}}>Add</button>
        </div>
        </form>       
    </details>
)
}
