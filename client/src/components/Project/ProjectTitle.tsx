import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TypographyTitle from "../Title";

// This component is for the project title
const ProjectTitle = () => {
  const project = useSelector((state: RootState) => state.project.project);
  return (
    <>
      {project?.title && (
        <TypographyTitle variant="h1" alignSelf="flex-start" padding="15px 0">
          {project.title}
        </TypographyTitle>
      )}
    </>
  );
};

export default ProjectTitle;
