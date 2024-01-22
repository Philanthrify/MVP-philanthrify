import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Updates = () => {
  const updates = useSelector(
    (state: RootState) => state.project.project?.updates
  );
  if (!updates || updates.length === 0) {
    return <p>No Updates as of yet!</p>;
  }
  return (
    <div>
      {updates.map((update, index) => (
        <div key={index}>
          <p>- {update.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Updates;
