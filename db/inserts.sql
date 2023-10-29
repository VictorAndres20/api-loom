insert into ks.user_type(cod, name)
values('ROOT', 'root');
insert into ks.user_type(cod, name)
values('REQUE', 'Solicitador');
insert into ks.user_type(cod, name)
values('SOLUC', 'Solucionador');

insert into ks.users(name, login, "password", type)
values('Super Administrador', 'root', '$2a$10$mbvYQ/vQPhU31y0Uy/POju44lRm/YTf2wK6HPxsBMLc7JM10aACim', 'ROOT');

insert into ks.demand_state(cod, name)
values ('PENDI', 'Pendiente');
insert into ks.demand_state(cod, name)
values ('SOLVE', 'Solucionado');

insert into ks.render_type(cod, name)
values('DETAI', 'Use details');
insert into ks.render_type(cod, name)
values('WARPI', 'Open input');
insert into ks.render_type(cod, name)
values('WEFTS', 'Select 1-12');


insert into ks.error_type(cod, name, render_type)
values('MECHA', 'Mecánico', 'DETAI');
insert into ks.error_type(cod, name, render_type)
values('WARP', 'Urdidos', 'WARPI');
insert into ks.error_type(cod, name, render_type)
values('WEFT', 'Trama', 'WEFTS');
insert into ks.error_type(cod, name, render_type)
values('BOXES', 'Cajas', 'DETAI');

insert into ks.error_detail(cod, name, type)
values('1.', 'Curva', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('2.', 'Orillo imperfecto', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('3.', 'Hilo suelto', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('4.', 'Cambio pieza', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('5.', 'Enrollamiento', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('6.', 'Tejido imperfecto', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('7.', 'Paros continuos', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('8.', 'Otro', 'MECHA');
insert into ks.error_detail(cod, name, type)
values('B_1.', 'Cambio', 'BOXES');