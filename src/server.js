const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const personApiRoutes = require('./routes/api/personApiRoutes');
const personUiRoutes = require('./routes/ui/personUiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.use('/api', personApiRoutes);
app.use('/ui', personUiRoutes);
app.get('/', (req, res) => res.redirect('/ui/person'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});