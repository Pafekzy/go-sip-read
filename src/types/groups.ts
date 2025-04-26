
export type Subcategory = {
  id: string;
  name: string;
  groups: Group[];
};

export type Group = {
  id: string;
  name: string;
  prefix: string;
  description: string;
  memberCount: number;
};

export type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  subcategories: Subcategory[];
};
