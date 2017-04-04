
/*
SELECT * FROM Estudiante;
SELECT * FROM Modulo;
SELECT * FROM Capitulo;
SELECT * FROM Seccion;
SELECT * FROM Contenido;
INSERT INTO Estudiante (cedula, nombre, apellido, telefono, direccion, ciudad, provincia, distrito, password, correo)
    VALUES ('0951060185','jorge enrique', 'vergara palma', '3092761','26 y la m','guayaqui','guayas','distrituo 4','12345','jorgenver@espol.edu.ec');
INSERT INTO Modulo(titulo, indice) VALUES ('Lectura de Planos',1);
INSERT INTO Modulo(titulo, indice) VALUES ('Tecnologia de Hormigon',2);
INSERT INTO Modulo(titulo, indice) VALUES ('Acero y Armadura',3);
INSERT INTO Modulo(titulo, indice) VALUES ('Topografia',4);

INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Introduccion',1,1);
INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Tipos de Planos',2,1);
INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Plano tipo 1',3,1);
INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Plano tipo 2',4,1);
INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Plano tipo 3',5,1);

INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Introduccion al Hormigon',1,2);
INSERT INTO Capitulo(titulo, indice, modulo) VALUES ('Tipos de Hormigon',2,2);

CALL getUserInfoByCedula('0951060185');
CALL getModulos();
CALL getCapitulosByModuloId(1);
CALL getModulo(1);
*/

DELIMITER //
CREATE PROCEDURE getUserInfoByCedula
(IN ced CHAR(255))
BEGIN
  SELECT * FROM Estudiante
  WHERE cedula = ced;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getModulos()
BEGIN
  SELECT * FROM Modulo ORDER BY indice;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getCapitulosByModuloId
(IN idModulo INT)
BEGIN
  SELECT * FROM Capitulo WHERE modulo = idModulo ORDER BY indice;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getModulo
(IN idModulo INT)
BEGIN
  SELECT * FROM Modulo WHERE id=idModulo;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getSeccionesByCapituloId
(IN idCapitulo INT)
BEGIN
  SELECT id,titulo,indice FROM Seccion
  WHERE Seccion.capitulo=idCapitulo
  ORDER BY Seccion.indice;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getContenidoCapitulonByCapituloId
(IN idCapitulo INT)
BEGIN
  SELECT Seccion.id,Seccion.indice as indice_seccion,Contenido.indice as indice_parrafo,texto,
    tipo_multimedia,ruta_multimedia,descripcion_multimedia,fuente_multimedia
  FROM Seccion,Contenido
  WHERE Seccion.capitulo=idCapitulo
        and Seccion.id=Contenido.seccion
  ORDER BY Seccion.indice,Contenido.indice;
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE getPreguntasCapitulo
(IN idCapitulo INT)
BEGIN
  SELECT * FROM Pregunta WHERE capitulo=idCapitulo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getPreguntasModulo
(IN idModulo INT)
BEGIN
  SELECT * FROM Pregunta WHERE modulo=idModulo;
END //
DELIMITER ;

CALL getSeccionesByCapituloId(1);
CALL getContenidoCapitulonByCapituloId(1);
CALL getPreguntasCapitulo(1);




