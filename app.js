const port = 4040
const http = require('http')
const router = require('./serverRoute')

const server = http.createServer((async (req, res) => {
    let data = '';
    console.log(req.method)
    console.log(req.url)

    // Buffer incoming data
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', async () => {
        try {
            console.log(data.length > 0 ? JSON.parse(data): data)
            // Invoke API implementation for url
            const serverResponse = await router.Route(req.url, data.length > 0 ? JSON.parse(data): {})
            // Set server response
            res.statusCode = serverResponse.statusCode
            res.setHeader('Content-type', 'application/json')
            res.end(JSON.stringify({ response: serverResponse.message }))
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.setHeader('Content-type', 'application/json')
            res.end(JSON.stringify({ response: `Internal Server Error: ${err}` }))
        }
    })
}))

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
