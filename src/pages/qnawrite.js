import React, { Component } from 'react';
import {Row, Col, Form, Input, Button, Space} from 'antd';
import {Link} from 'react-router-dom';
import notificationqna from '../components/notification_qnaupload';
import notificationqnacancel from '../components/notification_qnauploadcancel';

class QnAWrite extends Component{
    render(){
        return(
            <div style={{fontFamily: "Roboto", width: 1200, margin: "auto", paddingTop: 20}}>
                <Row>
                    <Col>
                        <div style={{fontSize: 24, fontWeight: "bold"}}>
                            Write down your Question!
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={21} style={{marginTop: 20}}>
                    </Col>
                </Row>

                <Row>
                <Col span={3}>
                        <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                            Title:
                        </div>
                    </Col>
                    <Col span={21} style={{marginTop: 20}}>
                        <Form.Item
                        // label="Username"
                        // name="username"
                        rules={[
                            {
                                required:true,
                                message: 'Please input your username.',
                            }
                        ]}>
                            <Input
                            name='username'
                            type='text'
                            // onChange={this.handleChange}
                            // value={this.state.username}
                            >
                            </Input>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                <Col span={3}>
                        <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                            Content:
                        </div>
                    </Col>
                    <Col span={21} style={{marginTop: 20}}>
                        <Form.Item
                        // label="Username"
                        // name="username"
                        rules={[
                            {
                                required:true,
                                message: 'Please input your username.',
                            }
                        ]}>
                            <Input
                            name='username'
                            type='text'
                            // onChange={this.handleChange}
                            // value={this.state.username}
                            style={{height: 300}}
                            >
                            </Input>
                        </Form.Item>

                        <div style={{textAlign: "right"}}>
                            <Space style={{marginRight: 16}}>
                                <Button onClick={notificationqnacancel}>Cancel</Button>
                            </Space>
                            <Space style={{marginRight: 16}}>
                                <Button onClick={notificationqna}>Upload</Button>
                            </Space>
                            {/* <Link to="./campqna">
                                <Button type="primary" onClick={openNotification}>UPLOAD</Button>
                            </Link> */}
                            {/* <Button type='primary' style={{marginLeft: 100}}>
                                <Link to={"/campqna"} style={{fontSize: 18}}>UPLOAD</Link>
                            </Button> */}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default QnAWrite;