import { MongoClient, ServerApiVersion } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

const client = new MongoClient(process.env.MONGO_URL!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export async function GET(req: NextRequest) {
    try {
        await client.connect()
        // await client.db("test").command({ ping: 1 })
        let res: any[] | any | undefined = [];
        const mongoRes = await client.db("onequery")
            .collection("cores")
            .find().sort({ _id: -1 })
            .limit(1).toArray()
        if (mongoRes && mongoRes.length > 0) {
            res = mongoRes.map(item => {
                const {_id, ...restOfItem} = item
                return restOfItem
            })
        }
        return NextResponse.json({ msg: "Native MongoDB connected!", data: res }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    } finally {
        await client.close()
    }
}
