import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/form.css';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
    status: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const file = type === "file" ? files[0] : null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file || value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", price: "", quantity: "", image: "", status: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.price || !/^\d+$/.test(formData.price)) {
      newErrors.price = "Price must be a valid number.";
      isValid = false;
    }

    if (!formData.quantity || !/^\d+$/.test(formData.quantity)) {
      newErrors.quantity = "Quantity must be a valid number.";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Image is required.";
      isValid = false;
    } else if (!["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(formData.image.type)) {
      newErrors.image = "Invalid image format. Only jpeg, png, jpg, and gif are allowed.";
      isValid = false;
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required.";
      isValid = false;
    } else if (!["available", "notavailable"].includes(formData.status.toLowerCase())) {
      newErrors.status = "Status must be 'available' or 'notavailable'.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("quantity", formData.quantity);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("status", formData.status);

        await Inertia.post("/create", formDataToSend);
        setFormData({
          name: "",
          price: "",
          quantity: "",
          image: null,
          status: "",
        });
        Inertia.visit("/dashboard", { method: "get" });
        alert("Successfully Added.");
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
        alert("Error occurred while submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add New Item</h2>
      <div className="form-border">
        <form onSubmit={handleSubmit} className="item-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Item Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              className="form-control"
              required
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              className="form-control"
              required
            />
            {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.image && <div className="text-danger">{errors.image}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <input
              type="text"
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.status && <div className="text-danger">{errors.status}</div>}
          </div>
          <button
            type="submit"
            disabled={!formData.name || !formData.price || !formData.quantity || !formData.image || !formData.status}
            className="btn btn-primary btn-frame"
          >
            Submit
          </button>
          <InertiaLink href="/dashboard" className="btn btn-secondary ms-2">
            Cancel
          </InertiaLink>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
