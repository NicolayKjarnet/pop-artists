const AboutPage = () => {
  return (
    <div className="container mt-4">
      <h2>About</h2>
      <p>
        Pop Artists API is a RESTful API that provides CRUD operations for pop
        artists. It was built using ASP.NET Core and Entity Framework Core and
        is designed to be simple to use. With this API, users can manage data
        about pop artists with ease and integrate it into their applications.
      </p>
      <p>
        See{" "}
        <a rel="stylesheet" href="http://127.0.0.1:5500/wwwroot/index.html">
          Docs
        </a>{" "}
        for more info on how to use the API.
      </p>
    </div>
  );
};

export default AboutPage;
