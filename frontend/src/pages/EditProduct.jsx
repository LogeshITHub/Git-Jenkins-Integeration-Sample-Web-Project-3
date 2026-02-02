import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/api';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
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

    const handleSubmit = async (data) => {
        try {
            await updateProduct(id, data);
            navigate('/');
        } catch (err) {
            setError('Failed to update product. Please try again.');
        }
    };

    if (loading) return <div className="loader"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card">
                <h1 style={{ marginBottom: '1.5rem' }}>Edit Product</h1>
                <ProductForm initialData={product} onSubmit={handleSubmit} buttonText="Update Product" />
            </div>
        </div>
    );
};

export default EditProduct;
