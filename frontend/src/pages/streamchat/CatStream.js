import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { DONATE, GET_CATS } from './chatAPI';

// class CatStream extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             cats: [],
//             clicks: 0,
//         }

//         // this.updateCatsHandler = this.updateCatsHandler.bind(this);
//     }

//     async fetchData() {
//         try {
//             const response = await fetch(GET_CATS);
//             const json = await response.json();
//             const arr = Object.entries(json);
//             this.setState({cats: arr});
//         } catch (error) {
//             console.log("error", error);
//         }
//     }

//     componentDidMount() {
//         this.fetchData();
//     }

//     // componentDidUpdate() {
//     //     this.fetchData();
//     // }

//     updateCats(value) {
//         console.log(value);
//         fetch(DONATE, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({'cat': value})
//         }).then(resp => {
//             console.log("hello")
//             // this.fetchData();
//         });
//     }

//     updateCatsHandler(value) {
//         this.updateCats(value);
//         // this.fetchData();
//     }

//     render() {        
//         // const rows = ;

//         // const buttons = this.state.cats.sort((a, b) => {
//         //         return a[1] - b[1];
//         //     }).map(value => {
//         //     return (
//         //         <Button
//         //             variant='primary'
//         //             onClick={() => {updateCatsHandler}}
//         //         >
//         //             {value[0]}
//         //         </Button>
//         //     );
//         // });


//         return (
//             <div>
//                 <Table striped bordered hover className='leaders'>
//                     <thead>
//                         {this.state.cats.sort((a, b) => {
//                             return b[1] - a[1];
//                         }).map((value, index) => {
//                             return (
//                                 <tr className='cat-row'>
//                                     <td>{index + 1}</td>
//                                     <td>{value[0]}</td>
//                                     <td>{value[1]}</td>
//                                 </tr>
//                             );
//                         })}
//                     </thead>
//                 </Table>
//                 <div className='cat-buttons'>
//                     {this.state.cats.sort((a, b) => {
//                             return b[1] - a[1];
//                         }).map(value => {
//                         return (
//                             <Button
//                                 variant='primary'
//                                 onClick={this.updateCatsHandler(value[0])}
//                             >
//                                 {value[0]}
//                             </Button>
//                         );
//                     })}
//                 </div>
//             </div>
//         )
//     }
// }

function CatStream() {
    const [cats, setCats] = useState("");
    let sorted_cats = []
    
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
    }, [cats]);

    if (Array.isArray(cats)) {
        sorted_cats = cats.sort((a, b) => {
            return b[1] - a[1];
        })
    }

    const rows = sorted_cats.map((value, index) => {
        return (
            <tr className='cat-row'>
                <td>{index + 1}</td>
                <td>{value[0]}</td>
                <td>{value[1]}</td>
            </tr>
        );
    });

    const buttons = sorted_cats.map(value => {
        return (
            <Button
                variant='primary'
                onClick={() => {
                    fetch(DONATE, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({'cat': value[0]})
                    });

                    setCats(cats);
                }}
            >
                {value[0]}
            </Button>
        );
    });

    // console.log(sorted_cats);

    return (
        <div>
            <Table striped bordered hover className='leaders'>
                <thead>
                    {rows}
                </thead>
            </Table>
            <h3>Donate</h3>
            <div className='cat-buttons'>
                {buttons}
            </div>
        </div>
    )
}

export default CatStream;