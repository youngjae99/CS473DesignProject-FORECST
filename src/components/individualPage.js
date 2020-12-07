import React from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Tabs,
  Slider,
  Button,
  Form,
  Input,
  List,
  Progress,
  Popover,
  Modal,
} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import lv0 from "../level_tree/lv0.png";
import lv1 from "../level_tree/lv1.png";
import lv2 from "../level_tree/lv2.png";
import lv3 from "../level_tree/lv3.png";
import l0_trans from "../level_tree/l0_trans.png";
import l1_trans from "../level_tree/l1_trans.png";
import l2_trans from "../level_tree/l2_trans.png";
import l3_trans from "../level_tree/l3_trans.png";
import {getLevel, getPrevPoint, getNextPoint} from '../actions/authentication';
import { MyFeed } from "../components";
import { db } from "../firebase";
import PropTypes from "prop-types";
import { backend_makeToDo, backend_getToDo } from "../backend";
import { QuestionCircleOutlined } from "@ant-design/icons";
import firebase from "firebase/app";

const { TabPane } = Tabs;

const Editor = ({ onChange, value, submitting, onSubmit }) => (
  <Row style={{ marginTop: 10 }}>
    <Col span={18}>
      <Form.Item>
        <Input
          name="makeToDo"
          type="text"
          onChange={onChange}
          value={value}
        ></Input>
      </Form.Item>
    </Col>

    <Col span={6}>
      <div style={{ float: "right" }}>
        <Button
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          style={{ fontSize: 18 }}
        >
          Add to-do
        </Button>
      </div>
    </Col>
  </Row>
);

class IndividualPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      point: 0,
      submitting: false,
      todo: [],
      completed: [],
      feed: [],
      userName: "",
      makeToDo: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleOk = () => {
    console.log(this.props.history);
    Modal.destroyAll();
  };

  handleSubmit = () => {
    if (!this.state.makeToDo) {
      return;
    }

    if (this.state.todo.length + this.state.completed.length == 0) {
      Modal.info({
        title: "Now, let's write your first post.",
        content: (
          <div>
            Let's write first post on your first to-do list,
            <br></br>'Making a project name'.
            <div style={{ float: "right", marginTop: 20 }}>
              <Button type="primary" onClick={this.handleOk}>
                <a href="/uploadpost/true">GO</a>
              </Button>
            </div>
          </div>
        ),
        width: 500,
        centered: true,
        okButtonProps: { style: { display: "none" } },
        onCancel() {},
      });
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      db.collection("Users").doc(this.props.userName).update("newbie", false);
      backend_makeToDo(this.props.userName, this.state.makeToDo);
      this.setState({
        submitting: false,
        todo: [
          ...this.state.todo,
          {
            check: false,
            todo: this.state.makeToDo,
          },
        ],
        makeToDo: "",
      });
    }, 1000);
  };

  componentWillMount() {
    this.getMyPost();
    this.getMyToDo();
    this.getMarker();
  }

  getMyPost = async () => {
    const snapshot = await db
      .collection("Feeds")
      .where("id", "==", this.props.userName)
      .get();
    console.log(snapshot.docs);
    this.setState({ feed: snapshot.docs });
  };

  getMyToDo = async () => {
    const todo = await db
      .collection("Users")
      .doc(this.props.userName)
      .collection("todo")
      .where("check", "==", false)
      .get();
    const completed = await db
      .collection("Users")
      .doc(this.props.userName)
      .collection("todo")
      .where("check", "==", true)
      .get();

    this.setState({ todo: todo.docs.map((doc) => doc.data()) });
    this.setState({ completed: completed.docs.map((doc) => doc.data()) });
  };

  getMarker = async () => {
    const snapshot = await db
      .collection("Users")
      .doc(this.props.userName)
      .get();
    console.log(snapshot.data().point);
    this.setState({ point: snapshot.data().point });
  };

  render() {
    const MyView = (
      <div style={{ width: 1000, margin: "auto", marginTop: 20 }}>
        <MyFeed feed={this.state.feed}></MyFeed>
      </div>
    );

    var todoText = "";
    switch (this.state.todo.length + this.state.completed.length) {
      case 0:
        todoText = "Add 'Making a project name'";
        break;
      default:
        todoText = "Write a to-do!";
        break;
    }

    const BookmarkView = (
      <Row>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={
            (this.state.completed.length /
              (this.state.todo.length + this.state.completed.length)) *
            100
          }
          style={{ marginBottom: 20 }}
        />

        <Col span={12} style={{ paddingRight: 5 }}>
          <Row>
            <Col span={5}>
              <h5>To-do List</h5>
            </Col>
            <Col span={19}>
              <div style={{ float: "left" }}>
                <Popover
                  title="What are the examples of to-do list?"
                  content={
                    <div>
                      <p>Setting development environment</p>
                      <p>Make tab structure</p>
                      <p>Implement authentication</p>
                    </div>
                  }
                >
                  <QuestionCircleOutlined style={{ fontSize: 15 }} />
                </Popover>
              </div>
            </Col>
          </Row>

          <List
            bordered
            locale={{ emptyText: todoText }}
            dataSource={this.state.todo}
            renderItem={(item) => <List.Item>{item.todo}</List.Item>}
          />
          {window.sessionStorage.getItem("id") === this.props.userName ? (
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={this.state.submitting}
              value={this.state.makeToDo}
            />
          ) : null}
        </Col>

        <Col span={12} style={{ paddingLeft: 5 }}>
          <h5>Completed!</h5>
          <List
            bordered
            locale={{ emptyText: "No To-do is Completed!" }}
            dataSource={this.state.completed}
            renderItem={(item) => <List.Item>{item.todo}</List.Item>}
          />
          {window.sessionStorage.getItem("id") === this.props.userName ? (
            <Button type="primary" style={{ float: "right", marginTop: 10 }}>
              <Link to={"/uploadpost/false"} style={{ fontSize: 18 }}>
                Add Completed
              </Link>
            </Button>
          ) : null}
        </Col>
      </Row>
    );

    var point = parseInt(this.state.point);
    const level = this.props.getLevel(point);
    var prevPoint = 0;
    var nextPoint = 0;
    let profileTree = null;
    let currentTree = null;
    let nextTree = null;

    switch (level) {
      case 1:
        prevPoint = 10;
        nextPoint = 30;
        profileTree = <img src={lv1}></img>;
        currentTree = <img src={lv1} style={{ width: 120 }}></img>;
        nextTree = <img src={lv2} style={{ width: 70, marginTop: 50 }}></img>;
        break;
      case 2:
        prevPoint = 30;
        nextPoint = 70;
        profileTree = <img src={lv2}></img>;
        currentTree = <img src={lv2} style={{ width: 120 }}></img>;
        nextTree = <img src={lv3} style={{ width: 70, marginTop: 50 }}></img>;
        break;
      case 3:
        prevPoint = 70;
        nextPoint = 270;
        profileTree = <img src={lv3}></img>;
        currentTree = <img src={lv3} style={{ width: 120 }}></img>;
        break;
      default:
        prevPoint = 0;
        nextPoint = 10;
        profileTree = <img src={lv0}></img>;
        currentTree = <img src={lv0} style={{ width: 120 }}></img>;
        nextTree = <img src={lv1} style={{ width: 70, marginTop: 50 }}></img>;
        break;
    }

    return (
      <div style={{ fontFamily: "Roboto", paddingBottom: 30 }}>
        <div
          style={{
            width: 1000,
            margin: "auto",
            fontSize: 25,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Welcome to {this.props.userName} Page
        </div>

        <Card
          style={{ width: 1000, hegith: 200, margin: "auto", marginTop: 10 }}
        >
          <Row>
            {" "}
            {/* Sum=24 */}
            <Col span={4}>
              <Avatar size={120} icon={profileTree}></Avatar>
            </Col>
            <Col span={8}>
              <div style={{ marginTop: 5, fontWeight: "bold", fontSize: 25 }}>
                {this.props.userName}
              </div>
              <div style={{ marginTop: 5, fontSize: 18, fontWeight: "bold" }}>
                Currently in:
              </div>
              <div style={{ fontSize: 16 }}>
                <Link to={"/camp"} style={{textDecoration: "none"}}>
                    Make an application for the pandemic COVID 19 situation!
                </Link>
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>{currentTree}</Col>
                <Col span={12}>
                  <div style={{ marginTop: 25, fontWeight: "bold" }}>
                    {nextPoint - point} points left to grow up! &nbsp;
                    <Popover
                      title="What is tree level?"
                      content={
                        <div>
                          <p> Tree level : lv0 ~ lv3 </p>
                          <tr style={{ textAlign: "center" }}>
                            <td>
                              <img
                                src={l0_trans}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                              />
                              <p className="point_d">lv0</p>
                              <p className="point_d">0~10 points </p>
                            </td>
                            <td>
                              <img
                                src={l1_trans}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                              />
                              <p className="point_d"> lv1</p>
                              <p className="point_d">10~30 points </p>
                            </td>
                            <td>
                              <img
                                src={l2_trans}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                              />
                              <p className="point_d"> lv2</p>
                              <p className="point_d">30~70 points </p>
                            </td>
                            <td>
                              <img
                                src={l3_trans}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                              />
                              <p className="point_d"> lv3</p>
                              <p className="point_d">70~points </p>
                            </td>
                          </tr>
                          <br></br>
                          <p className="point_d"> Upload post : 5 points</p>
                          <p className="point_d"> Comment : 2 points</p>
                          <p className="point_d"> Login : 1 points</p>
                          <p className="point_d"> QnA post : 3 points</p>
                          <p className="point_d"> Watering : 2 points</p>
                        </div>
                      }
                    >
                      <QuestionCircleOutlined
                        fontSize="4px"
                        style={{ fontSize: 15 }}
                      />
                    </Popover>
                  </div>
                  <Slider
                    max={nextPoint - prevPoint}
                    value={point - prevPoint}
                    tooltipVisible
                    disabled={true}
                    style={{ marginTop: 50 }}
                  ></Slider>
                </Col>
                <Col span={6}>{nextTree}</Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <div style={{ width: 1000, margin: "auto" }}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size={"large"}
            style={{ margin: "auto", marginTop: 20 }}
          >
            <TabPane tab="TO DO" key="1">
              {BookmarkView}
            </TabPane>
            <TabPane tab="FEED" key="2">
              {MyView}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

IndividualPage.propTypes = {
  userName: PropTypes.string,
};

IndividualPage.defaultProps = {
  userName: "ddiddu",
};

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        getLevel: (point)=>{
            return getLevel(point);
        },
        getPrevPoint: (level)=>{
            return getPrevPoint(level);
        },
        getNextPoint: (level)=>{
            return getNextPoint(level);
        }    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualPage);
