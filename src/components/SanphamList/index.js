import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sanpham.css';

const SanphamList = () => {
    const [sanpham, setSanpham] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/san_pham/getAll')
            .then(response => setSanpham(response.data))
            .catch(error => console.error('Error fetching sanpham:', error));
    }, []);

    const handleEdit = (maSP) => {
        navigate(`/san_pham/edit/${maSP}`);
    };

    const handleDelete = (maSP) => {
        if (window.confirm('Are you sure you want to delete this sp?')) {
            axios.delete(`http://localhost:8080/san_pham/delete/${maSP}`)
                .then(() => {
                    setSanpham(sanpham.filter(sp => sp.maSP !== maSP));
                    toast.success('Sanpham deleted successfully!');
                })
                .catch(error => console.error('Error deleting sp:', error));
        }
    };

    const filteredSanpham = sanpham.filter(sp => {
        const maNCC = sp.maNCC ? sp.maNCC.toString() : '';
        const tenSP = sp.tenSP ? sp.tenSP.toLowerCase() : '';
        const soluongton = sp.soluongton ? sp.soluongton.toString() : '';
        const dongia = sp.dongia ? sp.dongia.toString() : '';
        const hinhanh = sp.hinhanh ? sp.hinhanh.toLowerCase() : '';
        const mota = sp.mota ? sp.mota.toLowerCase() : '';

        return (
            maNCC.includes(searchQuery) ||
            tenSP.includes(searchQuery.toLowerCase()) ||
            soluongton.includes(searchQuery) ||
            dongia.includes(searchQuery) ||
            hinhanh.includes(searchQuery) ||
            mota.includes(searchQuery)
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
                            <div className="sp">
                                <p>Sản phẩm</p>
                                <button id="add-pd" onClick={() => navigate('/san_pham/new')}><span>+</span> Thêm sản phẩm</button>
                            </div>
                            <br/>
                            <table>
                                <thead>
                                    <tr className="head-tb">
                                        <th>MaSP</th>
                                        <th>MaNCC</th>
                                        <th>TenSP</th>
                                        <th>Soluongton</th>
                                        <th>Dongia</th>
                                        <th>Hinhanh</th>
                                        <th>Mota</th>
                                        <th>Xuli</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSanpham.map(sp => (
                                        <tr key={sp.maSP}>
                                            <td>{sp.maSP}</td>
                                            <td>{sp.maNCC}</td>
                                            <td>{sp.tenSP}</td>
                                            <td>{sp.soluongton}</td>
                                            <td>{sp.dongia}</td>
                                            <td>{sp.hinhanh}</td>
                                            <td>{sp.mota}</td>
                                            <td>
                                                <button className="btn btn-warning"
                                                        onClick={() => handleEdit(sp.maSP)}>Sửa
                                                </button>
                                                <button className="btn btn-danger"
                                                        onClick={() => handleDelete(sp.maSP)}>Xóa
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

export default SanphamList;