import React, {Component} from 'react';
import {List, Divider, Button, Row, Col, Space} from 'antd';
import {db} from '../firebase';
import QnAComment from './qna comment';

class QnAsingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentTitle: '',
            qna: [],
        };
    }

    
    getMarker = async () => {
        const snapshot = await db.collection('QnAList').get()
        console.log(snapshot.docs)
        this.setState({qna: snapshot.docs})
    }
    setTitle = async () => {
        console.log(this.props.location.pathname.split("/")[2])
        const piece = this.props.location.pathname.split("/")
        console.log(piece[2])
        const snapshot = await db.collection('QnAList').where("title","==",piece[2]).get()
        console.log(snapshot.docs)
        await this.setState({qna: snapshot.docs})

        console.log(this.state.qna)
    }

    componentDidMount(){
        this.getMarker();
        this.setTitle();
    }


    render(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.qna}
                renderItem={item => (
                    <div>
                        {/* <img src={item.data().photo} style={profileStyle} alt="profileimg"/> */}
                        <Space style={{marginLeft: '16px', marginRight: '16px'}}>
                            `<div style={{fontFamily: "Roboto", width: 1000, margin: "auto", paddingTop: 20}}>
                                <Row>
                                    <Col span={8}>
                                        <h4>{item.data().writer}</h4>
                                    </Col>
                                    <Col span={20}>
                                        <h3 style={{fontSize: 30}}>
                                            {item.data().title}
                                        </h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Divider/>
                                    <div style={{float: "right"}}>
                                        <h6>Likes | {item.data().likes}</h6>
                                        <h6 style={{marginLeft: '16px'}}>Views | {item.data().views}</h6>
                                    </div>
                                </Row>
                                    <div style={{fontSize: 20}}>{item.data().writing}</div>
                                    <QnAComment posting = {item.id}  id ={item.data().id}></QnAComment>`
                                {/* </Row> */}
                            </div>
                        </Space>
                    </div>
                )}
            />
        )
    }
}

const profileStyle = {
    width: "60px",
    height: "60px"
}

export default QnAsingle;