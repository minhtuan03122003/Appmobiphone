import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Khachhang.module.css';

const KhachhangList = () => {
    const [khachhang, setKhachhang] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/KH/getAll')
            .then(response => setKhachhang(response.data))
            .catch(error => console.error('Error fetching khachhang:', error));
    }, []);

    const handleEdit = (MaKH) => {
        navigate(`/khachhang/edit/${MaKH}`);
    };

    const handleDelete = (MaKH) => {
        if (window.confirm('Are you sure you want to delete this kh?')) {
            axios.delete(`http://localhost:8080/KH/delete/${MaKH}`)
                .then(() => {
                    setKhachhang(khachhang.filter(kh => kh.MaKH !== MaKH));
                    toast.success('Khachhang deleted successfully!');
                })
                .catch(error => console.error('Error deleting kh:', error));
        }
    };

    const filteredKhachhang = khachhang.filter(kh =>
        kh.Diachi && kh.Diachi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kh.SDT && kh.SDT.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kh.TenKH && kh.TenKH.toLowerCase().includes(searchQuery.toLowerCase())

    );

    return (
        <div className="container mt-5">
            <h2>Khachhang List</h2>
            <div className={styles.searchContainer}>
                <div className="mb-3">
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/KH/new')}>Add New KH</button>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>MaKH</th>
                    <th>TenKH</th>
                    <th>Diachi</th>
                    <th>SDT</th>
                </tr>
                </thead>
                <tbody>
                {filteredKhachhang.map(kh => (
                    <tr key={kh.MaKH}>
                        <td>{kh.TenKH}</td>
                        <td>{kh.Diachi}</td>
                        <td>{kh.SDT}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(kh.MaKH)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(kh.MaKH)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default KhachhangList;