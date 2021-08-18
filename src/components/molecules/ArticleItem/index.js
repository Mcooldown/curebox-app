import React from 'react';
import { useHistory } from 'react-router';
import './articleItem.scss';

const ArticleItem = (props) => {

     const history = useHistory()

     return (
          <div className="article-item" onClick={() => history.push(`/articles/${props._id}`)}>
               <img src={props.articlePhoto} className="article-img" />
               <h2 className="mb-3">{props.title}</h2>
               <p className="article-content">
                    {props.content}
               </p>
          </div>
     )
}

export default ArticleItem;