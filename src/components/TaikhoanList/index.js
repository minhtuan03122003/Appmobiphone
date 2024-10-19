import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Taikhoan.css';

const TaikhoanList = () => {
    const [taikhoan, setTaikhoan] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/tai_khoan/getAll')
            .then(response => setTaikhoan(response.data))
            .catch(error => console.error('Error fetching taikhoan:', error));
    }, []);

    const handleEdit = (maTK) => {
        navigate(`/tai_khoan/edit/${maTK}`);
    };

    const handleDelete = (maTK) => {
        if (window.confirm('Are you sure you want to delete this tk?')) {
            axios.delete(`http://localhost:8080/tai_khoan/delete/${maTK}`)
                .then(() => {
                    setTaikhoan(taikhoan.filter(tk => tk.maTK !== maTK));
                    toast.success('Taikhoan deleted successfully!');
                })
                .catch(error => console.error('Error deleting tk:', error));
        }
    };

    const filteredTaikhoan = taikhoan.filter(tk => {
        
        const email = tk.email ? tk.email.toLowerCase() : '';

        return (
           
            email.includes(searchQuery) 
        );
    });



    return (
        <div>
            <div id="mySidenav">
                <div className="sidenav">
                    <p className="logo"><span>MT</span>-Store</p>
                    <Link to="/hoa_don" className="icon-a" ><span>Hóa đơn</span></Link>
                    <Link to="/san_pham" className="icon-a" ><span>Sản phẩm</span></Link>
                    <Link to="/tai_khoan" className="icon-a" ><span>Tài khoản</span></Link>
                </div>
            </div>
            <div id="main">
                <div className="head">
                    <div className="col-div-6">
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="product">
                    <div className="product-box">
                        <div className="product-content-box">
                            <div className="tk">
                                <p>Tài khoản</p>
                                <button id="add-pd" onClick={() => navigate('/tai_khoan/new')}><span>+</span> Thêm tài khoản</button>
                            </div>
                            <br/>
                            <table>
                                <thead>
                                <tr className="head-tb">
                                    <th>MaTK</th>
                                    <th>MaKH</th>
                                    <th>MaVT</th>
                                    <th>Email</th>
                                    <th>Matkhau</th>
                                    <th>Xuli</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredTaikhoan.map(tk => (
                                    <tr key={tk.maTK}>
                                        <td>{tk.maTK}</td>
                                        <td>{tk.maKH}</td>
                                        <td>{tk.maVT}</td>
                                        <td>{tk.email}</td>
                                        <td>{tk.matkhau}</td>

                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => handleEdit(tk.maTK)}>Sửa
                                            </button>
                                            <button className="btn btn-danger"
                                                    onClick={() => handleDelete(tk.maTK)}>Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    )
};

export default TaikhoanList;