import React, { Component } from "react";
import { List, Typography, Popover} from "antd";
import { db, storage } from "../firebase";
import postimg from "../post.png";
import questionimg from "../question.png";
import "./componentsCSS.css";
import {QuestionCircleOutlined} from '@ant-design/icons';


const { Title } = Typography;

class WGO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wgo: [],
    };
  }

  componentDidMount() {
    this.getWGO();
  }
  getWGO = async () => {
    const snapshot = await db.collection("WGO").orderBy("time", "desc").get();
    this.setState({ wgo: snapshot.docs });
  };

  toTime = (orgtime) => {
    var s = Date.now() - orgtime;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var day = hrs / 24;

    if (hrs < 1) {
      return mins + " minutes ago";
    } else if (hrs < 24) {
      return hrs + " hour ago";
    } else {
      return "long time ago";
    }
  };

  render() {
    const logo = (mode) => {
      if (mode == "post") return postimg;
      else if (mode == "question") return questionimg;
    };

    console.log();

    return (
      <div className="WGObox shadowbox" style={{ height: "100vh" }}>
        <h6 style={{ marginLeft: "10px" }}>
          What's going on
        </h6>

        <List
          itemLayout="vertical"
          locale={{ emptyText: "Nothing is going on!" }}
          size="large"
          dataSource={this.state.wgo.slice(0, 15)}
          style={{ marginTop: "20px", overflowY: "scroll" }}
          renderItem={(item) => (
            <div className="WGOitem" style={{ margin: "10px" }}>
              <img src={logo(item.data().mode)} style={typeimgStyle} />
              {item.data().content}
              <div
                style={{
                  fontSize: 9,
                  float: "right",
                  verticalAlign: "bottom",
                  lineHeight: "25px",
                }}
              >
                {this.toTime(parseInt(item.data().time))}
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

const typeimgStyle = {
  width: "20px",
  height: "20px",
  marginRight: "6px",
};

export default WGO;
