-- Active: 1699242537309@@localhost@5432@deswebsemana6@public
-- Tabla para Roles
CREATE TABLE tbl_roles (
  id SERIAL PRIMARY KEY,
  rol VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO tbl_roles(rol) VALUES('ADMIN'),('CLIENT');

-- Tabla para Usuarios
CREATE TABLE tbl_usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) UNIQUE NOT NULL,
  rol_id INT REFERENCES tbl_roles(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE postInfo(
  id SERIAL PRIMARY KEY,
  post TEXT,
  user_id INT REFERENCES tbl_usuarios(id) ON DELETE CASCADE,
  created_date TIMESTAMP DEFAULT current_timestamp
);
