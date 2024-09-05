import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShowProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

const fetchProductDetail = async () => {
    const response = await fetch(`http://localhost:4000/api/product/${id}`);
    const singleProduct = await response.json();

    if (response.ok) {
        setProduct(singleProduct);
    } else {
        console.log(singleProduct.error);
    }
}

useEffect(() => {
    fetchProductDetail();
}, [id]);


return (
    <div className="container d-flex flex-column justify-content-center mt-4">
      <div className="row text-center">
        <div className="col-12 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid border rounded"
            style={{
              height: "300px",
              maxWidth: "100%",
              aspectRatio: "3/2",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="col-6 offset-3 border p-4 rounded">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
  
  
}