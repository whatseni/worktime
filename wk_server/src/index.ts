import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;



app.get('/', (req: Request, res: Response) => {
  res.send('server health okay')
})

app.listen(port, () => {
  console.log('open wk server')
})