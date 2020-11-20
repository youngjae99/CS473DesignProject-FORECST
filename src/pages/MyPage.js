import React from 'react';
import {Card, Avatar, Row, Col, Tabs, Slider, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { db,storage } from "../firebase";

const {TabPane}=Tabs;

class MyPage extends React.Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.getMyPost();
      }
    getMyPost = async () => {
        const snapshot = await db.collection('Feeds').where("id","==",this.props.status.currentUser).get()
        console.log(snapshot.docs)
            // this.setState({feed:snapshot.docs})  
        }
        //my view 보여주는 코드가 필요함
    render(){
        const MyView=(
            <div style={{width: 1000, margin: "auto", marginTop: 20}}>
                    MY VIEW
            </div>
        )

        const BookmarkView=(
            <div style={{width: 1000, margin: "auto", marginTop: 20}}>
                    BOOKMARK VIEW
            </div>
        )

        return (
            <div style={{fontFamily: 'Roboto'}}>
                <div style={{width: 1000, margin: "auto", fontSize: 25, marginTop: 20, fontWeight: "bold"}}>
                    My Page
                </div>

                <Card style={{width: 1000, hegith: 200, margin: "auto", marginTop: 10}}>                
                    <Row> {/* Sum=24 */}
                        <Col span={4}>
                            <Avatar size={120} icon={<UserOutlined></UserOutlined>}></Avatar>
                        </Col>
    
                        <Col span={10}>
                            <div style={{marginTop: 5, fontWeight: "bold", fontSize: 20}}>{this.props.status.currentUser}</div>
                            <div style={{marginTop: 10, fontSize: 18}}>Joined Today.</div>
                            <div style={{marginTop: 10, fontSize: 18}}>KAIST School of Computing</div>
                        </Col>
    
                        <Col span={10}>
                            <Slider defaultValue={0} tooltipVisible disabled={true} style={{marginTop: 100}}></Slider>
                        </Col>
                    </Row>
                </Card>

                <Row style={{width: 1000, margin: "auto", marginTop: 20}}>
                    <Col span={20}>
                        <Tabs defaultActiveKey="1" type="card" size={"large"} >
                            <TabPane tab="MY" key="1">
                                {MyView}
                            </TabPane>
                            <TabPane tab="BOOKMARK" key="2">
                                {BookmarkView}
                            </TabPane>
                        </Tabs>
                    </Col>

                    <Col span={4} style={{textAlign: "right"}}>
                        <Button type='primary'>
                            <Link to={"/uploadpost"} id={this.props.status.currentUser} style={{fontSize: 18}}>New Post</Link>
                        </Button>
                    </Col>
                </Row>

            </div>
        );
    }
};

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);