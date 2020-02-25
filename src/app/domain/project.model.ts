export interface Project {
  id: string | undefined;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskFilterId?: string;
  taskLists?: string[];
  members?: string[];
}
