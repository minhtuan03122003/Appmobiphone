import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Hoadon.css';

const HoadonList = () => {
    const [hoadon, setHoadon] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/hoa_don/getAll')
            .then(response => setHoadon(response.data))
            .catch(error => console.error('Error fetching taikhoan:', error));
    }, []);

    const handleEdit = (maHD) => {
        navigate(`/hoa_don/edit/${maHD}`);
    };

    const handleDelete = (maHD) => {
        if (window.confirm('Are you sure you want to delete this hd?')) {
            axios.delete(`http://localhost:8080/hoa_don/delete/${maHD}`)
                .then(() => {
                    setHoadon(hoadon.filter(hd => hd.maHD !== maHD));
                    toast.success('Hoadon deleted successfully!');
                })
                .catch(error => console.error('Error deleting hd:', error));
        }
    };

    const filteredHoadon = hoadon.filter(hd => {
        const maKH = hd.maKH ? hd.maKH.toString() : '';
        const tonggia = hd.tonggia ? hd.tonggia.toString() : '';
        const trangthaiHD = hd.trangthaiHD ? hd.trangthaiHD.toLowerCase() : '';

        return (
            maKH.includes(searchQuery).toString() ||
            tonggia.includes(searchQuery) ||
            trangthaiHD.includes(searchQuery)
        );
    });

    const filteredHD = hoadon.filter(hd => 
        hd.maKH.toString().includes(searchQuery.toString()) ||
        hd.tonggia.toString().includes(searchQuery.toString()) ||
        hd.trangthaiHD.includes(searchQuery)
    );


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
                            <div className="hd">
                                <p>Hóa đơn</p>
                                <button id="add-pd" onClick={() => navigate('/hoa_don/new')}><span>+</span> Thêm hóa đơn</button>
                            </div>
                            <br/>
                            <table>
                                <thead>
                                <tr className="head-tb">
                                    <th>MaHD</th>
                                    <th>MaKH</th>
                                    <th>Ngaylap</th>
                                    <th>Tonggia</th>
                                    <th>TrangthaiHD</th>
                                    <th>Xuli</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredHD.map(hd => (
                                    <tr key={hd.maHD}>
                                        <td>{hd.maHD}</td>
                                        <td>{hd.maKH}</td>
                                        <td>{hd.ngaylap}</td>
                                        <td>{hd.tonggia}</td>
                                        <td>{hd.trangthaiHD}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => handleEdit(hd.maHD)}>Sửa
                                            </button>
                                            <button className="btn btn-danger"
                                                    onClick={() => handleDelete(hd.maHD)}>Xóa
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

export default HoadonList;