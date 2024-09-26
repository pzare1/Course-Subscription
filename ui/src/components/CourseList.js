import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, title }) => (
  <>
    <h1 className="text-4xl font-extrabold text-gray-900 mb-12">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard
          key={course.sys_id}
          course={course}
        />
      ))}
    </div>
  </>
);

export default CourseList;