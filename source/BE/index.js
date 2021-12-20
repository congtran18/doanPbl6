require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser=require("body-parser")
const authRouter = require('./routes/auth.router')
const productRouter = require('./routes/product.router')
const path = require('path');

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb://localhost:27017/test`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)

		console.log('MongoDB connected')	
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
