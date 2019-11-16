const mongoose = require('mongoose')
const Schema = mongoose.Schema

const searchSchema = new Schema(
    {
        search_query: { type: String, index: true },
        count: { type: Number, index: true, default: 1 },
        users: [
            {
                user_id: String,
                user_name: String,
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Search', searchSchema)