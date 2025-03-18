USE [master]
GO
/****** Object:  Database [Inventario]      ******/
CREATE DATABASE [Inventario]
GO
ALTER DATABASE [Inventario] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Inventario].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Inventario] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Inventario] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Inventario] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Inventario] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Inventario] SET ARITHABORT OFF 
GO
ALTER DATABASE [Inventario] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Inventario] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Inventario] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Inventario] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Inventario] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Inventario] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Inventario] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Inventario] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Inventario] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Inventario] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Inventario] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Inventario] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Inventario] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Inventario] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Inventario] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Inventario] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Inventario] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Inventario] SET RECOVERY FULL 
GO
ALTER DATABASE [Inventario] SET  MULTI_USER 
GO
ALTER DATABASE [Inventario] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Inventario] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Inventario] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Inventario] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Inventario] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Inventario] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Inventario', N'ON'
GO
ALTER DATABASE [Inventario] SET QUERY_STORE = ON
GO
ALTER DATABASE [Inventario] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Inventario]
GO
/****** Object:  Table [dbo].[productos]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo_producto] [varchar](255) NULL,
	[nombre] [varchar](255) NULL,
	[existencia] [int] NULL,
	[precio] [varchar](255) NULL,
	[img] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[registro_ventas]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[registro_ventas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha_venta] [date] NULL,
	[producto_id] [int] NULL,
	[cantidad] [int] NULL,
	[precio_unitario] [money] NULL,
	[total] [money] NULL,
	[id_usuario] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[apellido] [varchar](255) NULL,
	[clave] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[productos] ON 

INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (1, N'A1', N'GIGABYTE Tarjeta gráfica GeForce RTX 5070 Ti Eagle OC ICE SFF 16G, 16 GB 256 bits GDDR7, PCIe 5.0, sistema de refrigeración WINDFORCE, tarjeta de video GV-N507TEAGLEOC ICE-16GD', 100, N'899', N'https://m.media-amazon.com/images/I/71ut+jzJ7hL._AC_SX425_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (2, N'A2', N'Fractal Design North XL Carbón Negro TG Oscuro', 100, N'180', N'https://m.media-amazon.com/images/I/71IyDaBF8RL._AC_SX425_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (3, N'A3', N'AMD Procesador de escritorio desbloqueado Ryzen™ 7 9700X de 8 núcleos y 16 hilos', 100, N'302', N'https://m.media-amazon.com/images/I/61F3ZChalyL._AC_SY450_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (4, N'A4', N'CORSAIR RM1000e (2025) Fuente de alimentación ATX totalmente modular de bajo ruido con cable de 12V-2x6 - Cumple con ATX 3.1 y PCIe 5.1, eficiencia Cybenetics Gold, condensadores clasificados a 221.0', 100, N'169', N'https://m.media-amazon.com/images/I/71DvsXvdUkL._AC_SX522_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (5, N'A5', N'Crucial T700 1TB Gen5 NVMe M.2 SSD - Hasta 11,700 MB/s - DirectStorage habilitado - CT1000T700SSD3 - Juegos, fotografía, edición de video y diseño - Unidad interna de estado sólido', 100, N'139', N'https://m.media-amazon.com/images/I/41UOk+pwd3L._AC_SX425_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (6, N'A6', N'ASUS TUF Gaming X870-PLUS WiFi AMD AM5 X870 ATX Motherboard, 16+2+1, 80A SPS Power Stages, DDR5, PCIe 5.0 Ready, cuatro ranuras M.2, Wi-Fi 7, LAN de 2.5 Gb, HDMI, USB4® 40Gbps, SATA 6 Gbps, USB 20Gbps', 100, N'380', N'https://m.media-amazon.com/images/I/8142EMqsPdL._AC_SX425_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (7, N'A7', N'G.SKILL Trident Z5 Neo RGB Series (AMD Expo) DDR5 RAM 32 GB (2 x 16 GB) 6400MT/s CL30-39-39-102 1.40V Memoria de computadora de escritorio UDIMM - Negro mate (F5-6400J3039G16GX2-TZ5NR)', 100, N'124', N'https://m.media-amazon.com/images/I/61XlVUhmP+L._AC_SX522_PIbundle-2,TopRight,0,0_SH20_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (8, N'A8', N'AMD Procesador de escritorio desbloqueado Ryzen™ 9 9900X de 12 núcleos y 24 hilos', 100, N'379', N'https://m.media-amazon.com/images/I/61dukbEGziL._AC_SY450_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (9, N'A9', N'WEELIAO GUNNIR Intel Arc A770 Photon 16G OC Tarjeta gráfica negra, tarjeta de video de 2400 Mhz, GDDR6 de 16G 256 bits, PCIE4.0, 1 HDMI, 3 DP, 3 ventiladores, TBP 285', 100, N'339', N'https://m.media-amazon.com/images/I/51gdwA-ci6L._AC_SX425_.jpg')
INSERT [dbo].[productos] ([id], [codigo_producto], [nombre], [existencia], [precio], [img]) VALUES (10, N'A10', N'ARCTIC MX-4 (0.14 oz) - Pasta térmica de alto rendimiento para todos los procesadores (CPU, GPU - PC), muy alta conductividad térmica, larga durabilidad, aplicación segura, no conductora', 100, N'7', N'https://m.media-amazon.com/images/I/51fVtU+cDIL._AC_SX522_.jpg')
SET IDENTITY_INSERT [dbo].[productos] OFF
GO

SET IDENTITY_INSERT [dbo].[usuarios] ON 

INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (1, N'Gustavo', N'Moros', N'1606')
INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (2, N'Jesus', N'Montilla', N'1234')
INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (3, N'Andry', N'Soto', N'654321')
INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (4, N'Claudio', N'Palmar', N'5678')
INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (5, N'Diego', N'Sandoval', N'0987')
INSERT [dbo].[usuarios] ([id], [nombre], [apellido], [clave]) VALUES (8, N'Admin', N'admin', N'admin')
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO

ALTER TABLE [dbo].[registro_ventas]  WITH CHECK ADD FOREIGN KEY([producto_id])
REFERENCES [dbo].[productos] ([id])
GO
ALTER TABLE [dbo].[registro_ventas]  WITH CHECK ADD  CONSTRAINT [fk_id_usuario] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[registro_ventas] CHECK CONSTRAINT [fk_id_usuario]
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecords]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllRecords]
AS
BEGIN 
	select usuarios.nombre as nombre_usuario, registro_ventas.fecha_venta, productos.nombre as nombre_producto, registro_ventas.cantidad,registro_ventas.precio_unitario, registro_ventas.total
	from registro_ventas, usuarios, productos
	where productos.id=registro_ventas.producto_id and usuarios.id=registro_ventas.id_usuario;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllUsers]
AS
BEGIN
	SELECT * FROM usuarios;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUser]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUser]
	@id int
AS
BEGIN
	SELECT * FROM usuarios
	WHERE id=@id;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUserName]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserName]
	@name varchar(255)
AS
BEGIN
	SELECT * FROM USUARIOS
	WHERE NOMBRE=@name;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertRegistro]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertRegistro]
    @fecha_venta DATE,
    @producto_id INT,
    @cantidad INT,
    @precio_unitario money,
	@usuario_id INT
AS
BEGIN
    INSERT INTO registro_ventas VALUES (@fecha_venta, @producto_id, @cantidad, @precio_unitario, @cantidad * @precio_unitario, @usuario_id);
	exec SP_RestarExistencias @producto_id,@cantidad;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertUser]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertUser]
    @nombre VARCHAR(255),
    @apellido VARCHAR(255),
    @clave VARCHAR(255)
AS
BEGIN
    INSERT INTO usuarios (nombre,apellido,clave)
    VALUES (@nombre, @apellido, @clave);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_BorrarProductosPorCodigo]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_BorrarProductosPorCodigo]
    @codigo_producto VARCHAR(255)
AS
BEGIN
    -- Eliminar productos que tengan un código similar
    DELETE FROM Productos
    WHERE codigo_producto LIKE '%' + @codigo_producto + '%';
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Consulta]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Consulta]
AS
SELECT * FROM productos
WHERE codigo_producto = 'A005'
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteProduct]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteProduct]
	@code varchar(225)
AS
BEGIN
	delete productos
	where codigo_producto=@code
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteProductById]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_DeleteProductById]
	@id int
AS
BEGIN
	delete productos
	where id=@id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllProducts]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllProducts]
AS
BEGIN
    SELECT * FROM productos;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetProduct]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetProduct]
	@code varchar(225)
AS
BEGIN
	select * from productos
	where codigo_producto=@code
END
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertProduct]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_InsertProduct]
	@code varchar(225),
	@name  varchar(225),
	@exist int,
	@price varchar(255),
	@img varchar(255)
AS
BEGIN
    INSERT INTO Productos (codigo_producto, nombre, existencia, precio, img)
	values (@code, @name,@exist,@price,@img);
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Prueba1]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SP_Prueba1]
as
print 'Hola mundo'
execute SP_Prueba1
GO
/****** Object:  StoredProcedure [dbo].[SP_RestarExistencias]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_RestarExistencias]
@id INT,
@Cantidad AS INT
AS
UPDATE productos SET existencia-=@Cantidad
WHERE id=@id;
GO
/****** Object:  StoredProcedure [dbo].[SP_SumarExistencias]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SumarExistencias]
@CodProducto AS VARCHAR(225),
@Cantidad AS INT
AS
UPDATE productos SET existencia+=@Cantidad
WHERE codigo_producto=@CodProducto
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateProduct]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateProduct]
	@code varchar(225),
	@name  varchar(225),
	@exist int,
	@price varchar(255),
	@img varchar(255)
AS
BEGIN
	Update productos
	set nombre=@name, existencia=@exist , precio=@price, img=@img
	where productos.codigo_producto=@code;
END
GO
USE [master]
GO
ALTER DATABASE [Inventario] SET  READ_WRITE 
GO