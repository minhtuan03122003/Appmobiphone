import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChitiethdList from './components/ChitiethdList';
import ChitiethdForm from './components/ChitiethdForm';
import HoadonList from './components/HoadonList';
import HoadonForm from './components/HoadonForm';
import VaitroList from './components/VaitroList';
import VaitroForm from './components/SanphamForm';
import SanphamList from './components/SanphamList';
import SanphamForm from './components/SanphamForm';
import NhacungcapList from './components/NhacungcapList';
import NhacungcapForm from './components/NhacungcapForm';
import TaikhoanList from './components/TaikhoanList';
import TaikhoanForm from './components/TaikhoanForm';
import KhachhangList from './components/KhachhangList';
import KhachhangForm from './components/KhachhangForm';
import UserList from './components/User';
import DnForm from './components/DnForm';
import CtspForm from './components/CtspForm/Chitietsanpham.js';


const App = () => (
    <Router>
      <Routes>
        <Route path="/ct_hoa_don" element={<ChitiethdList />} />
        <Route path="/ct_hoa_don/new" element={<ChitiethdForm />} />
        <Route path="/ct_hoa_don/edit/:maCTHD" element={<ChitiethdForm />} />
          <Route path="/hoa_don" element={<HoadonList />} />
          <Route path="/hoa_don/new" element={<HoadonForm />} />
          <Route path="/hoa_don/edit/:maHD" element={<HoadonForm />} />
          <Route path="/vai_tro" element={<VaitroList />} />
          <Route path="/vai_tro/new" element={<VaitroForm />} />
          <Route path="/vai_tro/edit/:maVT" element={<VaitroForm />} />
          <Route path="/san_pham" element={<SanphamList />} />
          <Route path="/san_pham/new" element={<SanphamForm />} />
          <Route path="/san_pham/edit/:maSP" element={<SanphamForm />} />
          <Route path="/nha_cung_cap" element={<NhacungcapList />} />
          <Route path="/nha_cung_cap/new" element={<NhacungcapForm />} />
          <Route path="/nha_cung_cap/edit/:maNCC" element={<NhacungcapForm />} />
          <Route path="/tai_khoan" element={<TaikhoanList />} />
          <Route path="/tai_khoan/new" element={<TaikhoanForm />} />
          <Route path="/tai_khoan/edit/:matk" element={<TaikhoanForm />} />
          <Route path="/khach-hang" element={<KhachhangList />} />
          <Route path="/khach_hang/new" element={<KhachhangForm />} />
          <Route path="/khach_hang/edit/:maKH" element={<KhachhangForm />} />
          <Route path="/" element={<UserList />} />
          <Route path="/Dn" element={<DnForm />} />
          <Route path="/chitietsanpham/:maSP" element={<CtspForm />} />
          {/* <Route path="/cart/:maSP" element={<CartForm />} /> */}




      </Routes>
    </Router>
);

export default App;