import Button from '@mui/material/Button';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { alert } from '../../Common/alert';
import { messages } from '../../Constants/constant';
import { courseService, studentCourseService, studentService } from '../../Services';
import { columns } from './configuration';
import ModalStudentCourse from './ModalStudentCourse';

const StudentCourse = () => {
    const [studentCourses, setStudentCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [dropDownData, setDropDownData] = useState({});

    useEffect(() => {
        getStudentCourses();
    }, [])


    const getStudentCourses = () => {
        setLoading(true);
        const studentCoursesPromise = studentCourseService.getAll();
        const coursesPromise = courseService.getAll();
        const studentsPromise = studentService.getAll();
        Promise.all([studentCoursesPromise, coursesPromise, studentsPromise]).then(values => {
            const [studentCourses, courses, students] = values;
            setDropDownData({ courses: courses.data, students: students.data });
            const { data } = studentCourses;
            setStudentCourses(data);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            alert.unknownError();
        });
    }

    const deleteRecord = async (record) => {
        try {
            await studentCourseService.deleteStudentCourse(record.id);
            getStudentCourses();
        } catch (error) {
            alert.unknownError();
        }
    }

    const showEditModal = (record) => {
        setSelectedItem(record);
        setVisible(true);
    }

    const handleCancel = () => {
        setSelectedItem(null);
        setVisible(false);
    };

    const handleOk = async (values) => {
        if (await isInvalid(values)) {
            alert.unknownError(messages.registrationError);
            return;
        }
        const { courses, students } = dropDownData;
        const studentName = students.find(x => x.id === values.studentId).name;
        const courseName = courses.find(x => x.id === values.courseId).name;

        const defaultParam = {
            ...values,
            studentName,
            courseName
        }

        try {
            setLoading(true);
            if (selectedItem) {
                const param = { id: selectedItem.id, ...defaultParam }
                await studentCourseService.update(param);
            } else {
                await studentCourseService.save(defaultParam);
            }

        } catch (error) {
            setLoading(false);
            alert.unknownError();
        }

        setLoading(false);
        setSelectedItem(null);
        setVisible(false);
        getStudentCourses();
    };

    const isInvalid = async (values) => {
        const param = {
            studentId: values.studentId,
            courseId: values.courseId
        }
        try {
            const result = await studentCourseService.searchStudentCourse(param);
            const { data } = result;

            return data.length !== 0;
        } catch (error) {
            alert.unknownError();
        }
        return true;
    }

    const showAddModal = () => {
        setSelectedItem(null);
        setVisible(true);
    }

    return (
        <div className="container">
            <Button variant="contained" onClick={() => showAddModal()}>ADD</Button>
            <Table
                rowKey="id"
                dataSource={studentCourses}
                columns={columns(showEditModal, deleteRecord)}
                loading={loading}
                bordered
                pagination={{
                    defaultPageSize: 10,
                    total: studentCourses.length,
                }}
            />
            {visible &&
                <ModalStudentCourse
                    title="Modal"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    data={{ dropDownData }}
                    selectedItem={selectedItem}
                />}
        </div>
    )
}

export default StudentCourse;