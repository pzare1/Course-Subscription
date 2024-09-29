import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, subscribedCourses, onSubscribe, onUnsubscribe }) => (
  <div>
    <h2 className="text-2xl text-gray-700 font-medium mb-6">Available Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {courses.map((course) => (
        <CourseCard
          key={course.sys_id}
          course={course}
          isSubscribed={subscribedCourses.includes(course.sys_id)}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        />
      ))}
    </div>
  </div>
);

export default CourseList;