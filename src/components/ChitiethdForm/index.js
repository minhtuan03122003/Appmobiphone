import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChitiethdForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { MaCTHD } = useParams();

    useEffect(() => {
        if (MaCTHD) {
            axios.get(`http://localhost:8080/CTHD/getId/${MaCTHD}`)
                .then(response => {
                    const cthd = response.data;
                    setValue('MaHD', cthd.MaHD);
                    setValue('MaSP', cthd.MaSP);
                    setValue('Soluong', cthd.Soluong);
                    setValue('Dongia', cthd.Dongia);
                })
                .catch(error => console.error('Error fetching cthd:', error));
        }
    }, [MaCTHD, setValue]);

    const onSubmit = (data) => {
        const cthd = {
            ...data,
        };

        if (MaCTHD) {
            axios.put(`http://localhost:8080/CTHD/update/${MaCTHD}`, cthd)
                .then(() => {
                    toast.success('Cthd updated successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error updating customer:', error));
        } else {
            axios.post('http://localhost:8080/CTHD/create', cthd)
                .then(() => {
                    toast.success('Cthd created successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error creating cthd:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{MaCTHD ? 'Edit Cthd' : 'New Cthd'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="mahd" className="form-label">Mahd</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mahd"
                        {...register('mahd', { required: 'Mahd is required' })}
                    />
                    {errors.MaHD && <span className="text-danger">{errors.MaHD.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="masp" className="form-label">Masp</label>
                    <input
                        type="text"
                        className="form-control"
                        id="masp"
                        {...register('masp', { required: 'Masp is required' })}
                    />
                    {errors.masp && <span className="text-danger">{errors.masp.message}</span>}
                </div>


                <div className="mb-3">
                    <label htmlFor="soluong" className="form-label">Soluong</label>
                    <input
                        type="text"
                        className="form-control"
                        id="soluong"
                        {...register('soluong', { required: 'Soluong is required' })}
                    />
                    {errors.Soluong && <span className="text-danger">{errors.Soluong.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="dongia" className="form-label">Dongia</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dongia"
                        {...register('dongia', { required: 'Dongia Number is required' })}
                    />
                    {errors.Dongia && <span className="text-danger">{errors.dongia.message}</span>}
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ChitiethdForm;