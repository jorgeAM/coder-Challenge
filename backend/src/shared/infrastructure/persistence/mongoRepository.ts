import { Collection, MongoClient } from 'mongodb'

export abstract class MongoRepository {    
    constructor(private client: MongoClient) { }

    protected abstract getCollectionName(): string

    protected getClient(): MongoClient {
        return this.client
    }

    protected async getCollection(): Promise<Collection> {
        return this.client.db().collection(this.getCollectionName())
    }
}