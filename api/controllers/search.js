const Search = require('../models/search')

exports.addSearch = async (req, res, next) => {
    const search_query = req.body.searchQuery
    const user_name = req.body.username ? req.body.username : 'Anonymous'

    let search = await Search.findOne({ search_query })
    if (search) {
        search.count = search.count + 1
        const user_name_in_array = search.users.find(user => user.user_name === user_name)
        if (!user_name_in_array) {
            search.users.push({ user_name })
        }
    }
    else {
        search = new Search({
            search_query: search_query,
            users: [{ user_name }],
        })
    }

    try {
        await search.save()
        res.status(201).json({})
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.getTop10Searching = async (req, res, next) => {
    try {
        const top10 = await Search.find().sort({ count: -1 }).limit(10)
        //const top10 = await Search.find({ 'users': { "$elemMatch": { 'user_name': 'Anonymous' } } }).sort({ count: -1 }).limit(10)
        res.status(200).json(top10)
    } catch (error) {
        res.status(500).json(error)
    }
}
