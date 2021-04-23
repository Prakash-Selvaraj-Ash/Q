const express = require("express");
const cors = require("cors");
const compression = require('compression');

const tokenRoute = require('./resources/token/token.route');
const doctorRoute = require('./resources/doctor/doctor.route');
const reviewRoute = require('./resources/review/review.route');
const commentRoute = require('./resources/comment/comment.route');
const providerRoute = require('./resources/provider/provider.route');

const app = express();

require('./connection');

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tokens', tokenRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/comments', commentRoute);
app.use('/api/providers', providerRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is listening at port ${PORT}`));
