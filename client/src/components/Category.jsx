
const Category = ({ name, image }) => {
  return (
    <div className="flex flex-col gap-2 justify-center p-2">
      <div className="img rounded-full overflow-hidden h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28">
        <img src={image} alt={name} className="h-full w-full object-cover"/>
      </div>
      <div className="name text-center text-sm font-semibold sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">{name}</div>
    </div>
  );
};

export default Category;
