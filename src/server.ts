// This file is separated from app.ts in case app needs to be exported for other reasons (e.g. testing)
import 'dotenv/config'
import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))