import React from 'react';
import { Button } from '../../atoms';
import './articleItem.scss';

const ArticleItem = (props) => {

     return (
          <div className="article-item" onClick={() => props.onClick ? props.onClick(props._id) : null}>
               <img src={props.articlePhoto} className="article-img" alt={props.title} />
               <h2 className="mb-3">{props.title}</h2>
               <p className="article-content">
                    {props.content}
               </p>
               {
                    props.onUpdate ?
                    <Button background="gray" title="Update" onClick={(e) => props.onUpdate(e, props._id) } /> : null
               }
               {
                    props.onDelete ?
                    <Button background="red" title="Delete" onClick={(e) => props.onDelete(e, props._id) } /> : null
               }
          </div>
     )
}

export default ArticleItem;