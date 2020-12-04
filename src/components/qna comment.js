import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Tooltip, Avatar, Collapse } from 'antd';
import moment from 'moment';
import { db,storage } from "../firebase";
import {connect} from 'react-redux';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import {getLevel} from '../actions/authentication';
import PropTypes from 'prop-types';
import Profile from './profile';
import {backend_QnA_Likes} from "../backend";


const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value, username }) => (
  <>
    <div>{username}</div>
    <Form.Item>
      <Input
      type='text'
      onChange={onChange}
      value={value}
      style={{height: 50}}>
      </Input>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} 
      type="primary" style={{marginTop: 10, float: "right"}}>
        Add Answer 
      </Button>
    </Form.Item>
  </>
);

class QnAComment extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      comments: [],
      submitting: false,
      value: '',
      liked : 1,
      point: 0,
    };    
    console.log(this.props.status.currentUser)
  }

  componentDidMount(){
    this.getComments();
    // this.getMarker();
  }

  getComments = async () => {
    const snapshot = await db.collection("QnAList/"+this.props.posting+"/Comments").get()
    console.log(snapshot.docs.map(doc=>doc.data()))
    this.setState({comments:snapshot.docs.map(doc=>doc.data())})  
  }

  getPoints = async (id) => {
    const snapshot = await db.collection("Users").doc(id).get()
    console.log(snapshot.docs.map(doc=>doc.data()))
    return snapshot.data().point
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(this.props.status.currentUser)
    this.setState({
      submitting: true,
    });


  setTimeout(() => {
    db.collection('QnAList').doc(this.props.posting).collection("Comments").doc().set({author:this.props.status.currentUser, content:this.state.value, datetime:moment().valueOf()})
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: this.props.status.currentUser,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleLikes = (id) => {
    if(this.state.liked == 1){
      backend_QnA_Likes(id)
      this.setState({liked:2})
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  
//   getMarker = async () => {
//     const snapshot = await db.collection('Users').doc(this.props.currentUser).get();
//     console.log(snapshot);
//     this.setState({point:snapshot.data().point});
// }

  // getPoints = async (id) => {
  //   const snapshot = await db.collection("Users").doc(id).get()
  //   // console.log(snapshot.docs.map(doc=>doc.data()))
  //   return snapshot.data().point
  // }

  render() {
    const { comments, submitting, value } = this.state;

    var point=this.state.point;
    const level=this.props.getLevel(point);
    let profileTree=null;

    switch (level) {
        case 1:
            profileTree=<img src={lv1}></img>
            break;
        case 2:
            profileTree=<img src={lv2}></img>
            break;
        default:
            profileTree=<img src={lv0}></img>
            break;
    }

    const addComment=(
      <>
      <Comment
        content={
          <Editor
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
            username={this.props.status.currentUser}
          />
        }
        avatar={
          <Profile
            writer={this.props.status.currentUser}>
          </Profile>
        }
      />
      </>
    )

    return (
      <>
        <List
            className="comment-list"
            header={`${comments.length} answers`}
            itemLayout="vertical"
            dataSource={comments}
            renderItem={item => (
                // <li>
                <div>
                  <Comment
                      // actions={item.actions}
                      author={item.author}
                      content={item.content}
                      datetime={item.datetime.fromNow}
                      avatar={
                        <Profile
                          writer={item.author}>
                        </Profile>
                      }
                  />
                  <Button onClick={this.handleLikes(item.id)}>Likes</Button>
                </div>
                // {/* {this.getPoints(item.author)} */}
                // </li>
            )}
            />
        {this.props.status.isLoggedIn ? addComment : null}
      </>
    );
  }
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        getLevel: (point)=>{
            return getLevel(point);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QnAComment);