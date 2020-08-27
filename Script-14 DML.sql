SELECT * FROM login
SELECT * FROM system
SELECT * FROM Rules
SELECT * FROM LoginRules

INSERT INTO Login (login, passaword, Nome, Email)
VALUES ('JoãoFulano@ArcH.com.br','pf2543', 'João Fulano' , 'JoãoFulano@ArcH.com.br'),
	   ('leonardo.Fulano@ArcH.com.br',' leo123', 'Leonardo Fulado' , 'leonardo.Fulado@ArcH.com.br'),
	   ('andreia.Fulano@ArcH.com.br',' am1601', 'Andreia Fulano' , 'andreia.Fulado@ArcH.com.br'),
	   ('Leandro.Fulano@ArcH.com.br',' 123leandro', 'Leandro Fulano' , 'Leandro.Fulado@ArcH.com.br'),
	   ('andre.Fulano@ArcH.com.br',' andre12as', 'Andre Fulano' , 'andre.Fulado@ArcH.com.br'),
	   ('fabio.Fulano@ArcH.com.br',' fabio12as', 'fabio Fulano' , 'fabio.Fulado@ArcH.com.br')
	   
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