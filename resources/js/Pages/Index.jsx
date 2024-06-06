import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/list.css';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get('/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching item data: ', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`/items/${id}`)
                .then(response => {
                    setItems(items.filter(item => item.id !== id));
                    alert("Successfully Deleted");
                })
                .catch(error => {
                    console.error('Error deleting item: ', error);
                    alert("Error deleting item");
                });
        }
    };

    // const handleStatusChange = (id, status) => {
    //     axios.put(`/items/${id}`, { status })
    //         .then(response => {
    //             console.log('Status change response:', response.data);
    //             fetchItems();
    //             alert("Status changed successfully");
    //         })
    //         .catch(error => {
    //             console.error('Error changing item status: ', error);
    //             alert("Error changing item status");
    //         });
    // };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Item List</h2>
            <input
                type="text"
                className="search-bar"
                placeholder="Search items by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Available Quantity</th>
                            <th scope="col">Image</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <img 
                                        src={`./images/${item.image}`}
                                        alt={item.name}
                                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                                    />
                                </td>
                                <td>{item.quantity === 0 ? 'Not-Available' : item.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="btn btn-sm btn-success ms-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-danger ms-2"
                                    >
                                        Delete
                                    </button>
                                    {/* <button
                                        onClick={() => handleStatusChange(item.id, item.status === 'available' ? 'notavailable' : 'available')}
                                        className={`btn btn-sm ${item.status === 'available' ? 'btn-warning' : 'btn-success'} ms-2`}
                                    >
                                        {item.status === 'available' ? 'Not-available' : 'Available'}
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
