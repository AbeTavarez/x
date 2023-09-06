const React = require("react");

function Layout({ children, title }) {
  return (
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>{title || ''}</title>
      </head>

      <main>{children}</main>
    </html>
  );
}
module.exports = Layout;