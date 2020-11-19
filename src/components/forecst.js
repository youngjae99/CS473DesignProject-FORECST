import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { PageHeader, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


class Forecst extends React.Component{

    constructor(props){
        super(props);

        this.state={
            currentUser: ''
        };
    }

    handleHome(){
        this.props.history.push('/CS473_DesignProject');
    }
    
    render(){
        const joinButton=(
            <PageHeader
            ghost={false}
            backIcon="FORECST"
            onBack={()=>this.handleHome()}
            extra={[
                <Link to={"/login"} style={{color: '#000', marginRight: 20, fontSize: 18,}}>Login</Link>,
                <Button type='primary'>
                    <Link to={"/register"} style={{fontSize: 18}}>JOIN</Link>
                </Button>
            ]}
            />
        );
    
        const mypageButton=(
            <PageHeader
            ghost={false}
            backIcon="FORECST"
            onBack={()=>this.handleHome()}
            extra={[
                <Link to={"/mypage"} style={{color: '#000', fontSize: 18}}>{this.props.currentUser}</Link>,
                <Avatar size={30} icon={<UserOutlined></UserOutlined>}></Avatar>
            ]}
            />
        );

        return (
            <div style={{fontFamily: "Roboto"}}>
                {this.props.isLoggedIn ? mypageButton : joinButton}              
            </div>
        );
    }
};

Forecst.propTypes={
    isLoggedIn: PropTypes.bool,
    currentUser: PropTypes.string
};

Forecst.defaultProps={
    isLoggedIn: false,
    currentUser: 'Youngjae'
};

export default withRouter(Forecst);