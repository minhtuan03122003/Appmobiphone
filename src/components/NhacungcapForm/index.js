import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NhacungcapForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { MaNCC } = useParams();

    useEffect(() => {
        if (MaNCC) {
            axios.get(`http://localhost:8080/NCC/getId/${MaNCC}`)
                .then(response => {
                    const ncc = response.data;
                    setValue('TenNCC', ncc.TenNCC);
                })
                .catch(error => console.error('Error fetching cthd:', error));
        }
    }, [MaNCC, setValue]);

    const onSubmit = (data) => {
        const ncc = {
            ...data,
        };

        if (MaNCC) {
            axios.put(`http://localhost:8080/NCC/update/${MaNCC}`, ncc)
                .then(() => {
                    toast.success('Ncc successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error updating ncc:', error));
        } else {
            axios.post('http://localhost:8080/NCC/create', ncc)
                .then(() => {
                    toast.success('Ncc created successfully!');
                    setTimeout(() => navigate('/'), 2000);
                })
                .catch(error => console.error('Error creating ncc:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{MaNCC ? 'Edit Kh' : 'New Ncc'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label htmlFor="tenncc" className="form-label">Tenncc</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tenncc"
                        {...register('tenncc', { required: 'Tenncc is required' })}
                    />
                    {errors.tenncc && <span className="text-danger">{errors.tenncc.message}</span>}
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

export default NhacungcapForm;