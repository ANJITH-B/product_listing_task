import { Rating } from "react-simple-star-rating";

type StarRatingProps = {
  value: number;  
};

const ReadStarRating = ({ value }: StarRatingProps) => {
  return (
    <Rating
      initialValue={value}
      readonly={true}        
      allowFraction={true}   
      size={16}
      SVGstyle={{ display: "inline-block" }}
    />
  );
};

export default ReadStarRating;
