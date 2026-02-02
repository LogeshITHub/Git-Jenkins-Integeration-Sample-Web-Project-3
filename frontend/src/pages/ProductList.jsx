import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h1>Products</h1>
                <Link to="/add" className="button primary" style={{ display: 'inline-block', padding: '0.6em 1.2em', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: 'var(--radius)' }}>
                    Add Product
                </Link>
            </div>

            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                                    <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>{product.description}</div>
                                </td>
                                <td>${product.price ? product.price.toFixed(2) : '0.00'}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span style={{
                                        padding: '0.25em 0.5em',
                                        borderRadius: '4px',
                                        fontSize: '0.85em',
                                        backgroundColor: product.isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: product.isActive ? '#10b981' : '#ef4444'
                                    }}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <Link to={`/edit/${product.id}`} className="button" style={{ fontSize: '0.9em', textDecoration: 'none', display: 'inline-block' }}>Edit</Link>
                                        <Link to={`/delete/${product.id}`} className="button danger" style={{ fontSize: '0.9em', textDecoration: 'none', display: 'inline-block' }}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
