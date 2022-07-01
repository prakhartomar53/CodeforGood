import InnerLayout from "../../components/layout/inner";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Select,
  Timeline,
} from "antd";
import useQuery from "../../hooks/useQuery";
import { useQuery as uq, useQueryClient } from "react-query";
import "../../styles/employee-details.scss";
import { useSelector } from "react-redux";
import {
  AddCourse,
  AddGoal,
  ChangeLocation,
  GetAllCourses,
  GetIndividualEmployeeDetails,
} from "../../services/employee.service";
import moment from "moment";
import { useState } from "react";
export default function EmployeeDetails() {
  const { userData } = useSelector((s) => s.user);
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openGoalsModal, setOpenGoalsModal] = useState(false);
  const [openCoursesModal, setOpenCoursesModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const queryClient = useQueryClient();
  const { data: employeeDetails } = uq("details", () =>
    GetIndividualEmployeeDetails(query.get("uid"))
  );
  const { data: courses } = uq("courses", GetAllCourses);
  console.log(employeeDetails);
  return (
    <InnerLayout>
      <div className="firstsection">
        <div className="details">
          <div className="image">
            <img src="https://picsum.photos/200/300" />
          </div>
          <div className="personaldetails">
            <div className="name">{employeeDetails?.name}</div>
            <div className="position">{employeeDetails?.role}</div>
            <div className="email"> {employeeDetails?.email}</div>
            <div className="phone"> 8017727622</div>
            <div className="phone">
              {employeeDetails?.probation ? "Under" : "Not Under"} Probation
            </div>
          </div>
        </div>
        <div className="charts">
          <div>
            <span>Completed Goals</span>
            <ResponsiveContainer width={200} height={180}>
              <PieChart width={200} height={180}>
                <Pie
                  data={[
                    {
                      count: employeeDetails?.goalsCompleteWithCourse,
                      name: "Goals With Course",
                    },
                    {
                      count: employeeDetails?.goalsCompleteWithoutCourse,
                      name: "Goals Without Course",
                    },
                  ]}
                  cx={80}
                  cy={100}
                  innerRadius={0}
                  outerRadius={70}
                  fill="#003974"
                  paddingAngle={5}
                  dataKey={"count"}
                  nameKey={"name"}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {userData.id === query.get("uid") && (
              <div className="image">
                <Button
                  loading={loading}
                  onClick={() => setOpenGoalsModal(true)}
                >
                  Add Goal
                </Button>
                <Modal
                  footer={[]}
                  visible={openGoalsModal}
                  onCancel={() => setOpenGoalsModal(false)}
                >
                  <Form
                    onFinish={async (values) => {
                      setLoading(true);
                      try {
                        await AddGoal({ ...values, images: [values.image] });
                        message.success("Goal added");
                      } catch (err) {
                        console.log("ERROR");
                        console.log(err);
                        message.error(err.response.data.message);
                      } finally {
                        queryClient.invalidateQueries("details");
                        setLoading(false);
                      }
                    }}
                  >
                    <Form.Item
                      style={{ marginTop: "30px" }}
                      name="title"
                      label="Title"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                      <Input />
                    </Form.Item>
                    <Form.Item name="referenceCourse" label="Referred Courses">
                      <Select mode="multiple">
                        {courses?.map(({ title, _id }) => (
                          <Select.Option key={_id}>{title}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="image" label="images link">
                      <Input />
                    </Form.Item>
                    <Button loading={loading} htmlType="submit">
                      Add
                    </Button>
                  </Form>
                </Modal>
              </div>
            )}
          </div>
          <div className="section">
            <span>Courses Completed</span>
            <Progress
              style={{ marginTop: "50px" }}
              type="dashboard"
              percent={employeeDetails?.coursesCompleted * 100}
            />
            {userData.id === query.get("uid") && (
              <>
                <Button
                  loading={loading}
                  onClick={() => setOpenCoursesModal(true)}
                >
                  Add Course
                </Button>
                <Modal
                  footer={[]}
                  visible={openCoursesModal}
                  onCancel={() => setOpenCoursesModal(false)}
                >
                  <Form
                    onFinish={async (values) => {
                      setLoading(true);
                      try {
                        await AddCourse(values);
                        message.success("Course added");
                      } catch (err) {
                        console.log("ERROR");
                        console.log(err);
                        message.error(err.response.data.message);
                      } finally {
                        queryClient.invalidateQueries("details");
                        setLoading(false);
                      }
                    }}
                  >
                    <Form.Item name="course" label="Referred Courses">
                      <Select>
                        {courses?.map(({ title, _id }) => (
                          <Select.Option key={_id}>{title}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Button loading={loading} htmlType="submit">
                      Add
                    </Button>
                  </Form>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="secondsection">
        <div className="timeline">
          <span className="timelineheading">Locations</span>
          <Timeline>
            {employeeDetails?.locations.map(({ location, time }) => (
              <Timeline.Item className="timelineitem">
                {location} - {moment(time).format("LL")}
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
        {userData.id === query.get("uid") && (
          <div className="image">
            <Button onClick={() => setOpenLocationModal(true)}>
              Change Location
            </Button>
            <Modal footer={[]} visible={openLocationModal}>
              <Form
                onFinish={async (values) => {
                  setLoading(true);
                  try {
                    await ChangeLocation(values);
                    message.success("Updated Location");
                    queryClient.invalidateQueries("details");
                  } catch (err) {
                    console.log("ERROR");
                    console.log(err);
                    message.error(err.response.data.message);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Form.Item name="location" label="location">
                  <Input />
                </Form.Item>
                <Button loading={loading} htmlType="submit">
                  Change
                </Button>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    </InnerLayout>
  );
}
