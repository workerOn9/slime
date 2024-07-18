import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!, {
            dbName: "onequery"
        })
    } catch (error: any) {
        throw Error(error.message)
    } finally {
        console.info("Connected to MongoDB by Mongoose")
    }
}

export default connect