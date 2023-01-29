import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { GET_CATS } from './chatAPI';


function CatStream() {
    const [cats, setCats] = useState("");
    
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

    let sorted_cats = []
    if (Array.isArray(cats)) {
        sorted_cats = cats.sort((a, b) => {
            return a[1] - b[1];
        })
    }

    const rows = sorted_cats.map((value, index) => {
        return (
            <tr className='cat-row'>
                <td>{index + 1}</td>
                <td>{value[0]}</td>
            </tr>
        )
    })

    // console.log(sorted_cats);

    return (
        <div>
            <Table striped bordered hover className='leaders'>
                <thead>
                    {rows}
                </thead>
            </Table>
            <div className='cat-buttons'>
                <Button variant='primary'>Hello</Button>
            </div>
        </div>
    )
}

export default CatStream;