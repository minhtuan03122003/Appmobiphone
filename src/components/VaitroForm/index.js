import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VaitroForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { MaVT } = useParams();

    useEffect(() => {
        if (MaVT) {
            axios.get(`http://localhost:8080/VT/getId/${MaVT}`)
                .then(response => {
                    const vt = response.data;
                    setValue('MaVT', vt.MaVT);
                    setValue('TenVT', vt.TenVT);

                })
                .catch(error => console.error('Error fetching vt:', error));
        }
    }, [MaVT, setValue]);

    const onSubmit = (data) => {
        const vt = {
            ...data,
        };

        if (MaVT) {
            axios.put(`http://localhost:8080/VT/update/${MaVT}`, vt)
                .then(() => {
                    toast.success('Vt updated successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error updating vt:', error));
        } else {
            axios.post('http://localhost:8080/VT/create', tk)
                .then(() => {
                    toast.success('Vt created successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error creating vt:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{MaVT ? 'Edit Vt' : 'New Vt'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="tenvt" className="form-label">Tenvt</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tenvt"
                        {...register('tenvt', { required: 'Tenvt is required' })}
                    />
                    {errors.tenvt && <span className="text-danger">{errors.tenvt.message}</span>}
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

export default VaitroForm;