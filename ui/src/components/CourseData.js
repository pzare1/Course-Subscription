import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './CourseList';

const CourseData = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(process.env.REACT_APP_API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      });

      if (response.data.result && response.data.result.length > 0) {
        setCourseData(response.data.result);
      } else {
        setError(new Error('No course data found'));
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-2xl font-semibold text-red-600">Error loading data: {error.message}</p></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CourseList
          courses={courseData}
          title="All Courses"
        />
      </div>
    </div>
  );
};

export default CourseData;
