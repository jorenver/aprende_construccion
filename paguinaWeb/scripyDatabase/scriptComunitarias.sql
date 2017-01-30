create database Sistema_Aprendizaje_Construccion;
USE Sistema_Aprendizaje_Construccion;
create table Modulo(
	id integer auto_increment,
    titulo varchar(30) NOT NULL,
    indice integer,
    primary key(id)
);

create table Contenido_Multimedia(
	id integer auto_increment,
    ruta varchar(30),
    tipo varchar(50),
    PRIMARY KEY(id)

);

create table Administrador(
	id integer auto_increment,
    cedula  varchar(10),
    nombre varchar(35),
    apellido varchar(35),
    telefono varchar(10),
    correo varchar(60),
    tipo varchar(45),
    password varchar(10),
    primary key(id)
    

);

create table Estudiante(
	id integer auto_increment,
    cedula varchar(10),
    nombre varchar(40),
    apellido varchar(40),
    telefono varchar(10),
    direccion varchar(35),
    ciudad varchar(20),
    provincia varchar(40),
    distrito varchar(50),
    primary key (id)
);

create table Permiso(
	id integer auto_increment,
    administrador integer,
    modulo integer,
    foreign key (administrador)
    references Administrador(id)
    ON DELETE CASCADE,
    foreign key(modulo)
    references Modulo(id)
    ON DELETE CASCADE,
    PRIMARY KEY(id)
);

create table Capitulo(
	id integer auto_increment,
    titulo varchar(50),
    indice integer,
    modulo integer, 
    foreign key (modulo) 
    references Modulo(id) 
    ON DELETE CASCADE,
    primary key(id)
    
);

create table Seccion(
	id integer auto_increment,
    titulo varchar(50),
    indice integer,
    capitulo integer,
    foreign key (capitulo) references Capitulo(id) ON DELETE CASCADE,
    primary key(id)
);

create table Examen(
	id integer auto_increment,
    titulo varchar(50),
    modulo integer,
    capitulo integer,
    foreign key(modulo) references Modulo(id) ON DELETE CASCADE,
    foreign key(capitulo) references Capitulo(id) ON DELETE CASCADE,
    primary key(id)

);

create table Preguntas(
	id integer auto_increment,
    titulo varchar(120),
    examen integer,
    multimedia integer,
    foreign key(examen) references Examen(id) ON delete CASCADE,
    foreign key(multimedia) references Contenido_Multimedia(id) on delete cascade,
    primary key(id)
);

create table Respuesta(
	id integer auto_increment,
    titulo varchar(120),
    EsCorrecto boolean,
    pregunta integer,
    foreign key(pregunta) references Preguntas(id) ON delete CASCADE,
    primary key(id)
);

create table Contenido(
	id integer auto_increment,
    texto varchar(250),
    indice integer,
    multimedia integer,
    seccion integer,
    foreign key (multimedia) references Contenido_Multimedia(id) ON DELETE CASCADE,
    foreign key (seccion) references Seccion(id) ON DELETE CASCADE,
    primary key(id)

);

create table Lista_Estudiante(
	id integer auto_increment,
    descripcion varchar(100),
    administrador integer,
    estudiante integer,
    foreign key(administrador) references Administrador(id) ON DELETE CASCADE,
    foreign key(estudiante) references Estudiante(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
    

);

create table Calificacion_Capitulo(
	id integer auto_increment,
    nota integer,
    capitulo integer,
    estudiante integer,
    foreign key(capitulo) references Capitulo(id) ON DELETE CASCADE,
    foreign key(estudiante) references Estudiante(id) ON DELETE CASCADE,
    PRIMARY KEY(id)

);

create table Calificacion_Modulo(
	id integer AUTO_INCREMENT,
    nota integer,
    modulo integer,
    estudiante integer,
    foreign key(modulo) references Modulo(id) ON DELETE CASCADE,
    foreign key(estudiante) references Estudiante(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
    
);



