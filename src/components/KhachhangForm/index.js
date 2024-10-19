import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const KhachhangForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { MaKH } = useParams();

    useEffect(() => {
        if (MaKH) {
            axios.get(`http://localhost:8080/KH/getId/${MaKH}`)
                .then(response => {
                    const kh = response.data;
                    setValue('TenKH', kh.TenKH);
                    setValue('SDT', kh.SDT);
                    setValue('Diachi', kh.Diachi);
                })
                .catch(error => console.error('Error fetching cthd:', error));
        }
    }, [MaKH, setValue]);

    const onSubmit = (data) => {
        const kh = {
            ...data,
        };

        if (MaKH) {
            axios.put(`http://localhost:8080/KH/update/${MaKH}`, kh)
                .then(() => {
                    toast.success('Kh updated successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error updating kh:', error));
        } else {
            axios.post('http://localhost:8080/KH/create', kh)
                .then(() => {
                    toast.success('Kh created successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error creating kh:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{MaKH ? 'Edit Kh' : 'New Kh'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label htmlFor="tenkh" className="form-label">Tenkh</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tenkh"
                        {...register('tenkh', { required: 'Tenkh is required' })}
                    />
                    {errors.tenkh && <span className="text-danger">{errors.tenkh.message}</span>}
                </div>


                <div className="mb-3">
                    <label htmlFor="sdt" className="form-label">Sdt</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sdt"
                        {...register('sdt', { required: 'Sdt is required' })}
                    />
                    {errors.Sdt && <span className="text-danger">{errors.Sdt.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="diachi" className="form-label">Diachi</label>
                    <input
                        type="text"
                        className="form-control"
                        id="diachi"
                        {...register('diachi', { required: 'Diachi Number is required' })}
                    />
                    {errors.Diachi && <span className="text-danger">{errors.diachi.message}</span>}
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

export default KhachhangForm;