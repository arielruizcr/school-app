import Button from '@mui/material/Button';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { alert } from '../../Common/alert';
import { courseService } from '../../Services';
import { columns } from './configuration';

const Courses = () => {
    let navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = async () => {
        try {
            setLoading(true);
            const response = await courseService.getAll();
            const { data } = response;
            setCourses(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert.unknownError();
        }
    }

    const deleteRecord = async (record) => {
        try {
            setLoading(true);
            await courseService.deleteCourse(record.id);
            getCourses();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert.unknownError();
        }
    }

    const editRecord = (record) => navigate(`/courses/${record.id}`);

    return (
        <div className="container">
            <Button variant="contained" onClick={() => navigate(`/courses/new`)}>ADD</Button>
            <Table
                rowKey="id"
                dataSource={courses}
                columns={columns(editRecord, deleteRecord)}
                loading={loading}
                bordered
                pagination={{
                    defaultPageSize: 10,
                    total: courses.length,
                }}
            />
        </div>
    )
}


export default Courses