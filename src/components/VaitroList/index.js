import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Vaitro.module.css';

const VaitroList = () => {
    const [vaitro, setVaitro] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/VT/getAll')
            .then(response => setVaitro(response.data))
            .catch(error => console.error('Error fetching vaitro:', error));
    }, []);

    const handleEdit = (MaVT) => {
        navigate(`/vaitro/edit/${MaVT}`);
    };

    const handleDelete = (MaVT) => {
        if (window.confirm('Are you sure you want to delete this vt?')) {
            axios.delete(`http://localhost:8080/VT/delete/${MaVT}`)
                .then(() => {
                    setVaitro(vaitro.filter(vt => vt.MaVT !== MaVT));
                    toast.success('Khachhang deleted successfully!');
                })
                .catch(error => console.error('Error deleting vt:', error));
        }
    };

    const filteredVaitro = vaitro.filter(vt =>
        vt.TenVT && vt.TenVT.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Vaitro List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/VT/new')}>Add New VT</button>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>MaVT</th>
                    <th>TenVT</th>
                </tr>
                </thead>
                <tbody>
                {filteredVaitro.map(vt => (
                    <tr key={vt.MaVT}>
                        <td>{vt.TenVT}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(vt.MaVT)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(vt.MaVT)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default VaitroList;