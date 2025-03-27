USE [Inventario]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.proveedores', 'U') IS NOT NULL
    DROP TABLE dbo.proveedores;
GO

CREATE TABLE [dbo].[proveedores] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE()
);
GO

IF OBJECT_ID('dbo.sp_InsertProveedor', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_InsertProveedor;
GO

IF OBJECT_ID('dbo.sp_GetAllProveedores', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_GetAllProveedores;
GO

IF OBJECT_ID('dbo.sp_GetProveedorById', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_GetProveedorById;
GO

IF OBJECT_ID('dbo.sp_UpdateProveedor', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_UpdateProveedor;
GO

IF OBJECT_ID('dbo.sp_DeleteProveedor', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_DeleteProveedor;
GO

CREATE PROCEDURE dbo.sp_InsertProveedor
    @nombre VARCHAR(255),
    @email VARCHAR(255),
    @telefono VARCHAR(20)
AS
BEGIN
    INSERT INTO dbo.proveedores (nombre, email, telefono)
    VALUES (@nombre, @email, @telefono);
END
GO

CREATE PROCEDURE dbo.sp_GetAllProveedores
AS
BEGIN
    SELECT * FROM dbo.proveedores;
END
GO

CREATE PROCEDURE dbo.sp_GetProveedorById
    @id INT
AS
BEGIN
    SELECT * FROM dbo.proveedores WHERE id = @id;
END
GO

CREATE PROCEDURE dbo.sp_UpdateProveedor
    @id INT,
    @nombre VARCHAR(255),
    @email VARCHAR(255),
    @telefono VARCHAR(20)
AS
BEGIN
    UPDATE dbo.proveedores
    SET nombre = @nombre, email = @email, telefono = @telefono
    WHERE id = @id;
END
GO

CREATE PROCEDURE dbo.sp_DeleteProveedor
    @id INT
AS
BEGIN
    DELETE FROM dbo.proveedores WHERE id = @id;
END
GO