import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Updates = () => {
  const { projectId } = useParams<{ projectId: string }>();
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
