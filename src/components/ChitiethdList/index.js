import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Chitiethd.module.css';

const ChitiethdList = () => {
    const [chitiethd, setChitiethd] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/CTHD/getAll')
            .then(response => setChitiethd(response.data))
            .catch(error => console.error('Error fetching chitiethd:', error));
    }, []);

    const handleEdit = (MaCTHD) => {
        navigate(`/chitiethd/edit/${MaCTHD}`);
    };

    const handleDelete = (MaCTHD) => {
        if (window.confirm('Are you sure you want to delete this cthd?')) {
            axios.delete(`http://localhost:8080/CTHD/delete/${MaCTHD}`)
                .then(() => {
                    setChitiethd(chitiethd.filter(cthd => cthd.MaCTHD !== MaCTHD));
                    toast.success('Chitiethd deleted successfully!');
                })
                .catch(error => console.error('Error deleting cthd:', error));
        }
    };

    const filteredChitiethd = chitiethd.filter(cthd =>
        cthd.MaHD && cthd.MaHD.toString().includes(searchQuery.toString()) ||
        cthd.MaSP && cthd.MaSP.toString().includes(searchQuery.toString()) ||
        cthd.Soluong && cthd.Soluong.toString().includes(searchQuery.toString()) ||
        cthd.Dongia && cthd.Dongia.toString().includes(searchQuery.toString())

    );

    return (
        <div className="container mt-5">
            <h2>Chitiethd List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/CTHD/new')}>Add New CTHD</button>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>MaCTHD</th>
                    <th>MaHD</th>
                    <th>MaSP</th>
                    <th>Soluong</th>
                    <th>Dongia</th>
                </tr>
                </thead>
                <tbody>
                {filteredChitiethd.map(cthd => (
                    <tr key={cthd.MaCTHD}>
                        <td>{cthd.MaHD}</td>
                        <td>{cthd.MaSP}</td>
                        <td>{cthd.Soluong}</td>
                        <td>{cthd.Dongia}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(cthd.MaCTHD)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(cthd.MaCTHD)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default ChitiethdList;