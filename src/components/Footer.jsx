import React from "react";

function Footer() {
  return (
    <footer className=" text-pandaBlack dark:text-pandaWhite border-t border-lightGray dark:border-slateGray">
      <div className="justify-items-center ps-9 w-6xl mx-auto px-6 py-10 align-i grid grid-cols-1 md:grid-cols-3 gap-8 text-sm bg-white bg-cover dark:bg-zinc-900">
        <div>
          <h3 className="text-xl font-bold mb-2 ">PillPanda</h3>
          <p className="text-slateGray dark:text-lightGray">
            Find medicines fast. Nearby availability, real-time updates, and
            reliable pharmacies — all in one place.
          </p>
        </div>

        <div className="flex flex-col space-y-2 ">
          <h4 className="font-semibold mb-1">Quick Links</h4>
          <a href="#" className="hover:text-pandaRed">
            Home
          </a>
          <a href="#about" className="hover:text-pandaGreen">
            About
          </a>
          <a href="#" className="hover:text-pandaBlue">
            Login
          </a>
          <a href="#" className="hover:text-slate-400">
            Sign Up
          </a>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold mb-1">Contact</h4>
          <p className="text-slateGray dark:text-lightGray">
            pillpanda.support@gmail.com
          </p>
          <div className="flex space-x-4 mt-2">
            {/* <a href="#"><img src="/twitter.svg" alt="Twitter" className="h-5 w-5 hover:opacity-75" /></a>
        <a href="#"><img src="/instagram.svg" alt="Instagram" className="h-5 w-5 hover:opacity-75" /></a>
        <a href="#"><img src="/github.svg" alt="GitHub" className="h-5 w-5 hover:opacity-75" /></a> */}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between ps-4 bg-pandaWhite dark:bg-pandaBlack pe-3 text-end py-4 text-xs text-slateGray dark:text-lightGray border-t border-lightGray dark:border-slateGray">
        <p>Made with TailWindCSS🤍.</p> <p>&copy; 2025 PillPanda. All rights reserved.</p>  
        </div>
      </div>
    </footer>
  );
}

export default Footer;
