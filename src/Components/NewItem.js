import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';

const DEFAULT_IMAGE = "https://gizmodo.com/app/uploads/2025/01/iPadAir.jpg";

const NewItem = React.memo(({
    title, 
    description, 
    image, 
    newsUrl, 
    publishedAt, 
    author, 
    source 
}) => {
    const formattedDate = useMemo(() => {
        try {
            return format(new Date(publishedAt), 'yyyy-MMM-dd');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Date unavailable';
        }
    }, [publishedAt]); 

    const truncatedTitle = useMemo(() => {
        return title?.length > 60 ? `${title.substring(0, 57)}...` : title;
    }, [title]);

    const truncatedDescription = useMemo(() => {
        return description?.length > 100 ? `${description.substring(0, 97)}...` : description;
    }, [description]);

    return (
        <div className="my-2">
            <div className="card h-100 shadow-sm">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
                    {source || 'Unknown Source'}
                </span>
                <img 
                    src={image || DEFAULT_IMAGE}
                    className="card-img-top" 
                    alt={title || 'News image'}
                    onError={(e) => {e.target.src = DEFAULT_IMAGE}}
                    loading="lazy"
                    height="200"
                    style={{ objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{truncatedTitle}</h5>
                    <p className="card-text flex-grow-1">{truncatedDescription || 'No description available'}</p>
                    <a 
                        href={newsUrl} 
                        className="btn btn-sm btn-dark mt-auto"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a>
                </div>
                <div className="card-footer text-body-secondary" style={{fontSize: '15px'}}>
                    By {author || 'Unknown'} on {formattedDate}
                </div>
            </div>
        </div>
    );
});

NewItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    newsUrl: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string
};

NewItem.displayName = 'NewItem';

export default NewItem;