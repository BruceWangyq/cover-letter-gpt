import { Url } from "url";

interface MenuDataProps {
  id: number;
  title: string;
  path?: Url | string;
  newTab?: boolean;
  submenu?: MenuDataProps[];
}

const menuData: MenuDataProps[] = [];
export default menuData;
