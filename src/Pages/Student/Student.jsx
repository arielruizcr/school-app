import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { alert } from '../../Common/alert';
import { ui } from '../../Constants/constant';
import { studentService } from '../../Services';

const Student = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { studentId } = useParams();

  useEffect(() => {
    if (studentId) {
      getStudent();
    }
  })

  const getStudent = async () => {
    try {
      const response = await studentService.getStudent(studentId);

      const { data } = response;
      fillFields(data[0]);
    } catch (error) {
      alert.unknownError();
    }
  }

  const fillFields = (data) => {
    form.setFieldsValue({
      ...data
    });
  }

  const onFinish = (values) => {
    const student = {
      ...values,
      id: studentId
    }
    if (student.id) {
      editStudent(student);
    } else {
      saveStudent(student);
    }
  }

  const editStudent = async (student) => {
    try {
      await studentService.update(student);
      navigate('/students');
    } catch (error) {
      alert.unknownError();
    }
  }

  const saveStudent = async (student) => {
    try {
      await studentService.save(student);
      navigate('/students')
    } catch (error) {
      alert.unknownError();
    }
  }

  return (
    <div className="container">
      <Form
        form={form}
        name="basic"
        wrapperCol={{ span: 10 }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
            {
              max: 60,
              message: 'Name must be maximum 60 characters.'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input the last name!',
            },
            {
              max: 5,
              message: 'Name must be maximum 5 characters.'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input the email!',
            },
            {
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
          >
            {ui.Save}
          </Button>
          <Button htmlType="button" style={{ margin: '0 8px' }} type="danger" onClick={() => navigate("/students")}>
            Cancel
          </Button>
        </Form.Item>

      </Form>

    </div>
  )
}

export default Student
