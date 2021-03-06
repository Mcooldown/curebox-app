import React from 'react';
import { Fragment } from 'react';
import { ForumDefault } from '../../../assets';
import { Gap } from '../../atoms';

const ForumItem = (props) => {

     return (
          <div className="card card-item" onClick={() => props.onClick ? props.onClick(props._id) : null}>
               <img className="image" src={props.forumPhoto ? props.forumPhoto : ForumDefault} alt={props.title} />
               <div className="card-body">
                    <Gap height={5} />
                    <h5>{props.title}</h5>
                    <Gap height={8} />
                    {
                         props.user && 
                         <Fragment>
                              <p className="text-truncate text-muted mb-1"><i class="fas fa-user me-2"></i> {props.user.name}</p>
                              <p className="text-truncate text-muted m-0"><i class="fa fa-clock me-2"></i>{ new Date(props.createdAt).toDateString("en-US")}</p>
                         </Fragment>
                    }
               </div>
          </div>
     )
}

export default ForumItem;