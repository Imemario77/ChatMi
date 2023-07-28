import defaultImage from "./Profile.jpeg";
function Image(props) {
   return (
      <img
         className={props.class}
         style={{
            width: props.class ? null : props.size,
            borderRadius: props.class ? null : "50%",
         }}
         src={props.Image ? props.Image : defaultImage}
         alt="default profile"
      />
   );
}
export default Image;
