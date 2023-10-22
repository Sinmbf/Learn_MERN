/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import Notes from "../Notes";

const Home = ({ displayAlert }) => {
  return (
    <>
      <Notes displayAlert={displayAlert} />
    </>
  );
};

export default Home;
