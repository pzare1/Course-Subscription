import React from 'react';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h2>
      <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Course Number:</span> {course.number}</p>
      <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Duration:</span> {course.duration}</p>
      <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Type:</span> {course.type}</p>
      <p className="text-sm text-gray-600 mb-6"><span className="font-medium">Description:</span> {course.description}</p>
      <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>Created by {course.sys_created_by} on {new Date(course.sys_created_on).toLocaleDateString()}</p>
        <p>Last updated by {course.sys_updated_by} on {new Date(course.sys_updated_on).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

export default CourseCard;