/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:17 AM.
 *
 */

import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Col } from 'reactstrap';

class SearchListItem extends Component {
  constructor(props) {
    super(props);

    this.userObj = this.props.userObj;
  }

  render() {
    return (
       <Col xs={12} sm={6} md={4} xl={3} className={'m-3'}>
         <div className="media">
           <Link to={'/user/'+this.userObj.login} className="align-self-start mr-3">
             <img className="" src={this.userObj.avatar_url} alt="" />
           </Link>
           <div className="media-body">
             <h5 className="media-heading">Name: {this.userObj.login}</h5>
             <h6>Id: {this.userObj.id}</h6>
             <div>
               <Link to={'/user/'+this.userObj.login} className={"btn btn-secondary btn-sm m-1"}>view info</Link>
               <a href={this.userObj.html_url} target={"blank"} className={"btn btn-secondary btn-sm m-1"}>view git profile</a>
             </div>
           </div>
         </div>
       </Col>
    );
  }
}

export default SearchListItem;