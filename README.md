# Teste-tecnico-NG-CASH

# Teste técnico desenvolvido em React + Node + PostgreSQL + Typescript

Após o download do projeto executar o comando npm install nos diretórios /backend e / frontend do caminho da aplicação para instalação de todas as dependências

Restaurar o banco de dados NG_Cash_Teste_DB disponível no caminho da aplicação.

Por default o banco esta configurado como postgres://postgres:Postgre.051428@localhost:5432/ng-cash

Cujo formato é postgres://"usuario":"senha"@"servidor":"porta"/"banco"

Caso opte por usar de forma diferente alterar o arquivo src/config/database.js

# End points da api presente em /backend

## Cadastro de novo usuário /signup 

### Parametros 

* username: String
* password: String

## Dados do usuário /users 
Retorna o id da conta do usuário(accountId)

### Parametros 

* username: String

## Login /signin 
Retorna o token JWT da sessão

### Parametros 

* username: String
* password: String

## Saldo atual /balance 
Retorna o saldo atual da conta informada

### Parametros 

* accountId: String


## Cadastrar Transação /transaction 
Retorna o id da transação criada

### Parametros 

* debtAccount(id da conta de origem): String
* targetName(nome informado para conta de destino): String
* valueInCents(valor em centavos): Integer
* date(data da transação): String

## Carregar Transações /transactions 
Retorna as transações existentes para os filtros informados

### Parametros 

* accountId(id da conta): String
* entradas(somente entrada): boolean
* saidas(somente saidas): boolean
* date(data da transação): String

## Estrutura do banco de dados


![image](https://user-images.githubusercontent.com/46696558/202862966-7fc3237e-8bf0-494b-ad4e-a6b0e6907e90.png)



## A Fazer
Items que ficaram de fora por questões de tempo

* Paginação das transações
* Validaçêes de usuario e senha(3 numreos, simbolos, comprimento minimo etc...)
* Conversão do backend para typescript(O desenvolvimento foi iniciado sem o uso do typescript por engano)



