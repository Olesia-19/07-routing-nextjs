import Link from "next/link";
import css from "./default.module.css";

export default async function SideBar() {
  const categories = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <ul className={css.menuList}>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
