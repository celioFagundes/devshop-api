# DevShop API
- Acesse o repositório do site do DevShop [Site](https://github.com/celioFagundes/devshop-frontend/tree/master/site)
- Acesse o repositório do painel administrativo DevShop [Painel administrativo](https://github.com/celioFagundes/devshop-frontend/tree/master/panel)

### Sobre o projeto
  Projeto DevShop , criação e gerenciamento de produtos utilizando NextJs, NestJs, Typescript, Javascript, TypeORM ,Postgres e AWS S3. Este é um projeto FullStack que conta com  3 repositórios :
  - Uma API Backend desenvolvida com NestJs, Typescript , GraphQL, TypeORM , Postgres e AWS S3.
  - Painel administrativo desenvolvido com NextJs para criação e gerenciamento dos produtos, incluindo cadastro e validação dos usuários que possuem permissão para usar o painel utilizando JWT Tokens e inserção de imagens dos produtos e marcas utilizando AWS S3. 
     - Acesse o painel administrativo do DevShop [Painel Adminstrativo](https://github.com/celioFagundes/devshop-frontend/tree/master/panel). 
  - Site DevShop, com exibição dos produtos, marcas e categorias cadastrados, com opções de escolha dos produtos de acordo com o tamanho ou tensão elétrica  
    - Acesse o repositório do site do DevShop [Site](https://github.com/celioFagundes/devshop-frontend/tree/master/site).

### Sobre a API Backend do DevShop

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
Desenvolvido com NestJs, Typescript, TypeORM, Postgres, GraphQl e AWS S3, consiste na API Backend do DevShop

### Funcionalidades
- Configuração do servidor em NestJs
- Configuração do banco de dados Postgres utilizando TypeORM
- Configuração da API GraphQL
- Configuração de autorização e autenticação  utilizando JWS
- Comunicação com AWS S3 para upload de imagens

### Tecnologias utilizadas
- [NestJs](https://nestjs.com/) 
- [GraphQl](https://graphql.org/) 
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [AWS](https://aws.amazon.com/pt/?nc2=h_lg)
- [JWT Tokens](https://jwt.io/introduction)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Class Validator](https://github.com/typestack/class-validator)
- [Sharp](https://github.com/lovell/sharp)

## Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testar

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Database Migrations

```bash
# generate a new migration synchronizing
$ npm run typeorm migration:generate -- -n <migration description>

# sync database running migrations
$ >npm run typeorm migration:run


## License

Nest is [MIT licensed](LICENSE).
