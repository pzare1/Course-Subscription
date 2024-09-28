import React, { useState, useEffect } from "react";
import axios from "axios";
import { SlBasket } from "react-icons/sl";
import CourseCard from "./CourseCard";
import MyCourses from "./MyCourses";

const CourseData = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMyCourses, setShowMyCourses] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "/api/now/table/x_quo_coursehub_course",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            auth: {
              username: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            },
          }
        );

        if (response.data.result) {
          setCourses(response.data.result);
        } else {
          setError(new Error("No course data found"));
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSubscribe = async (courseId) => {
    try {
        const subscriptionDate = new Date().toISOString();
        console.log("Subscription Date:", subscriptionDate);
        await axios.post(
            "/api/now/table/x_quo_coursehub_course_subscription",
            {
                learner: "Pouya Zare",
                course: courseId,
                subscription_date: subscriptionDate, 
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                auth: {
                    username: process.env.REACT_APP_USERNAME,
                    password: process.env.REACT_APP_PASSWORD,
                },
            }
        );

        setSubscribedCourses([...subscribedCourses, courseId]);
    } catch (err) {
        console.error("Error subscribing to course:", err);
    }
};
  const handleUnsubscribe = async (courseId) => {
    try {
      const subscriptionResponse = await axios.get(
        `/api/now/table/x_quo_coursehub_course_subscription?sysparm_query=course=${courseId}^learner=Pouya Zare`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          auth: {
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD,
          },
        }
      );

      if (
        subscriptionResponse.data.result &&
        subscriptionResponse.data.result.length > 0
      ) {
        const subscriptionId = subscriptionResponse.data.result[0].sys_id;
        await axios.delete(
          `/api/now/table/x_quo_coursehub_course_subscription/${subscriptionId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            auth: {
              username: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            },
          }
        );

        setSubscribedCourses(subscribedCourses.filter((id) => id !== courseId));
      }
    } catch (err) {
      console.error("Error unsubscribing from course:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-500">Courses</h1>
        <button
          onClick={() => setShowMyCourses(!showMyCourses)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
        >
          <SlBasket className="mr-2" />
          My Courses
        </button>
      </div>
      <div className="relative mb-6 h-52 rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Course Banner"
          className="w-full h-full object-cover blur-xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="relative text-white text-4xl font-thin z-10">
            Welcome to Course Hub
          </h2>
        </div>
      </div>

      {showMyCourses ? (
        <MyCourses
          courses={courses.filter((course) =>
            subscribedCourses.includes(course.sys_id)
          )}
          onUnsubscribe={handleUnsubscribe}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.sys_id}
              course={course}
              isSubscribed={subscribedCourses.includes(course.sys_id)}
              onSubscribe={handleSubscribe}
              onUnsubscribe={handleUnsubscribe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseData;
