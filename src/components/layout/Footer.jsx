import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer className="fixed-bottom bg-dark text-center mt-3">
        <p className="text-light ">&copy; Máster en React js - </p>

        <a
          className="text-light"
          target="_blank"
          href="https://victorroblesweb.es"
        >
          victorroblesweb.es
        </a>
      </footer>
    </div>
  );
};
