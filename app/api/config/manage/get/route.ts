import connect from "@/db/mongo/db"
import OneQueryModel from "@/model/UnitQuery"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await connect()
        const query = await OneQueryModel.find({})
        return NextResponse.json({ message: 'success connected!', data: query }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}