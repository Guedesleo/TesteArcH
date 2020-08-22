SELECT * FROM login
SELECT * FROM system
SELECT * FROM Rules
SELECT * FROM LoginRules

INSERT INTO Login (login, passaword, Nome, Email)
VALUES ('ferando@ArcH.com.br',' pf2543', 'Fernando' , 'ferando@ArcH.com.br'),
	   ('leonardo.gudes@ArcH.com.br',' leo123', 'Leonardo Guedes da Rocha' , 'leonardo.guedes@ArcH.com.br'),
	   ('andreia@ArcH.com.br',' am1601', 'Andreia' , 'andreia@ArcH.com.br'),
	   ('Leandro@ArcH.com.br',' 123leandro', 'Leandro' , 'Leandro@ArcH.com.br'),
	   ('andre@ArcH.com.br',' andre12as', 'Andre' , 'andre@ArcH.com.br'),
	   ('fabio@ArcH.com.br',' fabio12as', 'fabio' , 'fabio@ArcH.com.br')
	   
INSERT INTO Rules (RuleName, IdSystem)
	VALUES('Cadastrar Carros',2),
		  ('Listar carros',2),
		  ('Deletar carro',2),
		  ('Cadastrar Cliente',2),
		  ('Cadastrar Modelo',1),
		  ('Listagem Dos Modelos',1),
		  ('Cadastro Cliente',1),
		  ('Listagem de Cliente',1)

INSERT INTO System(SystemName , Minemonic)
  VALUES('Aluguel de Carro','ADC'),('Car Center Services','CCS')