const Footer = () => {
  return (
    <>
      <nav class="bg-white shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div class="flex justify-between items-center">
            <a
              class="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              href="#"
            >
              Brand
            </a>
          </div>
          <div className="flex justify-between">
            <div className="mx-20">
              <h2 className="font-bold">Stack Frontend</h2>
              <ul>
                <li>Js</li>
                <li>React</li>
                <li>Tailwind</li>
              </ul>
            </div>
            <div  className="mx-20">
              <h2 className="font-bold">Stack Backend</h2>
              <ul>
                <li>.Net</li>
                <li>asp .Net Core</li>
                <li>PostgreSql</li>
              </ul>
            </div>
            <div  className="mx-20">
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
