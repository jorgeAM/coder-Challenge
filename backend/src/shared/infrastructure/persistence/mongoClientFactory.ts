import { MongoClient } from 'mongodb'

class MongoClientFactory {
    private static client: MongoClient

    static async createClient(url: string): Promise<MongoClient> {
       let client = await this.getClient()

       if (!client) {
           client = await this.createAndConnectClient(url)
       }

       MongoClientFactory.client = client

       return client
    }

    private static async  getClient(): Promise<null | MongoClient> {
        return MongoClientFactory.client
    }

    private static async createAndConnectClient(url: string): Promise<MongoClient> {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true})

        await client.connect()

        return client
    }
}

export default MongoClientFactory