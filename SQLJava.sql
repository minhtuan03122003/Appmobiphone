create table NhaCungCap(
	MaNCC int not null primary key,
	TenNCC varchar(20)
);

create table KhachHang(
	MaKH int not null primary key,
	TenKH varchar(25),
	SDT varchar(15),
	Diachi text
);

create table SanPham(
	MaSP int not null primary key,
	TenSP varchar(25),
	Dongia numeric,
	Soluongton int,
	Mota text,
	Hinhanh varchar(255),
	MaNCC int not null,
	foreign key (MaNCC) references NhaCungCap(MaNCC)
);

create table VaiTro(
	MaVT int not null primary key,
	TenVT varchar(50)
);

create table Taikhoan(
	MaTK int not null primary key, 
	Email varchar(255),
	Matkhau varchar(50),
	MaKH int not null, 
	MaVT int not null,
	foreign key (MaKH) references KhachHang(MaKH),
	foreign key (MaVT) references VaiTro(MaVT)
);

create table HoaDon(
	MaHD int not null primary key,
	MaKH int not null,
	Ngaylap date,
	Tonggia numeric,
	TrangthaiHD varchar(25),
	foreign key (MaKH) references KhachHang(MaKH)
);

create table CTHoaDon(
	MaCTHD int not null primary key,
	MaHD int not null,
	MaSP int not null, 
	Soluong int,
	Dongia numeric,
	foreign key (MaHD) references HoaDon(MaHD),
	foreign key (MaSP) references SanPham(MaSP)
);