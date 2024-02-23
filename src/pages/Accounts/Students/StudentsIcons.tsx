import React from 'react';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  user_img: string;
  // Add other properties as needed
}

interface StudentIconsProps {
  students: Student[];
}

const StudentIcons: React.FC<StudentIconsProps> = ({ students }) => {
  const maxIcons = 3; // Maximum number of icons to display

  const handleIconClick = (student: Student) => {
    // Add your logic for handling icon click here
    console.log(`Clicked on ${student.first_name} ${student.last_name}`);
  };

  const handleMoreClick = () => {
    // Add your logic for handling "more" button click here
    console.log('Clicked on "more" button');
  };

  const renderStudentIcons = () => {
    const displayedStudents = Math.min(students.length, maxIcons);
    const icons = [];

    for (let i = 0; i < displayedStudents; i++) {
      const student = students[i];
      icons.push(
        <button
          key={i}
          className="avatar-group-item"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`${student.first_name} ${student.last_name}`}
          onClick={() => handleIconClick(student)}
        >
          <img src={student.user_img} alt="" className="rounded-circle avatar-sm" />
        </button>
      );
    }

    if (students.length > maxIcons) {
      // Display a "more" button with the count if there are more students than maxIcons
      icons.push(
        <button
          key="more"
          className="avatar-group-item"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`More (${students.length - maxIcons})`}
          onClick={() => handleMoreClick()}
        >
          <div className="avatar-sm">
            <div className="avatar-title rounded-circle">{students.length - maxIcons}+</div>
          </div>
        </button>
      );
    }

    return icons;
  };

  return <div className="avatar-group">{renderStudentIcons()}</div>;
};

export default StudentIcons;
