import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import './StreamChat.css'

function CatButton() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GET_CATS);
                const json = await response.json();
                const arr = Object.entries(json);
                setCats(arr)
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchData();
    }, []);

    return (
        <Button variant='primary'></Button>
    )
}

export default CatButton;