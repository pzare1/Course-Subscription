import React from 'react';
import CourseCard from './CourseCard';
import { ImFileEmpty } from "react-icons/im";

const MyCourses = ({ courses, onUnsubscribe }) => (
  <div>
    {courses.length === 0 ? (
      <div className="bg-gray-200 p-4 rounded-lg text-center text-gray-600 font-thin mb-12 flex items-center h-60 justify-center flex-col">
        <ImFileEmpty className="mx-auto text-3xl mb-4 text-gray-400" />
        <p>No Courses Available.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard 
            key={course.sys_id} 
            course={course} 
            isSubscribed={true}
            onUnsubscribe={onUnsubscribe}
            onSubscribe={() => {}}
          />
        ))}
      </div>
    )}
  </div>
);

export default MyCourses;