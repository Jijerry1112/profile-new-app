import "../styles/card.css";

const Card = ({name, title, image}) => {
  return (
    <div className="profile-card">
      <div className="top">
           <img src={image} alt={name} />
      </div>
      <div className="bottom">
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </div>
  )
}



export default Card;
