import connect from "@/db/mongo/db"
import OneQueryModel from "@/model/UnitQuery"
import { NextRequest, NextResponse } from "next/server"

/**
 * id生成
 * api+unix时间戳
 */
function genId() {
    return `api-${Date.now()}`
}

export async function GET(req: NextRequest) {
    try {
        await connect()
        const id = genId()
        const one = new OneQueryModel({
            _id: id,
            apiId: id,
            source: [
                {
                    src: {
                        type: "table",
                        value: "table2"
                    },
                    alias: "t2",
                    role: "main"
                }
            ],
            orders: [
                {
                    name: "id",
                    type: "asc"
                }
            ],
            page: {
                pageNo: 1,
                pageSize: 10
            }
        })
        await one.save()
        return NextResponse.json({
            message: "save success",
            data: one
        })
    } catch (error: any) {
        return NextResponse.json({
            message: "save error",
            error
        })
    }
}