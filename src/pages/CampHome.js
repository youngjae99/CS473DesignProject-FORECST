import React, {Component} from 'react';
import {Header, Menu} from '../components';
import Feed from '../components/feed';
import WGO from '../components/whatsgoingon';
import { db,storage } from "../firebase";
import {Link} from 'react-router-dom';


class CampHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        feed: [],
        whatsgoingon: [],
      }
    }
    
    componentDidMount() {
      var lists =[];
      const handleDownload = () => {
          db.collection('Feeds').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                console.log(doc.data());
                lists.push(doc);
            })
                      console.log(lists);

          })
          console.log(lists);
          this.setState({feed:lists, whatsgoingon:lists}, function () {
            console.log(this.state.feed);
        });
        }
      handleDownload();
    }
    
    render() {

      return (
        <div className="CampHome">
          <Menu></Menu>
          <div className="container">
            <div className="row"> 
              <Feed feed={this.state.feed} />
              <Link to={"./post"} style={{color: '#000', marginRight: 20}}>post</Link>
              <h1>What's Going On?</h1>
              <WGO wgo={this.state.whatsgoingon} />
            </div>
          </div>  

        </div>

      );
    }
  }
  
  export default CampHome;