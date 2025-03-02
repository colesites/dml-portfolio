"use client"

import Link from "next/link";

const NavBar = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="link-style">
          <Link href="/">Home</Link>
        </ul>
        <ul className="link-style">
          <Link href="#about" >About</Link>
        </ul>
        <ul className="link-style">
          <Link href="#projects">Projects</Link>
        </ul>
        <ul  className="link-style">
          <Link href="#contact">Contact</Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;