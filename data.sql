insert into tai_khoan (matk, email, matkhau, makh, mavt) values (1, 'Adim1@gmail.com', '123', 1, 1 );
insert into tai_khoan (matk, email, matkhau, makh, mavt) values (2, 'User1@gmail.com', '123', 2, 2 );
insert into tai_khoan (matk, email, matkhau, makh, mavt) values (3, 'User2@gmail.com', '123', 3, 2 );
insert into tai_khoan (matk, email, matkhau, makh, mavt) values (4, 'User3@gmail.com', '123', 4, 2 );
insert into tai_khoan (matk, email, matkhau, makh, mavt) values (5, 'User4@gmail.com', '123', 5, 2 );

insert into khach_hang (makh, tenkh, sdt, diachi) values (1, 'Nguyen Van A', '0909999999', 'Dong Thap' );
insert into khach_hang (makh, tenkh, sdt, diachi) values (2, 'Nguyen Van B', '0909888888', 'Dong Nai' );
insert into khach_hang (makh, tenkh, sdt, diachi) values (3, 'Nguyen Van C', '0909123456', 'An Giang' );
insert into khach_hang (makh, tenkh, sdt, diachi) values (4, 'Nguyen Thi D', '01219997878', 'Binh Duong' );
insert into khach_hang (makh, tenkh, sdt, diachi) values (5, 'Le Thanh C', '0346789009', 'Kien Giang' );

insert into san-pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (1, 'Iphone 16', 20000000, 5, 'iphone vua moi ra mat', '', 1);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (2, 'Samsung s24', 18000000, 15, 'dien thoai samsung', '', 2);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (3, 'Xiaomi 14', 15000000, 15, 'dien thoai xiaomi', '', 3);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (11, 'Iphone 15', 17000000, 20, 'iphone ra mat vao nam ngoai', '', 1);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (21, 'Samsung s23', 15000000, 25, 'dien thoai samsung', '', 2);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (31, 'Xiaomi 13', 12000000, 10, 'dien thoai xiaomi', '', 3);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (23, 'Samsung s22', 18000000, 15, 'dien thoai samsung', '', 2);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (14, 'Iphone 13', 16000000, 20, 'iphone ra mat vao nam ngoai', '', 1);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (34, 'Xiaomi 12', 10000000, 15, 'dien thoai xiaomi', '', 3);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (15, 'Iphone 12', 13000000, 20, 'iphone ra mat vao nam ngoai', '', 1);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (25, 'Samsung s21', 12000000, 15, 'dien thoai samsung', '', 2);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (35, 'Xiaomi 11', 900000, 10, 'dien thoai xiaomi', '', 3);
insert into san_pham (masp, tensp, dongia, soluongton, mota, hinhanh, mancc) values (36, 'Xiaomi 13T', 13000000, 10, 'dien thoai xiaomi', '', 3);



insert into nha_cung_cap (mancc, tenncc) values (1, 'Apple');
insert into nha_cung_cap (mancc, tenncc) values (2, 'Samsung');
insert into nha_cung_cap (mancc, tenncc) values (3, 'Xiaomi');

insert into hoa_don (mahd, makh, ngaylap, tonggia, trangthaihd) values (1, 1, '01/10/2024', 20000000, 'Dang giao' );
insert into hoa_don (mahd, makh, ngaylap, tonggia, trangthaihd) values (2, 2, '02/10/2024', 36000000, 'Da giao' );
insert into hoa_don (mahd, makh, ngaylap, tonggia, trangthaihd) values (3, 3, '01/09/2024', 30000000, 'Dang giao' );
insert into hoa_don (mahd, makh, ngaylap, tonggia, trangthaihd) values (4, 4, '02/09/2024', 24000000, 'Da giao' );
insert into hoa_don (mahd, makh, ngaylap, tonggia, trangthaihd) values (5, 5, '10/09/2024', 34000000, 'Dang giao' );

insert into ct_hoa-don (macthd, mahd, masp, soluong, dongia) values (1, 1, 1, 1, 20000000 );
insert into ct_hoa_don (macthd, mahd, masp, soluong, dongia) values (2, 2, 2, 2, 36000000 );
insert into ct_hoa_don (macthd, mahd, masp, soluong, dongia) values (3, 3, 21, 2, 30000000 );
insert into ct_hoa_don (macthd, mahd, masp, soluong, dongia) values (4, 4, 31, 2, 24000000 );
insert into ct_hoa_don (macthd, mahd, masp, soluong, dongia) values (5, 5, 11, 2, 20000000 );

insert into vai_tro (mavt, tenvt) values (1, 'Admin');
insert into vai_tro (mavt, tenvt) values (2, 'User');



