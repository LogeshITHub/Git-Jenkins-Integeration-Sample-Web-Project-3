import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        try {
            await createProduct(data);
            navigate('/');
        } catch (err) {
            setError('Failed to create product. Please try again.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card">
                <h1 style={{ marginBottom: '1.5rem' }}>Add New Product</h1>
                {error && <div className="error-message">{error}</div>}
                <ProductForm onSubmit={handleSubmit} buttonText="Create Product" />
            </div>
        </div>
    );
};

export default AddProduct;
