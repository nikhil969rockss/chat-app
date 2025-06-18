const SideBarUsersSkeleton = () => {
  const array = [0, 1, 2, 3, 4, 5,7,8,9];
  return (
    <aside className="w-full h-full relative">
      {/* header */}
      <nav className="w-full p-2 flex flex-col gap-2 stick top-0 left-0 bg-accent-content/13 skeleton">
        <div className="w-8 h-2 bg-base-300"></div>
        <div className="w-10 h-2 bg-base-300"></div>
      </nav>
      {/* usersLists */}
      {array.map((number, index) => (
        <div key={index} className="flex items-center gap-1 p-2">
          <div className="skeleton size-12 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      ))}
    </aside>
  );
};
export default SideBarUsersSkeleton;
