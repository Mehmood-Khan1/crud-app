import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [todo, setTodo] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api');
      const result = await response.json();

      if (response.ok) {
        setTodo(result);
        console.log(result);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodo(todo.filter(product => product._id !== id));
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mt-3">All Products</h2>
        <div className="mt-3 mb-3 text-right">
          <Link to="/add" className="btn btn-success">
            Add New Product
          </Link>
        </div>

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todo.length > 0 ? (
              todo.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                      style={{ height: "100px" }}
                    />
                  </td>
                  <td>
                    <Link to={`/product/${product._id}`} className="btn btn-success btn-sm">
                      Show
                    </Link>

                    <Link to={`/edit/${product._id}`} className="btn btn-warning btn-sm">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Read;
