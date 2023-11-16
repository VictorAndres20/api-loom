# Implementation of this function to build Absract CRUD Resolver (GraphQL)
```typescript
// imports...

@Resolver(of => YourEntity)
export class YourEntityResolver extends createBasicCrudResolver(YourEntity, IdType, YourEntityDTO, "yourEntityPrefix"){

    constructor(public service: YourEntityService){
        super(service);
    }

}
```

## Description

- This implementation if perfect to connect your app service (Where you store your logic and data manipuation) with GraphQL Resolver.

- YourEntity: Entity and ObjectType Schema.
- IdType: Id or Primary Key type. For example String, number
- YourEntityDTO: Entity DTO and InputType specified.
- "yourEntityPrefix": This is important because all GraphQL queries and mutations names start, for example, passing "yourEntityPrefix", YourEntityResolver will create:
```
yourEntityPrefixAll -> Query to find all
yourEntityPrefixById -> Query to find By Id
yourEntityPrefixCreateOne -> Mutation to create one
yourEntityPrefixUpdateOne -> Mutation to edit one
```
