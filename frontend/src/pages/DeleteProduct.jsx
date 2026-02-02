import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, deleteProduct } from '../services/api';

const DeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load product');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteProduct(id);
            navigate('/');
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <div className="card">
                <h2 style={{ marginBottom: '1rem', color: 'var(--danger-color)' }}>Delete Product</h2>
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>

                <div style={{ margin: '2rem 0', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)' }}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p style={{ marginTop: '0.5rem' }}>Price: <strong>${product.price}</strong></p>
                </div>

                <div className="actions" style={{ justifyContent: 'flex-end' }}>
                    <button onClick={handleDelete} className="danger">Yes, Delete It</button>
                    <Link to="/" className="button">Cancel</Link>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
