import Button from '@mui/material/Button';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alert } from '../../Common/alert';
import { studentService } from '../../Services';
import { columns } from './configurations';

const Students = () => {
    let navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = async () => {
        try {
            setLoading(true);
            const response = await studentService.getAll();
            const { data } = response;
            setStudents(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert.unknownError();
        }
    }

    const deleteRecord = async (record) => {
        try {
            setLoading(true);
            await studentService.deleteStudent(record.id);
            getStudents();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert.unknownError();
        }
    }

    const editRecord = (record) => navigate(`/students/${record.id}`);

    return (
        <div className="container">
            <Button variant="contained" onClick={() => navigate(`/students/new`)}>ADD</Button>
            <Table
                rowKey="id"
                dataSource={students}
                columns={columns(editRecord, deleteRecord)}
                loading={loading}
                bordered
                pagination={{
                    defaultPageSize: 10,
                    total: students.length,
                }}
            />
        </div>
    )
}

export default Students
