import { Schema } from "mongoose"

/**
 * mongoose自动更新时间插件
 * @param schema 
 * @param options 
 */
function updateTimePlugin(schema: Schema, options: any) {
    schema.add({ updateAt: Date })
    schema.pre('save', function (next) {
        this.updateAt = new Date()
        next()
    })
    if (options && options.index) {
        schema.path('updateAt').index(options.index)
    }
}

export default updateTimePlugin