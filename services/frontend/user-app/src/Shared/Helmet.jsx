import { Helmet } from "react-helmet-async";

const HelmetChanger = ({ title }) => {
  return (
    <Helmet>
      <title>My Hotel - {title}</title>
    </Helmet>
  );
};

export default HelmetChanger;
