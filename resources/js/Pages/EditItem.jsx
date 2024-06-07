import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/form.css';

const EditItem = ({ item }) => {
    const [formData, setFormData] = useState({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        status: item.status,
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('status', formData.status);

        if (image) {
            data.append('image', image);
        }

        Inertia.post(`/items/${item.id}`, data, {
            onFinish: () => {
                alert('Item updated successfully!');
                Inertia.visit('/items');
            },
        });
    };

    return (
        <div className="container">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="available">Available</option>
                        <option value="notavailable">Not Available</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Item</button>
            </form>
        </div>
    );
};

export default EditItem;
