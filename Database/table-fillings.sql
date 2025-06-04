create table fillings (
	id integer,
	id_foods integer,
	name varchar,
	price real,
	primary key(id, id_foods),
	FOREIGN key (id_foods) references foods (id)
)

INSERT INTO fillings VALUES
  (1, 1, 'Granola', 0),   
  (2, 1, 'Banana', 0.50),
  (3, 1, 'Morango', 0.50),
  (4, 1, 'Kiwi', 0.50),
  (5, 1, 'Leite Ninho', 0),
  (6, 1, 'Paçoca', 0),
  (7, 1, 'Ovomaltine', 0),
  (8, 1, 'Nutella', 0.50),
  (9, 1, 'Leite Condensado', 0),
  (10, 1, 'Cereja', 0),
  (11, 1, 'Gotas de chocolate', 0),
  (12, 1, 'Calda de morango', 0),

  (1, 2, 'Granola', 0),   
  (2, 2, 'Banana', 0.50),
  (3, 2, 'Morango', 0.50),
  (4, 2, 'Kiwi', 0.50),
  (5, 2, 'Leite Ninho', 0),
  (6, 2, 'Paçoca', 0),
  (7, 2, 'Ovomaltine', 0),
  (8, 2, 'Nutella', 0.50),
  (9, 2, 'Leite Condensado', 0),
  (10, 2, 'Cereja', 0),
  (11, 2, 'Gotas de chocolate', 0),
  (12, 2, 'Calda de morango', 0)

select name, price from fillings where id_foods = 2