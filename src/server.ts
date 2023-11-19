import { app } from './app'

const port: number = Number(process.env.PORT) || 5001;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});