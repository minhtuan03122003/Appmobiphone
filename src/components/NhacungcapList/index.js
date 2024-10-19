import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Nhacungcap.module.css';

const NhacungcapList = () => {
    const [nhacungcap, setNhacungcap] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/NCC/getAll')
            .then(response => setNhacungcap(response.data))
            .catch(error => console.error('Error fetching nhacungcap:', error));
    }, []);

    const handleEdit = (MaNCC) => {
        navigate(`/nhacungcap/edit/${MaNCC}`);
    };

    const handleDelete = (MaNCC) => {
        if (window.confirm('Are you sure you want to delete this ncc?')) {
            axios.delete(`http://localhost:8080/NCC/delete/${MaNCC}`)
                .then(() => {
                    setNhacungcap(nhacungcap.filter(ncc => ncc.MaNCC !== MaNCC));
                    toast.success('Nhacungcap deleted successfully!');
                })
                .catch(error => console.error('Error deleting ncc:', error));
        }
    };

    const filteredNhacungcap = nhacungcap.filter(ncc =>
        ncc.TenNCC && ncc.TenNCC.toLowerCase().includes(searchQuery.toLowerCase())

    );

    return (
        <div className="container mt-5">
            <h2>Nhacungcap List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/NCC/new')}>Add New NCC</button>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>MaNCC</th>
                    <th>TenNCC</th>
                </tr>
                </thead>
                <tbody>
                {filteredNhacungcap.map(ncc => (
                    <tr key={ncc.MaNCC}>
                        <td>{ncc.TenNCC}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(ncc.MaNCC)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(ncc.MaNCC)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default NhacungcapList;