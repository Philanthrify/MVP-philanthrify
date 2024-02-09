import { useParams } from "react-router-dom";

const CharityPage = () => {
  const { charityId } = useParams<{ charityId: string }>();

  return <div>CharityPage</div>;
};

export default CharityPage;
