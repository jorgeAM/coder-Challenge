import { Collection, MongoClient } from 'mongodb'
import { Service, Inject } from 'typedi'

@Service()
export abstract class MongoRepository {    
    constructor(@Inject("client.db") private client: MongoClient) { }

    protected abstract getCollectionName(): string

    protected getClient(): MongoClient {
        return this.client
    }

    protected async getCollection(): Promise<Collection> {
        return this.client.db().collection(this.getCollectionName())
    }
}