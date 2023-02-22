import React from "react";
import { Link, useMatches } from "react-router-dom";

function Breadcrumb() {
  let matches = useMatches();

  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <nav
      className="flex"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className="inline-flex items-center">
            {index > 0 && <span>/</span>}
            {crumb}
          </li>
        ))}

        {/* <li>
          <div className="flex items-center">
            <span>/</span>
            <Link
              to={`dashboard`}
              className="ml-1 text-sm text-dark-gray hover:text-primary md:ml-2">
              Dashboard
            </Link>
          </div>
        </li> */}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
