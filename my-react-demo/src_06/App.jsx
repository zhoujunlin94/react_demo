import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Modal, message, Pagination } from "antd";
import axios from "axios";

const ConfigPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [queryForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTable();
  }, [pageNum, pageSize]);

  const loadTable = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/business-config/page", {
        pageNum,
        pageSize,
        ...queryForm.getFieldsValue()
      });
      setData(response.data.result.list);
      setTotal(response.data.result.total);
    } catch (error) {
      message.error("加载数据失败", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setPageNum(1);
    loadTable();
  };

  const handleReset = () => {
    queryForm.resetFields();
    handleSearch();
  };

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "确认删除?",
      content: "删除后不可恢复，确定要删除吗？",
      onOk: async () => {
        try {
          await axios.post(`/api/v1/business-config/delete?id=${id}`);
          message.success("删除成功");
          loadTable();
        } catch (error) {
          message.error("删除失败", error);
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.getFieldValue();
      console.log(values)
      if (values.id) {
        await axios.post("/api/v1/business-config/update", values);
        message.success("更新成功");
      } else {
        await axios.post("/api/v1/business-config/create", values);
        message.success("新增成功");
      }
      setModalVisible(false);
      loadTable();
    } catch (error) {
      message.error("操作失败", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Business Type", dataIndex: "businessType", key: "businessType" },
    { title: "Business Key", dataIndex: "businessKey", key: "businessKey" },
    { title: "Business Value", dataIndex: "businessValue", key: "businessValue" },
    {
      title: "操作",
      key: "action",
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)} size="small" style={{ marginRight: 8 }}>编辑</Button>
          <Button type="danger" onClick={() => handleDelete(record.id)} size="small">删除</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <h2>系统配置信息</h2>
      <Form layout="inline" form={queryForm}>
        <Form.Item name="businessType" label="Business Type">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="businessKey" label="Business Key">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>查询</Button>
          <Button onClick={handleReset} style={{ marginLeft: 8 }}>重置</Button>
        </Form.Item>
      </Form>
      <div style={{ marginBottom: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleAdd}>新增</Button>
      </div>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="id" pagination={false} />
      <Pagination
        style={{ marginTop: 16, textAlign: "center" }}
        total={total}
        current={pageNum}
        pageSize={pageSize}
        onChange={setPageNum}
        onShowSizeChange={(_, size) => setPageSize(size)}
      />
      <Modal
        title="系统配置信息"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="businessType" label="Business Type" rules={[{ required: true, message: "请输入 Business Type" }]}> 
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="businessKey" label="Business Key" rules={[{ required: true, message: "请输入 Business Key" }]}> 
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="businessValue" label="Business Value" rules={[{ required: true, message: "请输入 Business Value" }]}> 
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConfigPage;
