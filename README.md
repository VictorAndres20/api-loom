<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ npm install
```

## Database configuration
<p>PostgreSQL</p>
- Execute ddl.sql in db folder.
- Execute inserts.sql in db folder.

## Configure .env file
- copy env-example in .env
```
cp env-example .env
``` 

- Configura .env file with your database configuration


## Running the app

```bash
# development
$ npm run start
```

## License

Nest is [MIT licensed](LICENSE).

## Deploy
- [OPTIONAL] May be create tar to upload in host server
````bash
tar -cvf api-demandapp.tar --exclude='api-demandapp/db' --exclude='api-demandapp/node_modules' --exclude='api-demandapp/.git' api-demandapp/
````
  
- [OPTIONAL] Create image specifying version x.x
````bash
docker build api-demandapp/ -t api_demandapp:x.x
````

- Create container
````bash
docker run --restart always --network network-demandapp --ip 172.123.0.5 --name api_demandapp -p 8001:8001 -d api_demandapp:v.v
````

## GraphQL playground Queries and mutations
After stating the application go to 
```
http://localhost:8001/graphql
```

### Here some queries examples

**Find all loom demands errors**
```graphql
{
  demandAll {
    uuid,
    warp,
    weft_quantity,
    date_created,
    errorDetail {
      name,
      errorType {
        name,
        renderType {
          cod,
          name
        }
      }
    }
  }
}
```

**Find users with user type**

```graphql
{
  userAll {
    name,
    userType {
      cod,
      name
    }
  }
}
```

**Find user state by id**

```graphql
{
  userTypeById(id: "ROOT") {
    name
  }
}
```

**Find all user states**

```graphql
{
  userTypeAll {
    name,
    cod,
  }
}
```

### Here some mutation examples

**Create user state**
```graphql
mutation{
  userTypeCreate(createInput: {
    cod: "NTYP",
    name: "New Type"
  }) {
    name,
    cod,
  }
}
```

**Create loom demand error**
```graphql
mutation {
  demandCreateOne(createInput: {
    weft_quantity: 34,
    user_create: "71b96399-8ef0-4474-afde-4c9670bcbe3a",
    user_close: "71b96399-8ef0-4474-afde-4c9670bcbe3a",
    demand_state: "PENDI",
    error_detail: "WE_1.",
    loom: "303"
  }) {
    uuid
  }
}
```

## Code
Using generic Resolver function to implement basic CRUD asbtract resolver

**function for build Abstract CRUD Resolver**

/src/commons/resolvers/

```

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasicCrudService } from '../services/crud.service';

export function createBasicCrudResolver<T, ID, D>(
        entityType: new () => T,
        idType: new () => ID,
        inputType: new () => D,
        prefix: string) {
    @Resolver(of => entityType)
    class BasicCrudResolver{

        constructor(public service: BasicCrudService<T, ID, D>){}

        @Query(returns => [entityType], { name: `${prefix}All` })
        getAll(): Promise<T[]> {
            return this.service.findAll();
        }

        @Query(returns => entityType, { name: `${prefix}ById` })
        findById(@Args("id", { type: () => idType }) id: ID): Promise<T> {
            return this.service.findById(id);
        }

        @Mutation(returns => entityType, { name: `${prefix}CreateOne` })
        createOne(@Args('createInput', { type: () => inputType }) input: D): Promise<T> {
            return this.service.createOne(input);
        }

        @Mutation(returns => entityType, { name: `${prefix}UpdateOne` })
        updateOne(
                @Args("id", { type: () => idType }) id: ID,
                @Args('updateInput', { type: () => inputType }) input: D): Promise<T> {
            return this.service.editOne(input, id);
        }
    }
  
    return BasicCrudResolver;
}
```

**Implementation**

```
// imports...

@Resolver(of => YourEntity)
export class YourEntityResolver extends createBasicCrudResolver(YourEntity, IdType, YourEntityDTO, "yourEntityPrefix"){

    constructor(public service: YourEntityService){
        super(service);
    }

}
```