function notFound(res) {
    res.writeHead(404,{'Content-Type':'application.json'})
    res.write(JSON.stringify("Content NOT FOUND"))
    res.end()
}

function pageNotFound(res) {
    res.writeHead(404,{'Content-Type':'application/json'})
    res.write(JSON.stringify('Page NOT FOUND'))
    res.end()
}

const ErrorHandller = {
    notFound,
    pageNotFound
}
module.exports = ErrorHandller
