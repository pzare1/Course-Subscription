import React from 'react';
import { useDrop } from 'react-dnd';
import { SlBasket } from "react-icons/sl";
import { ImFileEmpty } from "react-icons/im";
import CourseCard from './CourseCard';

const SubscriptionArea = ({ subscribedCourses, courses, onUnsubscribe }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "course",
    drop: () => ({ name: "SubscriptionArea" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const subscribedCourseDetails = courses.filter((course) =>
    subscribedCourses.includes(course.sys_id)
  );

  const dropAreaClasses = isOver
    ? "border-blue-500 bg-blue-100"
    : canDrop
    ? "border-gray-400 bg-gray-50"
    : "border-gray-200 bg-white";   

  return (
    <div
      ref={drop} 
      className={`px-4 pb-16 pt-6 mb-8 rounded-lg text-center font-thin transition-transform duration-300 transform border-2 ${dropAreaClasses}`}
    >
      <h2 className="text-xl font-thin text-gray-600 mb-4 flex items-center">
        <SlBasket className="mr-2" />
        My Subscribed Courses
      </h2>
      {subscribedCourseDetails.length === 0 ? (
        <>
          <ImFileEmpty className={`mx-auto text-4xl mb-6 ${isOver ? "text-blue-400" : "text-gray-400"}`} />
          <p className="text-lg">
            {isOver ? "Release to subscribe" : "No subscriptions yet."}
          </p>
          <p className="text-sm">
            {isOver ? "Drop the course here to subscribe" : "Drag and drop courses here to subscribe"}
          </p>
        </>
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
