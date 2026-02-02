import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSubmit, buttonText = 'Save' }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        isActive: true
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                stock: initialData.stock || '',
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || Number(formData.price) < 0) newErrors.price = 'Valid price is required';
        if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Valid stock is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ borderColor: errors.name ? 'var(--danger-color)' : '' }}
                />
                {errors.name && <span style={{ color: 'var(--danger-color)', fontSize: '0.85em' }}>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        style={{ borderColor: errors.price ? 'var(--danger-color)' : '' }}
                    />
                    {errors.price && <span style={{ color: 'var(--danger-color)', fontSize: '0.85em' }}>{errors.price}</span>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        style={{ borderColor: errors.stock ? 'var(--danger-color)' : '' }}
                    />
                    {errors.stock && <span style={{ color: 'var(--danger-color)', fontSize: '0.85em' }}>{errors.stock}</span>}
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    style={{ width: 'auto', marginBottom: 0 }}
                />
                <label style={{ marginBottom: 0 }}>Is Product Active?</label>
            </div>

            <button type="submit" className="primary">{buttonText}</button>
        </form>
    );
};

export default ProductForm;
