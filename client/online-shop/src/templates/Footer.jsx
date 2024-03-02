const Footer = () => {
  return (
    <>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3  sm:flex justify-between items-center">
          <div className="flex justify-between items-center mb-20 sm:mb-0">
            <a
              className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              href="#"
            >
              Brand
            </a>
          </div>
          <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-2/4 ">
            <div className="">
              <h2 className="font-bold">Stack Frontend</h2>
              <ul>
                <li>Js</li>
                <li>React</li>
                <li>Tailwind</li>
              </ul>
            </div>
            <div  className="">
              <h2 className="font-bold">Stack Backend</h2>
              <ul>
                <li>.Net</li>
                <li>asp .Net Core</li>
                <li>PostgreSql</li>
              </ul>
            </div>
            <div  className="">
              <h2 className="font-bold">Stack Frontend</h2>
              <ul>
                <li>Js</li>
                <li>React</li>
                <li>Tailwind</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Footer;
