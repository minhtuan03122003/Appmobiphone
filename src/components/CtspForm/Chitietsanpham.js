import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CtspForm = () => {
    const { maSP } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (maSP) {
            // Gọi API để lấy chi tiết sản phẩm theo product_id
            axios.get(`http://localhost:8080/san_pham/getId/${maSP}`)
                .then(response => {
                    const productData = response.data;
    
                    // Gọi API để lấy hình ảnh sản phẩm
                    axios.get(`http://localhost:8080/images/${productData.image_path}`, { responseType: 'blob' })
                        .then(imageResponse => {
                            // Tạo URL cho ảnh từ dữ liệu trả về
                            const imageObjectUrl = URL.createObjectURL(imageResponse.data);
    
                            // Cập nhật state sản phẩm với URL hình ảnh
                            const updatedProduct = { ...productData, imageUrl: imageObjectUrl };
                            setProduct(updatedProduct);  // Set state cho sản phẩm đơn lẻ
                            
                        })
                        .catch(error => console.error('Error fetching image:', error));
                })
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [maSP]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const filteredSanpham = [product].filter(p => p.tenSP.includes(searchQuery));

    return (
        <div>
            {filteredSanpham.map(p => (
                <div className="product-detail" key={p.maSP}>
                    <h1>{p.tenSP}</h1>
                    <img src={p.imageUrl} alt={p.tenSP} className="product-image" />
                    <div className="product-info">
                        <p><strong>Price:</strong> {p.dongia}</p>
                        <p><strong>Description:</strong> {p.mota}</p>
                        <p><strong>Stock:</strong> {p.soluongton}</p>
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default CtspForm;
