import { FunctionComponent } from "react";
import FilterBy from "./FilterBy.tsx";
import SortBy from "./SortBy.tsx";

interface ExploreFilterProps {
  currentTab: string;
}

const ExploreFilter: FunctionComponent<ExploreFilterProps> = ({
  currentTab,
}) => {
  return (
    <>
      <SortBy />
      <FilterBy currentTab={currentTab} />
    </>
  );
};

export default ExploreFilter;
