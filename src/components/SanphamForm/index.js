import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../SanphamList/Sanpham.css";

const SanphamForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { maSP } = useParams();

    useEffect(() => {
        if (maSP) {
            axios.get(`http://localhost:8080/san_pham/getId/${maSP}`)
                .then(response => {
                    const sp = response.data;
                    setValue('tenSP', sp.tenSP);
                    setValue('maNCC', sp.maNCC);
                    setValue('dongia', sp.dongia);
                    setValue('soluongton', sp.soluongton);
                    setValue('hinhanh', sp.hinhanh);
                    setValue('mota', sp.mota);
                })
                .catch(error => {
                    console.error('Error fetching sp:', error);
                    toast.error('Failed to fetch product data.');
                });
        }
    }, [maSP, setValue]);

    const onSubmit = (data) => {
        const sp = { ...data };

        const apiCall = maSP
            ? axios.put(`http://localhost:8080/san_pham/update/${maSP}`, sp)
            : axios.post('http://localhost:8080/san_pham/create', sp);

        apiCall
            .then(() => {
                toast.success(`Sp ${maSP ? 'updated' : 'created'} successfully!`);
                setTimeout(() => navigate('/san_pham'), 2000);
            })
            .catch(error => {
                console.error(`Error ${maSP ? 'updating' : 'creating'} sp:`, error);
                toast.error(`Failed to ${maSP ? 'update' : 'create'} product.`);
            });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>{maSP ? 'Edit Sp' : 'San pham'}</h2>
                <div className="mb-3">
                    <label htmlFor="maSP" className="form-label">Ma san pham</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="maSP"
                        {...register('maSP', {required: 'Masp is required'})}
                    />
                    {errors.maSP && <span className="text-danger">{errors.maSP.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="maNCC" className="form-label">Ma nha cung cap</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="maNCC"
                        {...register('maNCC', {required: 'Mancc is required'})}
                    />
                    {errors.maNCC && <span className="text-danger">{errors.maNCC.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="tenSP" className="form-label">Ten san pham</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="tenSP"
                        {...register('tenSP', {required: 'Tensp is required'})}
                    />
                    {errors.tenSP && <span className="text-danger">{errors.tenSP.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="dongia" className="form-label">Don gia</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="dongia"
                        {...register('dongia', {required: 'Dongia is required'})}
                    />
                    {errors.dongia && <span className="text-danger">{errors.dongia.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="soluongton" className="form-label">So luong ton</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="soluongton"
                        {...register('soluongton', {required: 'Soluongton is required'})}
                    />
                    {errors.soluongton && <span className="text-danger">{errors.soluongton.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="hinhanh" className="form-label">Hinh anh</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="hinhanh"
                        {...register('hinhanh', {required: 'Hinhanh is required'})}
                    />
                    {errors.hinhanh && <span className="text-danger">{errors.hinhanh.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="mota" className="form-label">Mo ta</label>
                    <input
                        type="text"
                        className="searchInput"
                        id="mota"
                        {...register('mota', {required: 'Mota is required'})}
                    />
                    {errors.mota && <span className="text-danger">{errors.mota.message}</span>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/san_pham')}>Cancel
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default SanphamForm;
