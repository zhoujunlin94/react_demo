import { Table } from 'antd'

const User = () => {
  const dataSource = [
    { key: '1', name: '用户1', age: 32 },
    { key: '2', name: '用户2', age: 28 }
  ]

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' }
  ]

  return <Table dataSource={dataSource} columns={columns} />
}

export default User