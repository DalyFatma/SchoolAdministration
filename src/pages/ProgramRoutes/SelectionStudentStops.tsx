import React, { useEffect, useState } from "react";
import DualListBox from "react-dual-listbox";

import { Row, Col } from "react-bootstrap";

import "react-dual-listbox/lib/react-dual-listbox.css";
import { useFetchStudentsQuery } from "../../features/student/studentSlice";
import { isNullishCoalesce } from "typescript";

interface SelectionProps {
  onSelectionChange: (selected: string[]) => void;
  studentsData: any;
  stop: any;
}

const SelectionStudentStops: React.FC<SelectionProps> = ({
  onSelectionChange,
  studentsData,
  stop,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [stopPlace, setStopPlace] = useState<any>(null);

  //const { data = [] } = useFetchStudentsQuery();
  const students = studentsData;
  //   console.log("filteredStudents",filteredStudents)

  const [options, setOptions] = useState<
    { value: string; label: string; avatar: string }[]
  >([]);

  useEffect(() => {
    console.log("Students data",studentsData);
    console.log("New stop",stop);
    if(stop !== stopPlace){
      setStopPlace(stop);
     // setSelectedItems([]);
    }
    if (students) {
      const names: any = students.map((student: any) => ({
        value: student._id,
        label: student.firstName + student.lastName,
        avatar: `http://localhost:3000/studentFiles/img/${student.id_file}`, // src={`http://localhost:3000/studentFiles/img/${studentDetails.state.id_file}`}
      }));
      setOptions(names);
    }
  }, [students, stop]);

  const handleSelectionChange = (selected: any) => {
    setSelectedItems(selected);
   // onSelectionChange(selected); 
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <div>
          <Row>
            <Col lg={5} className="d-flex justify-content-center">
             <strong>Students</strong> 
            </Col>
            <Col lg={2}></Col>
            <Col lg={5} className="d-flex justify-content-center">
             <strong> {stopPlace?.type!} </strong>:{" "}  
             {console.log("options",options)}
             {console.log("selectedItems",selectedItems)}
              {stopPlace?.type! === "Stop"
                ? stopPlace?.details?.address?.placeName!
                : stopPlace?.details?.placeName!}

            </Col>
          </Row>
    
          <DualListBox
            options={options}
            selected={selectedItems}
            onChange={handleSelectionChange}
            icons={{
              moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
              moveAllLeft: [
                <span className="mdi mdi-chevron-double-left" key="key" />,
              ],
              moveRight: <span className="mdi mdi-chevron-right" key="key" />,
              moveAllRight: [
                <span className="mdi mdi-chevron-double-right" key="key" />,
              ],
              moveDown: <span className="mdi mdi-chevron-down" key="key" />,
              moveUp: <span className="mdi mdi-chevron-up" key="key" />,
              moveTop: <span className="mdi mdi-chevron-double-up" key="key" />,
              moveBottom: (
                <span className="mdi mdi-chevron-double-down" key="key" />
              ),
            }}
          />
        </div>
      </Col>
    </React.Fragment>
  );
};

export default SelectionStudentStops;
