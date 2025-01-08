CREATE DATABASE "GDA00133-OT_Axel-Zarpec";

USE [GDA00133-OT_Axel-Zarpec]

CREATE TABLE estados(
	idEstados int primary key IDENTITY(1,1),
	nombreEstado varchar(50)
);

CREATE TABLE rol(
	idRol int primary key IDENTITY(1,1),
	nombreRol varchar(50)
);

CREATE TABLE unidad_medida(
	idUnidad INT PRIMARY KEY IDENTITY(1,1)
	unidad varchar(25)
);

CREATE TABLE Clientes(
	idCliente INT PRIMARY KEY IDENTITY(1,1),
	razon_Social varchar(245),
	nombre_Comercial varchar(50),
	direccion_Entrega VARCHAR (50),
	telefono char(8),
	email varchar(50)
);

CREATE TABLE usuarios (
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	rol_fk int references rol(idRol),
	estados_fk int references estados(idEstados),
	email VARCHAR(50),
	nombre varchar(50),
	apellido varchar(50),
	"password" varchar(245),
	telefono char(8),
	fecha_nacimiento date,
	fecha_creacion datetime,
	cliente_fk int REFERENCES Clientes(idCliente)

);

CREATE TABLE Categoria_producto(
	idCategoria INT PRIMARY KEY IDENTITY(1,1),
	nombre_categoria VARCHAR(50),
);

CREATE TABLE subcategoria(
	idSubcategoria INT PRIMARY KEY IDENTITY(1,1),
	subcategoria VARCHAR(25),
	subcategoria_padre int references subcategoria(idsubcategoria),
	categoria_fk int references categoria_producto(idcategoria) 
);

CREATE TABLE producto(
	idproducto INT PRIMARY KEY IDENTITY(1,1),
	nombre_producto VARCHAR(50),
	cantidad_medida varchar (15),
	unidad_medida_fk INT REFERENCES unidad_medida(idunidad),
	subcategoria_prod INT REFERENCES subcategoria(idsubcategoria),
	precio FLOAT,
	stock FLOAT,
	ruta_img varchar(245),
	fecha_ingresoP datetime,
	estado INT REFERENCES estados(idestados)
);

CREATE TABLE orden(
	idorden INT PRIMARY KEY IDENTITY(1,1),
	usuario_fk INT REFERENCES usuarios(idusuario),
	estado_fk INT REFERENCES estados(idestados),
	fecha_orden datetime,
	direccion VARCHAR(50),

);

CREATE TABLE DETALLES_ORDEN(
	iddetalle INT PRIMARY KEY IDENTITY(1,1),
	orden INT REFERENCES orden(idorden),
	producto_orden INT REFERENCES producto(idproducto),
	cantidad float,
);


--procedimientos
CREATE PROCEDURE spInsertar_estado
	@estado VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		INSERT INTO estados(nombreEstado) 
		VALUES (@estado);

		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;

CREATE PROCEDURE spModificar_estado
	@id int,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM estados WHERE idEstados = @id)
	BEGIN 
		UPDATE estados SET nombreEstado = @nuevo
		WHERE idEstados = @id;
		PRINT 'El estado se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'EL ESTADO NO SE ENCONTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar el estado: ' + ERROR_MESSAGE();
    END CATCH
END;

--exec spModificar_estado @antiguo = 'Activo1', @nuevo = 'Activo';

CREATE PROCEDURE spInsertar_rol
	@rol VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		INSERT INTO rol(nombreRol) 
		VALUES (@rol);

		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;


CREATE PROCEDURE spModificar_Rol
	@id INT,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM rol WHERE idRol = @id)
	BEGIN 
		UPDATE rol SET nombreRol = @nuevo
		WHERE idRol = @id;
		PRINT 'El estado se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'EL ESTADO NO SE ENCONTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar el estado: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spInsertar_Unidad_medida
	@Unidad_Medida VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		INSERT INTO unidad_Medida(unidad) 
		VALUES (@Unidad_Medida);

		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;

CREATE PROCEDURE spModificar_unidad_Medida
	@id INT,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM unidad_medida WHERE idUnidad = @id)
	BEGIN 
		UPDATE unidad_medida SET unidad = @nuevo
		WHERE idUnidad = @id;
		PRINT 'El campo se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'NO SE ENCONTRO EL REGISTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_Categoria
	@id INT,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM categoria_producto WHERE idCategoria = @id)
	BEGIN 
		UPDATE categoria_producto SET nombre_categoria = @nuevo
		WHERE idCategoria = @id;
		PRINT 'El campo se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'NO SE ENCONTRO EL REGISTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spInsertar_Categoria
	@Categoria VARCHAR(50)
AS
BEGIN
	BEGIN TRY
		INSERT INTO categoria_producto(nombre_categoria) 
		VALUES (@Categoria);

		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;


CREATE PROCEDURE spModificar_Categoria
	@id INT,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM categoria_producto WHERE idCategoria = @id)
	BEGIN 
		UPDATE categoria_producto SET nombre_categoria = @nuevo
		WHERE idCategoria = @id;
		PRINT 'El campo se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'NO SE ENCONTRO EL REGISTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

---------------------------------------
CREATE PROCEDURE spInsertar_cliente
	@razon_social VARCHAR(50),
	@nombre_comercial varchar(50),
	@direccion varchar(50),
	@telefono char(8),
	@email varchar(75)

AS
BEGIN
	BEGIN TRY
		INSERT INTO clientes(razon_Social,nombre_Comercial,direccion_Entrega,telefono,email) 
		VALUES (@razon_social,@nombre_comercial,@direccion,@telefono,@email);
		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;
----------------------------------------
spModificar_razon_socialC
	@id INT,
	@nuevo VARCHAR(25)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
	BEGIN 
		UPDATE Clientes SET razon_Social = @nuevo
		WHERE idCliente = @id;
		PRINT 'El campo se ha modificado correctamente';
	END
	ELSE
	BEGIN 
		PRINT 'NO SE ENCONTRO EL REGISTRO';
	END
	END TRY
	BEGIN CATCH
		PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END; 

CREATE PROCEDURE spModificar_nombre_comercialC
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
        BEGIN 
            UPDATE Clientes SET nombre_Comercial = @nuevo
            WHERE idCliente = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_direccion_entregaC
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
        BEGIN 
            UPDATE Clientes SET direccion_Entrega = @nuevo
            WHERE idCliente = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_telefonoC
    @id INT,
    @nuevo CHAR(8)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
        BEGIN 
            UPDATE Clientes SET telefono = @nuevo
            WHERE idCliente = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_emailC
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
        BEGIN 
            UPDATE Clientes SET email = @nuevo
            WHERE idCliente = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spInsertar_usuario
	@rol int,
	@estado int,
	@email varchar(50),
	@nombre varchar(50),
	@apellido varchar(50),
	@password varchar(245),
	@telefono char(8),
	@nacimiento date,
	@fechaCreacion datetime,
	@clienteFk int = null

AS
BEGIN
SET NOCOUNT ON;
	BEGIN TRY
		INSERT INTO usuarios(rol_fk,estados_fk,email,nombre,apellido,"password", telefono, fecha_nacimiento, fecha_creacion, cliente_fk)
		VALUES (@rol,@estado, @email,@nombre,@apellido, @password, @telefono, @nacimiento, @fechaCreacion, @clienteFk);
		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
        SELECT SCOPE_IDENTITY() AS idUsuario;
END;


CREATE PROCEDURE spModificar_rol_tUsuarios
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET rol_fk = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_estados_tUsuario
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET estados_fk = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_email_tUsuario
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET email = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_nombre_usuario
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET nombre = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_apellido_Usuario
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET apellido = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_password_Usuario
    @id INT,
    @nuevo VARCHAR(245)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET "password" = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_telefono_Usuario
    @id INT,
    @nuevo CHAR(8)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET telefono = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_fecha_nacimiento_usuario
    @id INT,
    @nuevo DATE
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN 
            UPDATE usuarios SET fecha_nacimiento = @nuevo
            WHERE idUsuario = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_usuario_orden
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM orden WHERE idorden = @id)
        BEGIN 
            UPDATE orden SET usuario_fk = @nuevo
            WHERE idorden = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_estado_orden
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM orden WHERE idorden = @id)
        BEGIN 
            UPDATE orden SET estado_fk = @nuevo
            WHERE idorden = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_fecha_orden
    @id INT,
    @nuevo DATETIME
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM orden WHERE idorden = @id)
        BEGIN 
            UPDATE orden SET fecha_orden = @nuevo
            WHERE idorden = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_direccion_orden
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM orden WHERE idorden = @id)
        BEGIN 
            UPDATE orden SET direccion = @nuevo
            WHERE idorden = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spInsertar_subcategoria
	@subcategoria varchar(25),
	@subcategoria_padre int = null,,
	@categoria_fk int
AS
BEGIN
	BEGIN TRY
		INSERT INTO subcategoria(subcategoria, subcategoria_padre, categoria_fk)
		VALUES (@subcategoria,@subcategoria_padre, @categoria_fk);
		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;

CREATE PROCEDURE spModificar_subcategoria
    @id INT,
    @nuevo VARCHAR(25)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM subcategoria WHERE idSubcategoria = @id)
        BEGIN 
            UPDATE subcategoria SET subcategoria = @nuevo
            WHERE idSubcategoria = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_subcategoria_padre
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM subcategoria WHERE idSubcategoria = @id)
        BEGIN 
            UPDATE subcategoria SET subcategoria_padre = @nuevo
            WHERE idSubcategoria = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_categoria_subcategoria
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM subcategoria WHERE idSubcategoria = @id)
        BEGIN 
            UPDATE subcategoria SET categoria_fk = @nuevo
            WHERE idSubcategoria = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;
----------------
CREATE TYPE DetallesOrdenType AS TABLE (
    producto_orden INT,
    cantidad FLOAT
);

CREATE PROCEDURE spInsertar_orden_con_detalles
    @usuario_fk INT,
    @estado_fk INT,
    @fecha_orden DATETIME,
    @direccion VARCHAR(50),
    @detalles_orden DetallesOrdenType READONLY
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @orden_id INT;
        DECLARE @stock INT;
        
        INSERT INTO orden (usuario_fk, estado_fk, fecha_orden, direccion)
        VALUES (@usuario_fk, @estado_fk, @fecha_orden, @direccion);

        
        SET @orden_id = SCOPE_IDENTITY();

       
        INSERT INTO detalles_orden (orden, producto_orden, cantidad)
        SELECT @orden_id, producto_orden, cantidad
        FROM @detalles_orden;
        
        SET @stock = (SELECT stock FROM producto WHERE idproducto = producto_orden);
        UPDATE producto SET stock = @stock - cantidad WHERE idproducto = producto_orden;

        COMMIT TRANSACTION;

        PRINT 'Se ha insertado correctamente la orden y sus detalles';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'OCURRIÓ UN ERROR: ' + ERROR_MESSAGE();
    END CATCH
END;

-------------------------------------------------------------------
CREATE PROCEDURE spInsertarClienteYUsuario
    @razon_Social VARCHAR(245),
    @nombre_Comercial VARCHAR(50),
    @direccion_Entrega VARCHAR(50),
    @telefonoCliente CHAR(8),
    @emailCliente VARCHAR(50),
    @rol_fk INT,
    @estados_fk INT,
    @emailUsuario VARCHAR(50),
    @nombreUsuario VARCHAR(50),
    @apellidoUsuario VARCHAR(50),
    @passwordUsuario VARCHAR(245),
    @telefonoUsuario CHAR(8),
    @fecha_nacimiento DATE
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insertar el cliente
        DECLARE @idCliente INT;
        INSERT INTO Clientes (razon_Social, nombre_Comercial, direccion_Entrega, telefono, email)
        VALUES (@razon_Social, @nombre_Comercial, @direccion_Entrega, @telefonoCliente, @emailCliente);
        SET @idCliente = SCOPE_IDENTITY();

        -- Insertar el usuario asociado al cliente
        INSERT INTO usuarios (rol_fk, estados_fk, email, nombre, apellido, "password", telefono, fecha_nacimiento, fecha_creacion, cliente_fk)
        VALUES (@rol_fk, @estados_fk, @emailUsuario, @nombreUsuario, @apellidoUsuario, @passwordUsuario, @telefonoUsuario, @fecha_nacimiento, GETDATE(), @idCliente);

        COMMIT TRANSACTION;

        PRINT 'Se han insertado correctamente el cliente y el usuario';
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        PRINT 'Ocurrió un error: ' + ERROR_MESSAGE();
    END CATCH
END;

-------------------------------------------------------------------

CREATE PROCEDURE spModificar_orden_DetalleOr
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM DETALLES_ORDEN WHERE iddetalle = @id)
        BEGIN 
            UPDATE DETALLES_ORDEN SET orden = @nuevo
            WHERE iddetalle = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_producto_DetalleOr
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM DETALLES_ORDEN WHERE iddetalle = @id)
        BEGIN 
            UPDATE DETALLES_ORDEN SET producto_orden = @nuevo
            WHERE iddetalle = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;


CREATE PROCEDURE spModificar_producto_DetalleOr
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM DETALLES_ORDEN WHERE iddetalle = @id)
        BEGIN 
            UPDATE DETALLES_ORDEN SET producto_orden = @nuevo
            WHERE iddetalle = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_cantidad_DetalleOr
    @id INT,
    @nuevo FLOAT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM DETALLES_ORDEN WHERE iddetalle = @id)
        BEGIN 
            UPDATE DETALLES_ORDEN SET cantidad = @nuevo
            WHERE iddetalle = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spInsertar_producto
	@nombre_producto varchar (50),
	@cantidad_medida varchar(15),
	@unidad_medida_fk int,
	@subcategoria_fk int,
	@precio float,
	@stock float,
	@ruta_img varchar(245),
	@fecha_ingresoP datetime,
	@estado_fk int
AS
BEGIN
	BEGIN TRY
		INSERT INTO producto(nombre_producto,cantidad_medida,unidad_medida_fk,subcategoria_prod,precio,stock,ruta_img,fecha_ingresoP,estado)
		VALUES (@nombre_producto,@cantidad_medida,@unidad_medida_fk,@subcategoria_fk,@precio,@stock,@ruta_img,@fecha_ingresoP,@estado_fk);
		PRINT 'se ha insertado correctamente';
		END TRY 
	BEGIN CATCH
		PRINT 'OCURRIO UN ERROR:'+ERROR_MESSAGE();
		END CATCH
END;

CREATE PROCEDURE spModificar_nombre_producto
    @id INT,
    @nuevo VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET nombre_producto = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_cantidad_medida_producto
    @id INT,
    @nuevo VARCHAR(15)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET cantidad_medida = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_unidad_medida_producto
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET unidad_medida_fk = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_subcategoria_producto
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET subcategoria_prod = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_precio_producto
    @id INT,
    @nuevo FLOAT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET precio = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_stock_producto
    @id INT,
    @nuevo FLOAT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET stock = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_ruta_img_producto
    @id INT,
    @nuevo VARCHAR(245)
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET ruta_img = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_fecha_ingreso_producto
    @id INT,
    @nuevo DATETIME
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET fecha_ingresoP = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

CREATE PROCEDURE spModificar_estado_producto
    @id INT,
    @nuevo INT
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN 
            UPDATE producto SET estado = @nuevo
            WHERE idproducto = @id;
            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN 
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

-------------------------------------------------------------
CREATE PROCEDURE spModificarProducto
    @id INT,
    @nuevoNombre VARCHAR(50) = NULL,
    @nuevaCantidadMedida VARCHAR(15) = NULL,
    @nuevaUnidadMedida INT = NULL,
    @nuevaSubcategoria INT = NULL,
    @nuevoPrecio FLOAT = NULL,
    @nuevoStock FLOAT = NULL,
    @nuevaRutaImg VARCHAR(245) = NULL
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM producto WHERE idproducto = @id)
        BEGIN
            UPDATE producto
            SET nombre_producto = COALESCE(@nuevoNombre, nombre_producto),
                cantidad_medida = COALESCE(@nuevaCantidadMedida, cantidad_medida),
                unidad_medida_fk = COALESCE(@nuevaUnidadMedida, unidad_medida_fk),
                subcategoria_prod = COALESCE(@nuevaSubcategoria, subcategoria_prod),
                precio = COALESCE(@nuevoPrecio, precio),
                stock = COALESCE(@nuevoStock, stock),
                ruta_img = COALESCE(@nuevaRutaImg, ruta_img)
            WHERE idproducto = @id;
            PRINT 'El registro se ha modificado correctamente';
        END
        ELSE
        BEGIN
            PRINT 'NO SE ENCONTRÓ EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;
------------------------------------------------------------------------------------
CREATE PROCEDURE spModificarUsuario
    @id INT,
    @nuevoRol INT = NULL,
    @nuevoEstado INT = NULL,
    @nuevoEmail VARCHAR(50) = NULL,
    @nuevaContresña VARCHAR(245) = NULL,
    @nuevoNombre VARCHAR(50) = NULL,
    @nuevoApellido VARCHAR(50) = NULL,
    @nuevoTelefono CHAR(8) = NULL,
    @nuevoFechaNacimiento DATE = NULL
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @id)
        BEGIN
            UPDATE usuarios
            SET 
                rol_fk = COALESCE(@nuevoRol, rol_fk),
                estados_fk = COALESCE(@nuevoEstado, estados_fk),
                email = COALESCE(@nuevoEmail, email),
                password = COALESCE(@nuevaContresña, password),
                nombre = COALESCE(@nuevoNombre, nombre),
                apellido = COALESCE(@nuevoApellido, apellido),
                telefono = COALESCE(@nuevoTelefono, telefono),
                fecha_nacimiento = COALESCE(@nuevoFechaNacimiento, fecha_nacimiento)
            WHERE idUsuario = @id;

            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

------------------------------------------------------------------------------------
CREATE PROCEDURE spModificarSubcategoria
    @id INT,
    @nuevoNombre VARCHAR(25) = NULL,
    @nuevoSubcategoriaPadre INT = NULL,
    @nuevoCategoriaFK INT = NULL
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM subcategoria WHERE idSubcategoria = @id)
        BEGIN
            UPDATE subcategoria
            SET 
                subcategoria = COALESCE(@nuevoNombre, subcategoria),
                subcategoria_padre = COALESCE(@nuevoSubcategoriaPadre, subcategoria_padre),
                categoria_fk = COALESCE(@nuevoCategoriaFK, categoria_fk)
            WHERE idSubcategoria = @id;

            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

-------------------------------------------------------------------------------------
CREATE PROCEDURE spModificarCliente
    @id INT,
    @nuevaRazonSocial VARCHAR(25) = NULL,
    @nuevoNombreComercial VARCHAR(50) = NULL,
    @nuevaDireccionEntrega VARCHAR(50) = NULL,
    @nuevoTelefono CHAR(8) = NULL,
    @nuevoEmail VARCHAR(50) = NULL
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @id)
        BEGIN
            UPDATE Clientes
            SET 
                razon_Social = COALESCE(@nuevaRazonSocial, razon_Social),
                nombre_Comercial = COALESCE(@nuevoNombreComercial, nombre_Comercial),
                direccion_Entrega = COALESCE(@nuevaDireccionEntrega, direccion_Entrega),
                telefono = COALESCE(@nuevoTelefono, telefono),
                email = COALESCE(@nuevoEmail, email)
            WHERE idCliente = @id;

            PRINT 'El campo se ha modificado correctamente';
        END
        ELSE
        BEGIN
            PRINT 'NO SE ENCONTRO EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;
-------------------------------------------------------------------------------------
CREATE PROCEDURE spModificarClienteYUsuario
    @idCliente INT,
    @razon_Social VARCHAR(245) = NULL,
    @nombre_Comercial VARCHAR(50) = NULL,
    @direccion_Entrega VARCHAR(50) = NULL,
    @telefonoCliente CHAR(8) = NULL,
    @emailCliente VARCHAR(50) = NULL,
    @rol_fk INT = NULL,
    @estados_fk INT = NULL,
    @emailUsuario VARCHAR(50) = NULL,
    @nombreUsuario VARCHAR(50) = NULL,
    @apellidoUsuario VARCHAR(50) = NULL,
    @passwordUsuario VARCHAR(245) = NULL,
    @telefonoUsuario CHAR(8) = NULL,
    @fecha_nacimiento DATE = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

		DECLARE @idUsuario INT
        IF @idCliente IS NOT NULL AND EXISTS (SELECT 1 FROM Clientes WHERE idCliente = @idCliente)
        BEGIN

            UPDATE Clientes
            SET 
                razon_Social = COALESCE(@razon_Social, razon_Social),
                nombre_Comercial = COALESCE(@nombre_Comercial, nombre_Comercial),
                direccion_Entrega = COALESCE(@direccion_Entrega, direccion_Entrega),
                telefono = COALESCE(@telefonoCliente, telefono),
                email = COALESCE(@emailCliente, email)
            WHERE idCliente = @idCliente;

            PRINT 'El cliente existente ha sido actualizado.';
        END
  
		SET @idUsuario = (SELECT u.idUsuario FROM usuarios u WHERE u.cliente_fk = @idCliente)
        IF @idUsuario IS NOT NULL AND EXISTS (SELECT 1 FROM usuarios WHERE idUsuario = @idUsuario)
        BEGIN
   
            UPDATE usuarios
            SET 
                rol_fk = COALESCE(@rol_fk, rol_fk),
                estados_fk = COALESCE(@estados_fk, estados_fk),
                email = COALESCE(@emailUsuario, email),
                nombre = COALESCE(@nombreUsuario, nombre),
                apellido = COALESCE(@apellidoUsuario, apellido),
                "password" = COALESCE(@passwordUsuario, "password"),
                telefono = COALESCE(@telefonoUsuario, telefono),
                fecha_nacimiento = COALESCE(@fecha_nacimiento, fecha_nacimiento),
                cliente_fk = @idCliente
            WHERE idUsuario = @idUsuario;

            PRINT 'El usuario existente ha sido actualizado.';
        END


        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH

        ROLLBACK TRANSACTION;
        PRINT 'Ocurrió un error: ' + ERROR_MESSAGE();
    END CATCH
END;
-------------------------------------------------------------------------------------
CREATE PROCEDURE spModificarOrden
    @id INT,
    @usuario_fk INT = NULL,
    @estado_fk INT = NULL,
    @direccion VARCHAR(50) = NULL 
AS
BEGIN
    BEGIN TRY
 
        IF EXISTS (SELECT 1 FROM orden WHERE idorden = @id)
        BEGIN

            UPDATE orden
            SET usuario_fk = COALESCE(@usuario_fk, usuario_fk),
                estado_fk = COALESCE(@estado_fk, estado_fk),
                direccion = COALESCE(@direccion, direccion)
            WHERE idorden = @id;

            PRINT 'Los campos se han modificado correctamente';
        END
        ELSE
        BEGIN
            PRINT 'NO SE ENCONTRÓ EL REGISTRO';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Ocurrió un error al actualizar: ' + ERROR_MESSAGE();
    END CATCH
END;

-------------------------------------------------------------------------------------
-- Tabla estados
INSERT INTO estados (nombreEstado) VALUES 
('Activo'),
('Inactivo'),
('Pendiente'),
('Eliminado');

-- Tabla rol
INSERT INTO rol (nombreRol) VALUES 
('Administrador'),
('Cliente'),
('Vendedor');

-- Tabla unidad_medida
INSERT INTO unidad_medida (unidad) VALUES 
('kg'),
('L'),
('unidad'),
('m'),
('g');

-- Tabla Clientes
INSERT INTO Clientes (razon_Social, nombre_Comercial, direccion_Entrega, telefono, email) VALUES
('Sociedad Anónima XYZ', 'Comercial XYZ', 'Zona 1, Guatemala', '12345678', 'contacto@xyz.com'),
('Grupo ABC Ltda', 'Super ABC', 'Zona 5, Guatemala', '87654321', 'info@abc.com'),
('Distribuidora DEF', 'DEF Distribuciones', 'Zona 10, Guatemala', '56781234', 'ventas@def.com'),
('Alimentos y Bebidas S.A.', 'Alibesa', 'Zona 3, Guatemala', '78945612', 'contacto@alibesa.com'),
('Distribuidora La Estrella', 'La Estrella', 'Zona 12, Guatemala', '45612378', 'ventas@laestrella.com'),
('Corporación Gamma', 'Gamma Corp', 'Zona 9, Guatemala', '12348765', 'soporte@gammacorp.com');

-- Tabla usuarios
INSERT INTO usuarios (rol_fk, estados_fk, email, nombre, apellido, "password", telefono, fecha_nacimiento, fecha_creacion, cliente_fk) VALUES
(1, 1, 'admin@tienda.com', 'Juan', 'Pérez', 'admin123', '12345678', '1985-06-15', GETDATE(), NULL),
(2, 1, 'cliente1@tienda.com', 'María', 'Lopez', 'cliente123', '23456789', '1990-02-10', GETDATE(), 1),
(3, 1, 'vendedor@tienda.com', 'Carlos', 'Ramírez', 'vendedor123', '34567890', '1988-11-25', GETDATE(), NULL),
(2, 1, 'cliente2@tienda.com', 'Lucía', 'Martínez', 'cliente456', '98765432', '1992-03-18', GETDATE(), 2),
(2, 1, 'cliente3@tienda.com', 'Fernando', 'Alvarez', 'cliente789', '87654321', '1985-12-05', GETDATE(), 3),
(3, 1, 'vendedor2@tienda.com', 'Andrea', 'Hernández', 'vendedor456', '54321987', '1990-07-20', GETDATE(), NULL);

-- Tabla Categoria_producto
INSERT INTO Categoria_producto (nombre_categoria) VALUES 
('Electrodomésticos'),
('Tecnología'),
('Hogar'),
('Deportes');

-- Tabla subcategoria
INSERT INTO subcategoria (subcategoria, subcategoria_padre, categoria_fk) VALUES 
('Televisores', NULL, 2),
('Laptops', NULL, 2),
('Sofás', NULL, 3),
('Bicicletas', NULL, 4),
('Smartphones', NULL, 2),
('Camas', NULL, 3);

-- Tabla producto
INSERT INTO producto (nombre_producto, cantidad_medida, unidad_medida_fk, subcategoria_prod, precio, stock, ruta_img, fecha_ingresoP, estado) VALUES
('Televisor Samsung 55"', '1 unidad', 3, 1, 4500.00, 20, 'img/televisor1.jpg', GETDATE(), 1),
('Laptop Dell Inspiron', '1 unidad', 3, 2, 7000.00, 15, 'img/laptop1.jpg', GETDATE(), 1),
('Sofá cama', '1 unidad', 3, 3, 2500.00, 10, 'img/sofa1.jpg', GETDATE(), 1),
('Bicicleta de montaña', '1 unidad', 3, 4, 1800.00, 25, 'img/bici1.jpg', GETDATE(), 1),
('iPhone 14', '1 unidad', 3, 5, 12000.00, 30, 'img/iphone1.jpg', GETDATE(), 1),
('Refrigeradora LG', '1 unidad', 3, 1, 8500.00, 12, 'img/refrigeradora.jpg', GETDATE(), 1),
('Lavadora Whirlpool', '1 unidad', 3, 1, 7500.00, 8, 'img/lavadora.jpg', GETDATE(), 1),
('Smart TV Sony 65"', '1 unidad', 3, 1, 9500.00, 10, 'img/tv_sony.jpg', GETDATE(), 1),
('Escritorio de oficina', '1 unidad', 3, 3, 1200.00, 15, 'img/escritorio.jpg', GETDATE(), 1),
('Tostadora de pan', '1 unidad', 3, 1, 400.00, 50, 'img/tostadora.jpg', GETDATE(), 1),
('Cámara DSLR Canon', '1 unidad', 3, 2, 15000.00, 7, 'img/camara_canon.jpg', GETDATE(), 1);

-- Tabla orden
INSERT INTO orden (usuario_fk, estado_fk, fecha_orden, direccion) VALUES
(2, 1, GETDATE(), 'Zona 1, Guatemala'),
(2, 1, GETDATE(), 'Zona 10, Guatemala'),
(2, 1, GETDATE(), 'Zona 3, Guatemala'),
(3, 1, GETDATE(), 'Zona 9, Guatemala'),
(4, 1, GETDATE(), 'Zona 12, Guatemala'),
(5, 1, GETDATE(), 'Zona 5, Guatemala');
(1, 1, '2024-08-05 14:30:00', 'Zona 1, Ciudad de Guatemala'),
(2, 2, '2024-08-12 09:45:00', 'Zona 10, Ciudad de Guatemala'),
(3, 1, '2024-08-18 16:20:00', 'Zona 5, Ciudad de Guatemala'),
(4, 1, '2024-08-22 10:15:00', 'Zona 11, Ciudad de Guatemala'),
(5, 3, '2024-08-30 12:10:00', 'Zona 7, Ciudad de Guatemala');


-- Tabla DETALLES_ORDEN
INSERT INTO DETALLES_ORDEN (orden, producto_orden, cantidad) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(2, 5, 1),
(3, 6, 1),
(3, 4, 1),
(3, 2, 2),
(4, 5, 1),
(4, 3, 1),
(5, 1, 1),
(6, 8, 2),
(6, 7, 1),
(7, 1, 2.5), 
(7, 2, 1), 
(8, 3, 4),  
(8, 1, 1.5),
(9, 4, 3),
(9, 5, 2),
(10, 6, 5),
(11, 2, 1), 
(11, 4, 2.2); 

CREATE VIEW Vista_total_productos_activos 
AS 
SELECT COUNT(*) AS TotalProductosActivos
FROM producto
WHERE estado = 1 AND stock > 0;



CREATE VIEW ordendes_agosto2024_Quezales
AS
SELECT 
    COALESCE(SUM(d.cantidad * p.precio), 0) AS TotalQuetzales
FROM 
    DETALLES_ORDEN d
JOIN 
    producto p ON d.producto_orden = p.idproducto
JOIN 
    orden o ON d.orden = o.idorden
WHERE 
    o.fecha_orden BETWEEN '2024-08-01' AND '2024-08-31';


CREATE VIEW mayorConsumo_top10Clientes
AS
SELECT TOP 10
    c.idCliente, 
    c.razon_Social, 
    SUM(d.cantidad * p.precio) AS TotalConsumo
FROM 
    Clientes c
JOIN 
    usuarios u ON c.idCliente = u.cliente_fk
JOIN 
    orden o ON u.idUsuario = o.usuario_fk
JOIN 
    DETALLES_ORDEN d ON o.idorden = d.orden
JOIN 
    producto p ON d.producto_orden = p.idproducto
GROUP BY 
    c.idCliente, c.razon_Social
ORDER BY 
    TotalConsumo DESC;


CREATE VIEW Productos_top10MasVendidos
AS
SELECT TOP 10
    p.idproducto, 
    p.nombre_producto, 
    SUM(d.cantidad) AS TotalCantidadVendida
FROM 
    DETALLES_ORDEN d
JOIN 
    producto p ON d.producto_orden = p.idproducto
GROUP BY 
    p.idproducto, p.nombre_producto
ORDER BY 
    TotalCantidadVendida asc;
