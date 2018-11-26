/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:17 AM.
 *
 */

/*
 * *
 *  * Created by vstymkovskyi on 11/13/18 11:31 AM.
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
       <Col lg={3}>
         <div className="media">
           <Link to={'/user/'+this.userObj.id} className="align-self-start mr-3">
             <img className="" src={this.userObj.avatar_url} alt="" />
           </Link>
           <div className="media-body">
             <h5 className="media-heading">Name: {this.userObj.login}</h5>
             <h6>Id: {this.userObj.id}</h6>
             <div>
               <Link to={'/user/'+this.userObj.id}>view info</Link>
               <Link to='/'>view profile</Link>
             </div>
           </div>
         </div>
       </Col>
    );
  }
}

export default SearchListItem;