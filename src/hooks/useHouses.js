import { useEffect, useState } from "react";
import { loadingStatus } from "../components/loadingIndicator";


function useHousesHook() {
    const [HOUSES, setHouses] = useState([]);
    const [countries, setCountries] = useState([]);
    const [ actualLoadingState, setLoadingState ] = useState(loadingStatus.isLoading);

    useEffect(() => {
        const getHouses = async () => {
            setLoadingState(loadingStatus.isLoading);
            try {
                const response = await fetch('/api/houses');
                const fetchedHouses = await response.json();
                setHouses(fetchedHouses);
                const countriesUnique = [...new Set(fetchedHouses.map(h => h.country))]; // to avoid duplicates
                setCountries(countriesUnique);
                setLoadingState(loadingStatus.loaded);
            } catch {
                setLoadingState(loadingStatus.hasErrored);
            }
        };
        getHouses();
    }, [])
    return { HOUSES, countries, setHouses, actualLoadingState };
}

export default useHousesHook;
