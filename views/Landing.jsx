const React = require("react");
const Layout = require("./Layout");

function Landing() {
  return (
    <Layout title='Landing'>
      <div className="w-screen h-screen flex items-center justify-center flex-col bg-black">
        <div className="bg-blue-500 p-10 leading-10 text-white h-96 w-96 text-center">
          <h1 className="text-3xl font-bold">XTwitter</h1>

          <p>Social Media App</p>
          <a href="/tweets" className="underline">Click here to enter</a>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Landing;
