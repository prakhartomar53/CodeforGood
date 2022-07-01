import React, { useState } from "react";
import InnerLayout from "../../components/layout/inner";
import "../../styles/training.scss";
import { useQuery, useQueryClient } from "react-query";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { GetAllCourses } from "../../services/employee.service";
import { useSelector } from "react-redux";
import { UploadCourse } from "../../services/hr.service";
export default function Training() {
  const { data: courses } = useQuery("courses", GetAllCourses);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { type } = useSelector((s) => s.user);

  return (
    <InnerLayout>
      <div className="maintraining">
        {" "}
        {type === "HR" && (
          <>
            <Button onClick={() => setModalVisible(true)}>Add Course</Button>
            <Modal
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={[]}
            >
              <Form
                onFinish={async (values) => {
                  setLoading(true);
                  try {
                    await UploadCourse(values);
                    message.success("Course Uploaded successfully!");
                    queryClient.invalidateQueries("courses");
                  } catch (err) {
                    message.error(err.response.data.message);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Form.Item name="title" label="Title">
                  <Input />
                </Form.Item>
                <Form.Item name="link" label="Link">
                  <Input />
                </Form.Item>
                <Form.Item name="duration" label="Duration">
                  <Input />
                </Form.Item>
                <Form.Item name="image" label="Image Link">
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <Input />
                </Form.Item>
                <Form.Item name="assignedTo" label="Assign To">
                  <Select mode="multiple">
                    <Select.Option key="Volunteer">Volunteer</Select.Option>
                    <Select.Option key="HR">HR</Select.Option>
                    <Select.Option key="Engineering">Engineering</Select.Option>
                    <Select.Option key="Marketing">Marketing</Select.Option>
                  </Select>
                </Form.Item>
                <Button htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form>
            </Modal>
          </>
        )}
        <h1>Trainings</h1>
        {courses?.map(({ title, image, description, assignedTo }) => (
          <div class="card">
            <div class="card-body">
              <div className="image">
                <img src={image} alt="" />
              </div>
              <span class="tag ">{title}</span>
              <h6>{description}</h6>
              <div class="user">
                <div class="user-info">
                  <h5>Students Enrolled- 312</h5>
                  <h5 class="final">Completed- 345</h5>
                  <h5>Ratings</h5>
                  <small>3.6</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InnerLayout>
  );
}
