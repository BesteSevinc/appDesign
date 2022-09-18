// Anjileen's Code

import { Link } from 'react-router-dom';

// function for card component
function Card(props) {
    return (
        <>
            {props.listing && (
                <div className="featuredCard3Col" key={props.listing._id}>
                    <Link to={`/listing/${props.listing._id}`}>
                        <img src={props.listing.image} alt={props.listing.title} />
                    </Link>
                    <Link to={`/listing/${props.listing._id}`}>
                        <p className="bold">{props.listing.title}</p>
                    </Link>
                    <p>${props.listing.price?.toFixed(2)}</p>
                </div>
            )}
        </>
    );
}

export default Card;
