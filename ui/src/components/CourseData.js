import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { SlBasket } from "react-icons/sl";
import SubscriptionArea from "./SubscriptionArea";
import CourseList from "./CourseList";
import MyCourses from "./MyCourses";

const CourseData = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMyCourses, setShowMyCourses] = useState(false);

  const getApiUrl = () => {
    return process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL
      : '';
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, subscriptionsResponse] = await Promise.all([
          axios.get(`${getApiUrl()}/api/now/table/x_quo_coursehub_course`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            auth: {
              username: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            },
          }),
          axios.get(`${getApiUrl()}/api/now/table/x_quo_coursehub_course_subscription?sysparm_query=learner=Pouya Zare`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            auth: {
              username: process.env.REACT_APP_USERNAME,
              password: process.env.REACT_APP_PASSWORD,
            },
          }),
        ]);

        if (coursesResponse.data.result) {
          setCourses(coursesResponse.data.result);
        } else {
          setError(new Error("No course data found"));
        }

        if (subscriptionsResponse.data.result) {
          const subscribedCourseIds = subscriptionsResponse.data.result.map(
            (subscription) => subscription.course.value
          );
          setSubscribedCourses(subscribedCourseIds);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = async (courseId) => {
    try {
      const subscriptionDate = new Date().toISOString();
      await axios.post(
        `${getApiUrl()}/api/now/table/x_quo_coursehub_course_subscription`,
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

      setSubscribedCourses((prevSubscribedCourses) => [...prevSubscribedCourses, courseId]);
    } catch (err) {
      console.error("Error subscribing to course:", err);
    }
  };

  const handleUnsubscribe = async (courseId) => {
    try {
      const subscriptionResponse = await axios.get(
        `${getApiUrl()}/api/now/table/x_quo_coursehub_course_subscription?sysparm_query=course=${courseId}^learner=Pouya Zare`,
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
          `${getApiUrl()}/api/now/table/x_quo_coursehub_course_subscription/${subscriptionId}`,
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

        setSubscribedCourses((prevSubscribedCourses) =>
          prevSubscribedCourses.filter((id) => id !== courseId)
        );
      }
    } catch (err) {
      console.error("Error unsubscribing from course:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-700">
            {showMyCourses ? "My Courses" : "Courses"}
          </h1>
          <button
            onClick={() => setShowMyCourses(!showMyCourses)}
            className="flex items-center font-medium shadow-lg bg-blue-100 text-blue-700 px-4 py-2 rounded"
          >
            <SlBasket className="mr-2" />
            My Courses
          </button>
        </div>
        {!showMyCourses && (
          <div className="relative mb-6 h-52 rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1463096351051-3cf0a64d4079?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Course Banner"
              className="w-full h-full object-cover blur-xl"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="relative text-white text-4xl font-thin z-10">
                Welcome to Course Hub
              </h2>
            </div>
          </div>
        )}
        {showMyCourses ? (
          <>
        <div className="relative mb-6 h-52 rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1463096351051-3cf0a64d4079?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Course Banner"
              className="w-full h-full object-cover blur-xl"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="relative text-white text-4xl font-thin z-10">
                Welcome to Course Hub
              </h2>
            </div>
          </div>
          <MyCourses
            courses={courses.filter((course) =>
              subscribedCourses.includes(course.sys_id)
            )}
            onUnsubscribe={handleUnsubscribe}
          />
          </>
        ) : (
          <>
            <SubscriptionArea
              subscribedCourses={subscribedCourses}
              courses={courses}
              onUnsubscribe={handleUnsubscribe}
            />
            <CourseList
              courses={courses}
              subscribedCourses={subscribedCourses}
              onSubscribe={handleSubscribe}
              onUnsubscribe={handleUnsubscribe}
            />
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default CourseData;