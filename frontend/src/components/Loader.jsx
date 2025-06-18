import loading from "../assets/loading.webm";
const Loader = () => {
  return (
    <video
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      src={loading}
      autoPlay={true}
      loop
      muted
      width={212}
      height={212}
    ></video>
  );
};
export default Loader;
