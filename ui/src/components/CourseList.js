import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, subscribedCourses, onSubscribe, onUnsubscribe, title }) => (
  <>
    <div className="banner mb-12">
      <img src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Course Banner" className="w-full h-48 object-cover" />
    </div>
    <h1 className="text-4xl font-extrabold text-gray-900 mb-12">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
  </>
);

export default CourseList;