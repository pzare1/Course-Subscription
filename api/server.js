require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const serviceNowBaseUrl = process.env.SERVICENOW_BASE_URL;
const serviceNowUsername = process.env.SERVICENOW_USERNAME;
const serviceNowPassword = process.env.SERVICENOW_PASSWORD;

const serviceNowAxios = axios.create({
  baseURL: serviceNowBaseUrl,
  auth: {
    username: serviceNowUsername,
    password: serviceNowPassword,
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

app.get('/api/courses', async (req, res) => {
  try {
    const response = await serviceNowAxios.get('/api/now/table/x_quo_coursehub_course');
    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

app.get('/api/subscriptions', async (req, res) => {
  try {
    const response = await serviceNowAxios.get('/api/now/table/x_quo_coursehub_course_subscription', {
      params: {
        sysparm_query: 'learner=Pouya Zare'
      }
    });
    const subscribedCourseIds = response.data.result.map(
      (subscription) => subscription.course.value
    );
    res.json(subscribedCourseIds);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Error fetching subscriptions' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { courseId } = req.body;
  try {
    const subscriptionDate = new Date().toISOString();
    await serviceNowAxios.post('/api/now/table/x_quo_coursehub_course_subscription', {
      learner: "Pouya Zare",
      course: courseId,
      subscription_date: subscriptionDate,
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error subscribing to course:', error);
    res.status(500).json({ error: 'Error subscribing to course' });
  }
});

app.post('/api/unsubscribe', async (req, res) => {
  const { courseId } = req.body;
  try {
    const subscriptionResponse = await serviceNowAxios.get('/api/now/table/x_quo_coursehub_course_subscription', {
      params: {
        sysparm_query: `course=${courseId}^learner=Pouya Zare`
      }
    });
    if (subscriptionResponse.data.result && subscriptionResponse.data.result.length > 0) {
      const subscriptionId = subscriptionResponse.data.result[0].sys_id;
      await serviceNowAxios.delete(`/api/now/table/x_quo_coursehub_course_subscription/${subscriptionId}`);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  } catch (error) {
    console.error('Error unsubscribing from course:', error);
    res.status(500).json({ error: 'Error unsubscribing from course' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));