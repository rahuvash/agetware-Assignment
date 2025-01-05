import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/productSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [productData, setProductData] = useState({
    id: "",
    title: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAddOrUpdate = () => {
    if (isEditing) {
      const updatedProducts = products.map((prod) =>
        prod.id === productData.id ? productData : prod
      );
      setProducts(updatedProducts);
      dispatch(updateProduct(productData));
    } else {
      const newProduct = { ...productData, id: Date.now().toString() };
      setProducts([...products, newProduct]);
      dispatch(addProduct(newProduct));
    }
    setProductData({ id: "", title: "", price: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setProductData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
    dispatch(deleteProduct(id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">
          {isEditing ? "Edit Product" : "Add Product"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Product List</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="p-3 border">{product.title}</td>
                <td className="p-3 border">${product.price}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-400 hover:text-white`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
