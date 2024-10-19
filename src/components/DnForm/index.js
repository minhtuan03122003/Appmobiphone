import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dn.css';

const DnForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('http://localhost:8080/login', data)
            .then(response => {
                toast.success('Login successful!');
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Error logging in:', error);
                toast.error('Failed to log in.');
            });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="dn" className="form-dn">ĐĂNG NHẬP</label>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Tài khoản</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <span className="text-danger">{errors.username.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn-success">Login</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
export default DnForm;
