import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './User.css';
import Logo from '../../assets/images/logo.jpg';
import Search from '../../assets/images/icons8-search-50 (1).png';
import Ip16 from '../../assets/images/iphone-16-pro-max-titan-sa-mac_2.jpg';
import User from '../../assets/images/icons8-user-100.png';
import Cart from '../../assets/images/icons8-cart-48.png';
import Phone from '../../assets/images/icons8-phone-50.png';
import Product from '../../assets/images/icons8-products-50.png';
import Home from '../../assets/images/icons8-home-50.png';
import './Users.module.css';




const UserList = () => {
    const [sanpham, setSanpham] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/san_pham/getAll')
            .then(response => setSanpham(response.data))
            .catch(error => console.error('Error fetching sanpham:', error));
    }, []);

    const handleEdit = (masp) => {
        navigate(`/sanpham/edit/${masp}`);
    };

    const handleDelete = (masp) => {
        if (window.confirm('Are you sure you want to delete this sp?')) {
            axios.delete(`http://localhost:8080/san_pham/delete/${masp}`)
                .then(() => {
                    setSanpham(sanpham.filter(sp => sp.masp !== masp));
                    toast.success('Sanpham deleted successfully!');
                })
                .catch(error => console.error('Error deleting sp:', error));
        }
    };

    const chitietsanpham = (masp) => {
        navigate(`/san_pham/chitietsanpham/${masp}`);
    };
    const Dangnhap = () => {
        navigate(`/Dn`);
    };
    const addToCart = (sp) => {
        setCart([...cart, sp]);
        toast.success('Added to cart!');
    };

    const filteredSanpham = sanpham.filter(sp => {
        const mancc = sp.mancc ? sp.mancc.toString() : '';
        const tenSP = sp.tenSP ? sp.tenSP.toLowerCase() : '';
        const soluongton = sp.soluongton ? sp.soluongton.toString() : '';
        const dongia = sp.dongia ? sp.dongia.toString() : '';
        const hinhanh = sp.hinhanh ? sp.hinhanh.toLowerCase() : '';
        const mota = sp.mota ? sp.mota.toLowerCase() : '';

        return (
            mancc.includes(searchQuery) ||
            tenSP.includes(searchQuery.toLowerCase()) ||
            soluongton.includes(searchQuery) ||
            dongia.includes(searchQuery) ||
            hinhanh.includes(searchQuery) ||
            mota.includes(searchQuery)
        );
    });
    const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.dongia, 0);
    };
    return (
        <div>
            <div id="header">
                <a href="/" className="logo">
                    <img src={Logo} alt="logo" />
                </a>
                <div className="search">
                    <form action="SEARCH.php" method="post">
                        <input type="text" placeholder="Bạn muốn tìm gì..." />
                        <button name="search"><img src={Search} alt="tk"/></button>
                    </form>
                </div>
                <div id="menu">
                    <div className="item">
                        <a href="/">Trang chủ<img src={Home} alt="sd"
                                                            /></a>
                    </div>
                    <div className="item">
                        <a href="#wp-products">Sản Phẩm <img src={Product} alt="sd"
                                                            /></a>

                    </div>

                    <div className="item">
                        <a href="#LH">Liên hệ <img src={Phone} alt="sd"
                                                /></a>

                    </div>

                    <div className="item">
                        <a href="#cart">Lịch sử <img src={Cart} alt="sd"
                                                /></a>

                    </div>

                </div>
                <div id="actions">
                    <div className="item">
                        <img src={User} alt="user" className="us"/>
                        <div className="name-hover">
                        </div>
                        <div className="dangnhap">
                            <button className='dangnhap-btn' onClick={()=>Dangnhap()}>Đăng nhập</button>
                        </div>
                    </div>
                    {/* <div className="item">
                        <div className="shopping">
                        <a href="cart">Lịch sử mua <img src={Cart} alt="sd" /></a>
                            { <span className="quantity">0</span> }
                            
                        </div>
                    </div> */}
                </div>
            </div>

            <div id="banner" >
                <div className="box-left">
                    <h2>
                        <span>CỬA HÀNG</span>
                        <br/>
                        <span>ĐIỆN THOẠI DI ĐỘNG</span>
                    </h2>
                    <p>
                        Cửa hàng điện thoại MT store cung cấp các dòng điện thoại tầm trung và cao cấp
                        đến tất cả các nhóm khách hàng trên khắp cả nước.
                    </p>
                    
                </div>
                <div className="box-right">
                    <div className="box-right-top-container">
                        <div className="box-right-top">

                        </div>
                        <div className="box-right-chevron">

                        </div>
                    </div>
                    <div className="box-right-bottom">
                        <li className="active">Miễn phí giao hàng trên toàn quốc<br/></li>
                        <li>Cung cấp các sản phẩm tốt nhất<br/></li>
                        <li>Các sản phẩm phân phối chính hãng<br/></li>
                    </div>
                </div>
                <div className="to-bottom">
                    <a href="/">
                        <img src="/" alt=""/>
                    </a>
                </div>
            </div>

            <div id="wp-products">
                <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
                <h3 id="dcyt">ĐIỆN THOẠI DI ĐỘNG</h3>
                <ul id="list-products">
                    {filteredSanpham.map(sp => (
                    
                        <div className="item" key={sp.masp}>
                            
                            <div className="box-sp">
                            <img src={Ip16} alt="dcyt" />
                            <div className="tk">
                            <button onClick={() => addToCart(sp)}>Mua hàng</button>
                            </div>
                            </div>
                            <div className="ten">{sp.tenSP}</div>
                            <div className="gia">{sp.dongia}</div>
                            <div className="pmota">{sp.mota}</div>
                        </div>
                    
                    ))}
                </ul>

                <div>
                
                </div>
            <div id="cart">
                <h2>Lịch sử mua hàng</h2>
                {cart.map((item, index) => (
                    <div key={index}>
                        <p>{item.tenSP} - {item.dongia} VND</p>
                    </div>
                ))}
                <h3>Tổng tiền: {calculateTotal()} VND</h3>
            </div>
            <ToastContainer />
            <div id="footer" >

                <div className="box">
                    <h3>NỘI DUNG</h3>
                    <ul className="quick-menu">
                        <div className="item">
                            <a href="Gioithieu.php">Giới thiệu</a>
                        </div>
                        <div className="item">
                            <a href="Sanpham.php">Sản phẩm</a>
                        </div>
                    </ul>
                </div>
                <div className="box">
                    <h3>HỖ TRỢ</h3>
                    <ul className="quick-menu">
                        <div className="item">
                            <a href="/">Tư vấn mua hàng</a>
                        </div>
                        <div className="item">
                            <a href="/">Đổi trả hàng</a>
                        </div>
                        <div className="item">
                            <a href="/">Hình thức thanh toán</a>
                        </div>
                        <div className="item">
                            <a href="/">Chính sách bảo hành</a>
                        </div>
                    </ul>
                </div>
                <div className="box" id="LH">
                    <h3>LIÊN HỆ</h3>
                    <ul className="quick-menu">
                        <div className="item">
                            <p>Email:<a href="mailto:nguyenminhtuan.com"> nguyenminhtuan12cb1@gmail.com</a></p>
                        </div>
                        <div className="item">
                            <p>SĐT:<a href="/"> 0346853481</a></p>
                        </div>
                        <div className="item">
                            <p>Facebook:<a href="/" target="_blank"> Minh Tuấn</a></p>
                        </div>
                    </ul>
                </div>
            </div>
            <div id="end">
                <p>Copyright</p>
                <img src="imageBTL/c.png" alt="" />
                <p>2023. Bản quyền thuộc về MT-Store</p>
            </div>
        </div>
        </div>
    )
};

export default UserList;