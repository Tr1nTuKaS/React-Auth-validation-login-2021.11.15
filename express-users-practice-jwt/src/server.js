const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { showBody } = require('./utils/middleware');
const { port } = require('./config');

const PORT = port || 3000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(showBody);

app.get('/', (req, res) => {
  res.send('Hello express');
});

// Routes import
const userRoutes = require('./API/v1/users');
const postRoutes = require('./API/v1/posts');

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
