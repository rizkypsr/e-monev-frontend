import React from "react";

function Breadcrumb() {
  return (
    <nav
      className="flex"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm text-dark-gray hover:text-primary">
            e-Monev
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <span>/</span>
            <a
              href="#"
              className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2">
              Dashboard
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
