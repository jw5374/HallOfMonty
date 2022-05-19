import { app } from './index'

const port = 8000

app.listen(port, () => {
    console.log("Listening on " + port)
})