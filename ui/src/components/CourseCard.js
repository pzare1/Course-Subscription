import React from "react";

const formatDuration = (duration) => {
  const date = new Date(duration);
  const hours = date.getHours();
  return `${hours} hours`;
};

const CourseCard = ({ course, isSubscribed, onSubscribe, onUnsubscribe }) => (
  <div
    className={`${
      isSubscribed
        ? "bg-blue-100 border border-blue-300"
        : "bg-white border border-gray-300"
    } rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl`}
  >
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Course Number:</span> {course.number}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Duration:</span>{" "}
        {formatDuration(course.duration)}
      </p>
      <p className="text-sm text-gray-700 mb-1">
        <span className="font-medium">Type:</span> {course.type}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Description:</span> {course.description}
      </p>
      <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
        <p>
          Created by{" "}
          <span className="font-semibold">{course.sys_created_by}</span> on{" "}
          <span className="font-semibold">
            {new Date(course.sys_created_on).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
    <div className="px-6 pb-4">
      {isSubscribed ? (
        <button
          onClick={() => onUnsubscribe(course.sys_id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={() => onSubscribe(course.sys_id)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Subscribe
        </button>
      )}
    </div>
  </div>
);

export default CourseCard;