const parseQueryParamsAPI = function () {

    const parseGetToDos = function (req, res, next) {
        const query = req.query

        const notNegative = ["skip", "limit"]

        for (var k in query) {
            const temp = query[k]
            delete query[k]
            query[k.toLowerCase()] = temp
        }

        if (query.at) {
            if (query.at !== "last") {
                if (isNaN(parseInt(query.at))) {
                    return res.status(400).json({
                        message: `${k} must be an integer or 'last'`
                    })
                   
                } else {
                    query.at = parseInt(query.at)
                }
            }
           
        }

        for (let i = 0; i < notNegative.length; i++) {
            const k = notNegative[i]
            if (k in query) {
                query[k] = parseInt(query[k])
                if (isNaN(query[k]) || query[k] < 0) {
                    return res.status(400).json({
                        message: `${k} must be a positive integer`
                    })
                }
            }
        }

        next()
    }

    return {
        parseGetToDos
    }

}


const parseQueryParams = parseQueryParamsAPI()


export default parseQueryParams