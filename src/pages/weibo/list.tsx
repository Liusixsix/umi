import React, { useState, useEffect } from 'react'
import { Table, Card, Form, Input, Button, Avatar, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { queryTableList, deleteBlogById, updataBlogContent } from '../../services/weibo'
const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const { TextArea } = Input;

const Lists: React.FC = () => {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'user',
            align: 'center',
            render: (text, row, index) => {
                return row.user.userName
            }
        },
        {
            title: '头像',
            dataIndex: 'picture',
            key: 'picture',
            align: 'center',
            render: (text, row, index) => {
                return <Avatar src={row.user.picture} />
            }
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
        },
        {
            title: 'action',
            key: 'x',
            align: 'center',
            render: (text: any, row: any) => (
                <span>
                    <Button type='link' onClick={() => modify(row.id, row.content)} style={{ marginRight: 20 }}>修改</Button>
                    <Button type="link" onClick={() => deleteBlog(row.id)}> 删除</Button>
                </span>
            )
        },
    ];

    const [loading, setLoading] = useState(true)
    const [ruleform, setRuleform] = useState({ userName: '' })
    const [dataList, setDataList] = useState([])
    const [pageSize, setpageSize] = useState(10)
    const [pageCurret, setPageCurret] = useState(1)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState('')
    const [id,setId] = useState<any>(null)
    const onFinish = (values: any) => {
        setRuleform(values)
        setPageCurret(1)
    };

    // 删除博客
    const deleteBlog = (id: number): any => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            async onOk() {
                const data = await deleteBlogById(id)
                _fetchTableList()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const modify = (id: number, content: string): void => {
        setContent(content)
        setId(id)
        setVisible(true)
    }

    const changeContent =  async():Promise<void> => {
        await updataBlogContent({id,content})
        _fetchTableList()
        setVisible(false)
    }

    const change = (pagination: any) => {
        setPageCurret(pagination.current)
    }

    const _fetchTableList = () => {
        setLoading(true)
        queryTableList({ userName: ruleform.userName, pageSize: pageSize, pageIndex: pageCurret }).then(res => {
            setLoading(false)
            if (res.errno === 0) {
                const { blogList, count } = res.data
                setDataList(blogList)
                setTotal(count)
            }
        })
    }


    useEffect(() => {
        _fetchTableList()
    }, [pageCurret, ruleform])

    return (
        <>
            <Card style={{ width: '100%', marginBottom: 20 }}>
                <Form
                    layout='inline'
                    onFinish={onFinish}
                >
                    <Form.Item label="姓名" name="userName" initialValue=''>
                        <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">查找</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Table
                bordered
                dataSource={dataList}
                columns={columns}
                loading={loading}
                pagination={{ pageSize, current: pageCurret, total }}
                onChange={change}
                rowKey={record => record.id}
            />
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={() => changeContent()}
                onCancel={() => setVisible(false)}
            >
                <TextArea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
            </Modal>
        </>
    )
}

export default Lists
