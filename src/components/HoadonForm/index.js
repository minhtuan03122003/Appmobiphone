import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HoadonForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { maHD } = useParams();

    useEffect(() => {
        if (maHD) {
            axios.get(`http://localhost:8080/hoa_don/getId/${maHD}`)
                .then(response => {
                    const hd = response.data;
                    setValue('maKH', hd.maKH);
                    setValue('ngaylap', hd.ngaylap);
                    setValue('tonggia', hd.tonggia);
                    setValue('trangthaiHD', hd.trangthaiHD);

                })
                .catch(error => {
                    console.error('Error fetching hd:', error);
                    toast.error('Failed to fetch product data.');
                });
        }
    }, [maHD, setValue]);

    const onSubmit = (data) => {
        const hd = { ...data };


        const apiCall = maHD
            ? axios.put(`http://localhost:8080/hoa_don/update/${maHD}`, hd)
            : axios.post('http://localhost:8080/hoa_don/create', hd);

        apiCall
            .then(() => {
                toast.success(`Hd ${maHD ? 'updated' : 'created'} successfully!`);
                setTimeout(() => navigate('/hoa_don'), 2000);
            })
            .catch(error => {
                console.error(`Error ${maHD ? 'updating' : 'creating'} hd:`, error);
                toast.error(`Failed to ${maHD ? 'update' : 'create'} product.`);
            });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{maHD ? 'Edit Hd' : 'Hoa don'}</h2>
                <div className="mb-3">
                    <label htmlFor="maHD" className="form-label">Ma hoa don</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="maHD"
                        {...register('maHD', {required: 'Mahd is required'})}
                    />
                    {errors.maHD && <span className="text-danger">{errors.maHD.message}</span>}
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
                    <label htmlFor="ngaylap" className="form-label">Ngay lap</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="ngaylap"
                        {...register('ngaylap', {required: 'Ngaylap is required'})}
                    />
                    {errors.ngaylap && <span className="text-danger">{errors.ngaylap.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="tonggia" className="form-label">Tong gia</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="email"
                        {...register('tonggia', {required: 'Tonggia is required'})}
                    />
                    {errors.tonggia && <span className="text-danger">{errors.tonggia.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="trangthaiHD" className="form-label">Trang thai hd</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="matkhau"
                        {...register('trangthaiHD', {required: 'Trangthaihd is required'})}
                    />
                    {errors.trangthaiHD && <span className="text-danger">{errors.trangthaiHD.message}</span>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/hoa_don')}>Cancel
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default HoadonForm;
