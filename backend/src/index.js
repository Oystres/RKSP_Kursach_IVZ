require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Admins = require('./models/admins');
const Asessments = require('./models/asessments');
const Debts = require('./models/debts');
const Disciplines = require('./models/disciplines');
const Streams = require('./models/streams');
const Students = require('./models/students');
const Teachers = require('./models/teachers');

const adminRouter = require('./routes/adminRouter');
const asessmentRouter = require('./routes/asessmentRouter');
const debtRouter = require('./routes/debtRouter');
const disciplineRouter = require('./routes/disciplineRouter');
const streamRouter = require('./routes/streamRouter');
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

Admins.sync()
  .then(() => {
    console.log('Admins table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Asessments.sync()
  .then(() => {
    console.log('Asessments table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Debts.sync()
  .then(() => {
    console.log('Debts table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Disciplines.sync()
  .then(() => {
    console.log('Disciplines table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });
  
Streams.sync()
  .then(() => {
    console.log('Streams table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Students.sync()
  .then(() => {
    console.log('Students table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });

Teachers.sync()
  .then(() => {
    console.log('Teachers table created successfully');
  })
  .catch((error) => {
    console.error(error);
  });
// Подключение роутеров
app.use('/admins', adminRouter);
app.use('/asessments', asessmentRouter);
app.use('/debts', debtRouter);
app.use('/disciplines', disciplineRouter);
app.use('/streams', streamRouter);
app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);

app.get('/', function (request, response) {
  response.send('Главная страница');
});

app.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
