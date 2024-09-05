import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/product/${id}`);
      const singleProduct = await response.json();

      if (response.ok) {
        setProduct(singleProduct);
      } else {
        setError(singleProduct.error || "Failed to fetch product details.");
      }
    } catch (error) {
      setError("An error occurred while fetching product details.");
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/${id}/edit`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Product updated successfully.");
        navigate('/');
      } else {
        setError(result.error || "Failed to update product.");
      }
    } catch (error) {
      setError("An error occurred while updating the product.");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container my-5 row offset-md-3 col-md-6">
      <h2 className="text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {success && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {success}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
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
            value={product.name}
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
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          {product.image && (
            <img
              src={product.image}
              alt="Product"
              className="img-fluid mt-2"
              style={{ height: "200px" }}
            />
          )}
          <br />
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
            // accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
