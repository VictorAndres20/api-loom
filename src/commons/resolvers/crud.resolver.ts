
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