import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaikhoanForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { maTK } = useParams();

    useEffect(() => {
        if (maTK) {
            axios.get(`http://localhost:8080/tai_khoan/getId/${maTK}`)
                .then(response => {
                    const tk = response.data;
                    setValue('maTK', tk.maTK);
                    setValue('maKH', tk.maKH);
                    setValue('maVT', tk.maVT);
                    setValue('matkhau', tk.matkhau);
                    setValue('email', tk.email);

                })
                .catch(error => {
                    console.error('Error fetching tk:', error);
                    toast.error('Failed to fetch product data.');
                });
        }
    }, [maTK, setValue]);

    const onSubmit = (data) => {
        const tk = { ...data };

        const apiCall = maTK
            ? axios.put(`http://localhost:8080/tai_khoan/update/${maTK}`, tk)
            : axios.post('http://localhost:8080/tai_khoan/create', tk);

        apiCall
            .then(() => {
                toast.success(`Tk ${maTK ? 'updated' : 'created'} successfully!`);
                setTimeout(() => navigate('/tai_khoan'), 2000);
            })
            .catch(error => {
                console.error(`Error ${maTK ? 'updating' : 'creating'} tk:`, error);
                toast.error(`Failed to ${maTK ? 'update' : 'create'} product.`);
            });
    };

    return (
        <div className="container mt-5">
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>{maTK ? 'Edit Tk' : 'Tai khoan'}</h2>
                <div className="mb-3">
                    <label htmlFor="maTK" className="form-label">Ma tai khoan</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="maTK"
                        {...register('maTK', {required: 'Matk is required'})}
                    />
                    {errors.maTK && <span className="text-danger">{errors.maTK.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="maKH" className="form-label">Ma khach hang</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="maKH"
                        {...register('maKH', {required: 'Makh is required'})}
                    />
                    {errors.maKH && <span className="text-danger">{errors.maKH.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="maVT" className="form-label">Ma vai tro</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="mavT"
                        {...register('maVT', {required: 'Mavt is required'})}
                    />
                    {errors.maVT && <span className="text-danger">{errors.maVT.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="email"
                        {...register('email', {required: 'Email is required'})}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="matkhau" className="form-label">Mat khau</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="matkhau"
                        {...register('matkhau', {required: 'Maukhau is required'})}
                    />
                    {errors.matkhau && <span className="text-danger">{errors.matkhau.message}</span>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/tai_khoan')}>Cancel
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default TaikhoanForm;
