import React from "react";
import { useDrag } from 'react-dnd';
import { GrInfo } from "react-icons/gr";
import { PiSubtitlesLight } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const CourseCard = ({ course, isSubscribed, onSubscribe, onUnsubscribe }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "course",
    item: { id: course.sys_id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && !isSubscribed) {
        onSubscribe(course.sys_id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

const formatDuration = (duration) => {
  const date = new Date(duration);
  const hours = date.getHours();
  return `${hours} hours`;
};

  return (
    <div
      ref={drag}
      className={`relative w-full max-w-sm rounded-lg border transition-transform transform ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      } ${isSubscribed ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200 hover:shadow-lg hover:scale-[1.05]'}`}
    >
      <div className="absolute top-6 right-4 bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
        {course.type}
      </div>
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-700">{course.title}</h2>
      </div>
      <div className="px-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <PiSubtitlesLight className="mr-2 text-blue-300" />
          <span className="font-medium">Course Number:</span>
          <span className="ml-1">{course.number}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <IoTimeOutline className="mr-2 text-blue-300" />
          <span className="font-medium">Duration:</span>
          <span className="ml-1">{formatDuration(course.duration)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <GrInfo className="mr-2 text-blue-300" />
          <span className="font-medium">Description:</span>
          <span className="ml-1">{course.description}</span>
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="flex items-center text-sm text-gray-500 mt-4">
          <CiCalendarDate className="mr-2 text-blue-300" />
          <p>
            Created by <span className="font-semibold">{course.sys_created_by}</span> on{' '}
            <span className="font-semibold">{new Date(course.sys_created_on).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => isSubscribed ? onUnsubscribe(course.sys_id) : onSubscribe(course.sys_id)}
          className={`w-full py-2 font-semibold rounded-lg transition-colors ${
            isSubscribed ? 'bg-red-100 text-red-500 hover:bg-red-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;