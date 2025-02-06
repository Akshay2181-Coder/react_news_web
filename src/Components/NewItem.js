import {format} from 'date-fns';

const NewItem =(props)=>{
       let  {title, description, image, newsUrl,publishedAt,author,source} = props;
        return (
            <div className="my-2">
                <div className="card">
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">{source}</span>
                    <img src={image == null ? "https://gizmodo.com/app/uploads/2025/01/iPadAir.jpg" : image}
                         className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                    <div className="card-footer text-body-secondary" style={{fontSize: '15px'}}>
                        By {!author ? 'Unknown' : author} on {format(publishedAt, 'yyyy-MMM-dd')}
                    </div>
                </div>
            </div>
        );

}

export default NewItem;