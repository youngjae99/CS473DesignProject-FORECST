import React, {Component} from 'react';
// import { Menu} from '../components';
import { Progress, Row, Col, Typography, Alert } from 'antd';
import { db,storage } from "../firebase";
const { Title } = Typography;


class CampRankResult extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          projects: [],
        }
    }

    componentWillMount(){
        this.getProject();
      }
    
    getProject = async () => {
        const snapshot = await db.collection("Projects").get();
        console.log(snapshot.docs.map((doc)=>(doc.data())));
        setTimeout(()=>{
          this.setState({projects: snapshot.docs.map((doc)=>(doc.data()))})
        },100);
    }

    render(){
        const map = this.state.projects.map((word) => <div>
                                                        <div>
                                                            {word.projectTitle}
                                                        </div>
                                                        <Progress percent={word.votes} strokeColor={'#99ceff'} strokeWidth={'15px'}>
                                                        </Progress>
                                                      </div>)
        return (
            <div style={{padding:20, fontFamily: "Roboto"}}>
                <Alert
                    message="Your choice is successfully count in the result!"
                    type="success"
                    showIcon
                    closable
                    banner
                />
                <div style={{fontSize: 30, fontWeight: "bold"}}>
                Results for the Final Ranking
                </div>
                <div style={{fontSize: 16, paddingBottom: 10}}>
                    The Final Result will come out in 3 days!
                </div>
                {map}
                {/* Project A
                <Progress percent={8} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project B
                <Progress percent={15} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project C
                <Progress percent={5} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project D
                <Progress percent={25} status="active" strokeColor={'#1890ff'} strokeWidth={'15px'}></Progress>
                Project E
                <Progress percent={10} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project F
                <Progress percent={12} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project G
                <Progress percent={13} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project H
                <Progress percent={6} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project I
                <Progress percent={4} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                Project J
                <Progress percent={2} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress> */}
            </div>
        )
    }
}

export default CampRankResult;