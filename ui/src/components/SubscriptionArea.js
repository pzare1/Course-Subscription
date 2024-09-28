import React from 'react';
import { useDrop } from 'react-dnd';
import { SlBasket } from "react-icons/sl";
import { ImFileEmpty } from "react-icons/im";
import CourseCard from './CourseCard';

const SubscriptionArea = ({ subscribedCourses, courses, onUnsubscribe }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "course",
    drop: () => ({ name: "SubscriptionArea" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const subscribedCourseDetails = courses.filter((course) =>
    subscribedCourses.includes(course.sys_id)
  );

  return (
    <div
      ref={drop}
      className={`mb-8 p-4 border-2 ${
        isOver ? "border-blue-500" : "border-gray-200"
      } rounded-lg transition-colors duration-300`}
    >
      <h2 className="text-xl font-thin text-gray-600 mb-4 flex items-center">
        <SlBasket className="mr-2" />
        My Subscribed Courses
      </h2>
      {subscribedCourseDetails.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600 font-thin mb-12">
          <ImFileEmpty className="mx-auto text-3xl mb-4 text-gray-400" />
          <p>Drag and drop courses here to subscribe</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscribedCourseDetails.map((course) => (
            <CourseCard
              key={course.sys_id}
              course={course}
              isSubscribed={true}
              onUnsubscribe={onUnsubscribe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionArea;