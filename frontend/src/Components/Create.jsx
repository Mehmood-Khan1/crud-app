import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const [form, setForm] = useState({
        name: "",
        description: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch("http://localhost:4000/api/add", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            
            if (!response.ok) {
                console.log(result.error);
            } else {
                navigate('/');
                console.log(result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="container my-3 row offset-3 col-6">
            <h2 className="text-center">Add a new Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Product Name"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter Product Description"
                        name="description"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>
                <span>
                    <button type="submit" className="btn btn-dark">
                        Submit
                    </button>
                </span>
            </form>
        </div>
    );
}

export default Create;

  