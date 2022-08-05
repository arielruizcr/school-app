import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Popconfirm, Tooltip } from "antd";

import { ui } from "../../Constants/constant";

export const columns = (editRecord, deleteRecord) => [
    {
        title: 'Name',
        dataIndex: "name",
        key: "name",
        width: 200,
        align: "center"
    },
    {
        title: 'Description',
        dataIndex: "description",
        key: "description",
        width: 400,
        align: "center"
    },
    {
        title: 'Action',
        key: "action",
        width: 150,
        align: "center",
        render: (text, record) => {
            return (
                <span>
                    <Button
                        onClick={() => editRecord(record)}
                        icon={<EditOutlined />}
                        type="link"
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title={ui.confirmDelete}
                        onConfirm={(e) => {
                            e.stopPropagation();
                            deleteRecord(record);
                        }}
                        onCancel={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Tooltip title={ui.delete}>
                            <Button
                                icon={<DeleteOutlined />}
                                type="link"
                            />
                        </Tooltip>
                    </Popconfirm>
                </span>
            )
        }
    }
]