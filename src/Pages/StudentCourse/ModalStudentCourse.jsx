import { Button, Form, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { ui } from '../../Constants/constant';

const { Option } = Select;

const ModalStudentCourse = (props) => {
    const [form] = Form.useForm();
    const { title, visible, onOk, onCancel, selectedItem, data } = props;
    const { dropDownData } = data
    const { courses, students } = dropDownData;

    useEffect(() => {
        autocompleteFields();
    })

    const autocompleteFields = () => {
        form.setFieldsValue({
            ...selectedItem
        });
    }

    return (
        <div className="container" key={"container-modal"}>
            <Modal
                title={title}
                visible={visible}
                footer={null}
                width={700}
                onCancel={onCancel}
                maskClosable={true}
            >
                <Form
                    form={form}
                    name="basic"
                    wrapperCol={{ span: 18 }}
                    layout="vertical"
                    onFinish={onOk}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Student"
                        name="studentId"
                        rules={[
                            {
                                required: !selectedItem,
                                message: 'Please select the name!',
                            }
                        ]}
                    >
                        <Select
                            allowClear
                            disabled={selectedItem}
                            showSearch
                            placeholder="Select an option"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {students.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Course"
                        name="courseId"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the course!',
                            }
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder="Select an option"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                            {courses.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            {ui.Save}
                        </Button>
                        <Button htmlType="button" style={{ margin: '0 8px' }} type="danger" onClick={() => onCancel()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalStudentCourse