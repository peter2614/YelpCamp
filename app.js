const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');

const methodOverride = require('method-override');
const Campground = require('./models/campground');
const { stat } = require('fs');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', {campgrounds})
}))


app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', { campground });
}))

app.post('/campgrounds', catchAsync(async (req, res) => {
  // validate object data before we save to db
  const campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required.min(0)
    }).required()
  })
  const { error } = campgroundSchema.validate(req.body);
  if(result.error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/edit', { campground });
}))

// update db
app.put('/campgrounds/:id', catchAsync(async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
  res.redirect(`/campgrounds/${campground._id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}));

// 404 error
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
})

// error handling
app.use((err, req, res, next) => {
  // default values for statusCode and message
  const {statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})