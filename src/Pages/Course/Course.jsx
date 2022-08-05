import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { alert } from '../../Common/alert';
import { ui } from '../../Constants/constant';
import { courseService } from '../../Services';

const Course = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      getCourse();
    }
  })

  const getCourse = async () => {
    try {
      const response = await courseService.getCourse(courseId);

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
    const course = {
      ...values,
      id: courseId
    }
    if (course.id) {
      editCourse(course);
    } else {
      saveCourse(course);
    }
  }

  const editCourse = async (course) => {
    try {
      await courseService.update(course);
      navigate('/courses');
    } catch (error) {
      alert.unknownError();
    }
  }

  const saveCourse = async (course) => {
    try {
      await courseService.save(course);
      navigate('/courses')
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
          label="Description"
          name="description"
          rules={[
            {
              max: 300,
              message: 'Description must be maximum 300 characters.',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
          >
            {ui.Save}
          </Button>
          <Button htmlType="button" style={{ margin: '0 8px' }} type="danger" onClick={() => navigate("/courses")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Course;
