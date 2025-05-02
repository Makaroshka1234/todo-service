import NotFoundMessage from "../components/NotFoundMessage";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-full">
        <NotFoundMessage />
      </div>
    </>
  );
};

export default NotFound;
