import ChromaGrid from "./ChromaGrid/ChromaGrid";
import { listProject } from "../projects";

export default function ProjectsGrid({ onItemClick }) {
  return (
    <ChromaGrid
      items={listProject}
      onItemClick={onItemClick}
      radius={500}
      damping={0.45}
      fadeOut={0.6}
      ease="power3.out"
    />
  );
}
