import { NavButton } from "./buttons";

export const Sidebar = () => {
  return (
    <aside className="flex h-screen">
      <nav className="grid w-full grid-cols-1 p-2">
        <NavButton />
      </nav>
    </aside>
  );
};
