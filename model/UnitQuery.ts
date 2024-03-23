import { Schema, model, models } from "mongoose"

export type UnitQuery = {
    _id: string
    source: SourceComp[]
    filter?: FilterComp[]
    fields?: FieldComp[]
    orders?: OrderComp[]
    params?: ParamComp[]
    page?: {
        pageNo: number,
        pageSize: number
    }
}

type SourceComp = {
    src: {
        type: 'table' | 'infer' | 'sub-query'
        value: any
    }
    alias?: string
    role: 'main' | 'join' | 'leftjoin' | 'rightjoin' | 'crossjoin'
    on?: GeneralCondBody[]
}

type FilterComp = {
    op: 'and' | 'or'
    cond: {
        type: 'custom' | 'default'
        formula?: string
        p?: GeneralCondBody
    },
    param?: ParamComp[]
}

type FieldComp = {
    name: string,
    hover?: string,
    complete: {
        type: 'custom' | 'infer'
        declare: any
    },
    opts?: {
        isAggField?: true | false
        isMetric?: true | false
        feOption?: any
        orders?: OrderComp
    }
}

type GeneralCondBody = {
    left: string,
    right: string,
    op: '=' | '>' | '<' | '>=' | '<=' | '!='
}

type ParamComp = {
    name?: string,
    value?: any,
    defaultValue?: any,
    requireType?: 'string' | 'number' | 'string[]' | 'number[]' | 'boolean'
    desc?: string
}

type OrderComp = {
    name: string,
    sort: 'asc' | 'desc'
    opts?: {
        prefix?: string,
        suffix?: string
    },
    desc?: string
}

const UnitQuerySchema = new Schema<UnitQuery>({
    _id: String,
    source: [{
        src: {
            type: { type: String, enum: ['table', 'infer', 'sub-query'] },
            value: Schema.Types.Mixed
        },
        alias: { type: String, required: false },
        role: { type: String, enum: ['main', 'join', 'leftjoin', 'rightjoin', 'crossjoin'] },
        on: [{
            left: String,
            right: String,
            op: { type: String, enum: ['=', '>', '<', '>=', '<=', '!='] }
        }],
    }],
    filter: [{
        op: { type: String, enum: ['and', 'or'] },
        cond: {
            type: { type: String, enum: ['custom', 'default'] },
            formula: { type: String, required: false },
            p: { type: Schema.Types.Mixed, required: false }
        },
        param: [{ type: Schema.Types.Mixed }]
    }],
    fields: [{
        name: String,
        hover: { type: String, required: false },
        complete: {
            type: { type: String, enum: ['custom', 'infer'] },
            declare: Schema.Types.Mixed
        },
        opts: {
            isAggField: { type: Boolean, required: false },
            isMetric: { type: Boolean, required: false },
            feOption: Schema.Types.Mixed,
            orders: {
                name: String,
                sort: { type: String, enum: ['asc', 'desc'] },
                opts: {
                    prefix: { type: String, required: false },
                    suffix: { type: String, required: false }
                },
                desc: { type: String, required: false }
            }
        }
    }],
    params: [{
        name: { type: String, required: false },
        value: Schema.Types.Mixed,
        defaultValue: Schema.Types.Mixed,
        requireType: { type: String, enum: ['string', 'number', 'string[]', 'number[]', 'boolean'] },
        desc: { type: String, required: false }
    }],
    page: {
        pageNo: { type: Number, required: false },
        pageSize: { type: Number, required: false }
    }
})

const OneQueryModel = models.cores || model("cores", UnitQuerySchema)

export default OneQueryModel