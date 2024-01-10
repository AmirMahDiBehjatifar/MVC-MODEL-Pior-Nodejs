const notFound = (res) => {
    res.writeHead(404,{"Content-Type":"application/json"})
    res.write(JSON.stringify({message:"not Found"}))
    res.end()
}

const ErrorHandler = {
    notFound
}

module.exports = ErrorHandler
