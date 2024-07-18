import updateTimePlugin from "@/utils/mongoosePlugin/UpdateTimePlug"
import { Schema, model, models } from "mongoose"

// UnitQuery-查询单元
export type UnitQuery = {
    // 主键
    // _id: string
    apiId: string
    // 数据源
    source: SourceComp[]
    // 过滤
    filter?: FilterComp[]
    // 字段
    fields?: FieldComp[]
    // 排序
    orders?: OrderComp[]
    // 参数
    params?: ParamComp[]
    // 分页
    page?: {
        pageNo: number,
        pageSize: number
    }
    // 更新时间
    updateAt: Date
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

const UnitSourceSchema = new Schema({
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
})

const UnitFilterSchema = new Schema({
    op: { type: String, enum: ['and', 'or'] },
    cond: {
        type: { type: String, enum: ['custom', 'default'] },
        formula: { type: String, required: false },
        p: { type: Schema.Types.Mixed, required: false }
    },
    param: [{ type: Schema.Types.Mixed }]
})

const UnitFieldSchema = new Schema({
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
})

const UnitParamSchema = new Schema({
    name: { type: String, required: false },
    value: Schema.Types.Mixed,
    defaultValue: Schema.Types.Mixed,
    requireType: { type: String, enum: ['string', 'number', 'string[]', 'number[]', 'boolean'] },
    desc: { type: String, required: false }
})

const UnitOrderSchema = new Schema({
    name: String,
    sort: { type: String, enum: ['asc', 'desc'] },
    opts: {
        prefix: { type: String, required: false },
        suffix: { type: String, required: false }
    },
    desc: { type: String, required: false }
})

const UnitPageSchema = new Schema({
    pageNo: { type: Number, required: false },
    pageSize: { type: Number, required: false }
})

/**
 * 主体Schema
 */
const UnitQuerySchema = new Schema({
    _id: String,
    apiId: { type: String, required: true },
    source: {
        type: [UnitSourceSchema],
        required: true,
        validate: {
            validator: function (v: any) {
                return v && v instanceof Array && v.length > 0
            },
            message: 'source must have at least one element'
        }
    },
    filter: {
        type: [UnitFilterSchema],
        default: undefined,
        required: false
    },
    fields: {
        type: [UnitFieldSchema],
        default: undefined,
        required: false
    },
    orders: {
        type: [UnitOrderSchema],
        default: undefined,
        required: false
    },
    params: {
        type: [UnitParamSchema],
        default: undefined,
        required: false
    },
    page: {
        type: UnitPageSchema,
        default: undefined,
        required: false
    },
    updateAt: { type: Date, default: Date.now }
})
UnitQuerySchema.plugin(updateTimePlugin)

/**
 * 主体模型
 */
const OneQueryModel = models.cores || model("cores", UnitQuerySchema)

export default OneQueryModel