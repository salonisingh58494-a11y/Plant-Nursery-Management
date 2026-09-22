import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const [newPrice, setNewPrice] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/admin/products",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data || []);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  /* ================= ADD PRODUCT (FIXED ROUTE) ================= */

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and Price are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/products", // ✅ FIXED
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) => [res.data, ...prev]);
      setShowAddModal(false);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.error("Add Error:", error.response?.data || error.message);
    }
  };

  /* ================= DELETE ================= */

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  /* ================= PUBLISH / UNPUBLISH ================= */

  const changeVisibility = async (product) => {
    try {
      const newStatus =
        product.status === "active" ? "inactive" : "active";

      const res = await axios.put(
        `http://localhost:5000/api/admin/products/${product._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? res.data : p
        )
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  /* ================= UPDATE PRICE ================= */

  const openPriceModal = (product) => {
    setSelectedProduct(product);
    setNewPrice(product.price);
    setShowPriceModal(true);
  };

  const updatePrice = async () => {
    if (!newPrice) return alert("Enter valid price");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/products/${selectedProduct._id}`,
        { price: newPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? res.data : p
        )
      );

      setShowPriceModal(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="admin-products">
      <div className="header">
        <h1>Manage Products</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>

                  <td className="desc-cell">
                    {product.description}
                  </td>

                  <td>
                    ₹{product.price}
                    <button
                      className="price-btn"
                      onClick={() => openPriceModal(product)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>{product.stock}</td>

                  <td>
                    <span
                      className={`status ${
                        product.status === "active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {product.status === "active"
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>

                  <td>
                    <button
                      className={
                        product.status === "active"
                          ? "unpublish-btn"
                          : "publish-btn"
                      }
                      onClick={() => changeVisibility(product)}
                    >
                      {product.status === "active"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Product</h2>

            <input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />

            <input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <input
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={addProduct}>Add</button>
              <button onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRICE MODAL */}
      {showPriceModal && (
        <div className="modal">
          <div className="modal-content small">
            <h2>Update Price</h2>

            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={updatePrice}>Update</button>
              <button onClick={() => setShowPriceModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;