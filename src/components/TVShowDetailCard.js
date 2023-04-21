import TVShowCard from './TVShowCard';

function TVShowDetailCard(props) {
    /*create card view to show title, genre, image, and summary*/
    return (
      <>
        <img className='show-detail-img' src={props.imageURL} alt={props.title} />
        <div className='show-detail-text'>
        <h2>{props.title}</h2>
        <p>{props.summary}</p>
        </div>
      </>
    );
  }

export default TVShowDetailCard;