
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
CREATE PROCEDURE getInfoCapituloById
(IN idCapitulo INT)
BEGIN
  SELECT * FROM Capitulo WHERE id=idCapitulo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getInfoModuloById
(IN idModulo INT)
BEGIN
  SELECT * FROM Modulo WHERE id=idModulo;
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE getPreguntasCapitulo
(IN idCapitulo INT)
BEGIN
  SELECT * FROM Pregunta WHERE capitulo=idCapitulo
  ORDER BY id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getPreguntasModulo
(IN idModulo INT)
BEGIN
  SELECT * FROM Pregunta WHERE modulo=idModulo
  ORDER BY id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getCalificacionCapitulosByEstudianteId
(IN idEstudiante INT)
BEGIN
  Select Modulo.id,Modulo.indice as indice_Modulo, Capitulo.indice as indice_capitulo, Capitulo.id as id_capitulo, Capitulo.titulo as titulo_capitulo,
  TRUNCATE ((SELECT calificacion FROM calificacion_capitulo WHERE Capitulo.id=calificacion_capitulo.capitulo and calificacion_capitulo.estudiante=idEstudiante),2) as calificacion
  FROM Modulo,Capitulo
  WHERE Modulo.id=Capitulo.modulo
  ORDER BY indice_Modulo, indice_capitulo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getCalificacionModuloByEstudianteId
(IN idEstudiante INT)
BEGIN
  Select Modulo.id,Modulo.indice as indice_Modulo, Modulo.titulo,
  TRUNCATE ((SELECT calificacion FROM calificacion_modulo WHERE Modulo.id=calificacion_modulo.modulo and calificacion_modulo.estudiante=idEstudiante),2) as calificacion
  FROM Modulo
  WHERE Modulo.id
  ORDER BY indice_Modulo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getCalificacionCapitulo
(IN idCapitulo INT, idEstudiante INT)
BEGIN
  SELECT * FROM calificacion_capitulo WHERE capitulo=idCapitulo and estudiante=idEstudiante;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getCalificacionCapitulo
(IN idCapitulo INT, idEstudiante INT)
BEGIN
  SELECT * FROM calificacion_capitulo WHERE capitulo=idCapitulo and estudiante=idEstudiante;
END //
DELIMITER ;

DROP PROCEDURE guardarCalificacionCapituloEstudiante;
DELIMITER //
CREATE PROCEDURE guardarCalificacionCapituloEstudiante
(IN idCapitulo INT, idEstudiante INT,calificacion_estudiante DOUBLE)
BEGIN
  INSERT INTO calificacion_capitulo (capitulo, estudiante,calificacion) VALUES(idCapitulo,idEstudiante,calificacion_estudiante) ON DUPLICATE KEY UPDATE
  calificacion=TRUNCATE(GREATEST(calificacion,calificacion_estudiante),2);
END //
DELIMITER ;

DROP PROCEDURE guardarCalificacionModuloEstudiante;
DELIMITER //
CREATE PROCEDURE guardarCalificacionModuloEstudiante
(IN idModulo INT, idEstudiante INT,calificacion_estudiante DOUBLE)
BEGIN
  INSERT INTO calificacion_modulo (modulo, estudiante,calificacion) VALUES(idModulo,idEstudiante,calificacion_estudiante) ON DUPLICATE KEY UPDATE
  calificacion=TRUNCATE(GREATEST(calificacion,calificacion_estudiante),2);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteModulo
(IN idModulo INT)
BEGIN
  DELETE FROM Modulo
  WHERE id=idModulo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE guardarModulo
(IN number INT, IN title VARCHAR(255))
BEGIN
 INSERT INTO Modulo (Modulo.indice,Modulo.titulo)
 VALUES (number,title);
END //
DELIMITER ;


CALL getSeccionesByCapituloId(1);
CALL getContenidoCapitulonByCapituloId(1);
CALL getPreguntasCapitulo(1);
CALL getCalificacionCapitulosByEstudianteId(1);
CALL getCalificacionModuloByEstudianteId(1);
CALL getInfoCapituloById(1);
CALL getInfoModuloById(1);
CALL getPreguntasCapitulo(1);
CALL guardarCalificacionCapituloEstudiante(1,1,30.3312312312312312);
CALL guardarCalificacionModuloEstudiante(1,1,1);
CALL getModulos();
CALL deleteModulo(7);
CALL guardarModulo(1,'asd');

SELECT Modulo.id,Modulo.indice as indice_Modulo, Capitulo.indice as indice_capitulo, Capitulo.id as id_capitulo, Capitulo.titulo as titulo_capitulo,
  (SELECT calificacion FROM calificacion_capitulo WHERE Capitulo.id=calificacion_capitulo.capitulo and calificacion_capitulo.estudiante=4) as calificacion
FROM Modulo,Capitulo
where Modulo.id=Capitulo.modulo;

Select Modulo.id,Modulo.indice as indice_Modulo, Modulo.titulo,
  (SELECT calificacion FROM calificacion_modulo WHERE Modulo.id=calificacion_modulo.modulo and calificacion_modulo.estudiante=1) as calificacion
FROM Modulo
where Modulo.id
ORDER BY indice_Modulo;










