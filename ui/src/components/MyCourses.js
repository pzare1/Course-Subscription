import React from 'react';
import CourseCard from './CourseCard';
import { ImFileEmpty } from "react-icons/im";


const MyCourses = ({ courses, onUnsubscribe }) => (
<div>
  {courses.length === 0 ? (
    <div className="bg-gray-200 w-full h-56 text-center items-center flex justify-center flex-col text-gray-500 font-medium text-4xl rounded-lg"> 
    <ImFileEmpty />
    <p className="my-5 font-thin text-3xl">
      No Courses Available.
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(course => (
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

export default MyCourses;
