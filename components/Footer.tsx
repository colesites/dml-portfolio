import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const links = [
    {
      href: "https://github.com/colesites",
      src: "/github.png",
      alt: "github image",
    },
    {
      href: "https://x.com/DamolaAderibig1",
      src: "/x.png",
      alt: "x image",
    },
    {
      href: "https://www.linkedin.com/in/aderibigbe-damola-ba6b41195/",
      src: "/linkedin.png",
      alt: "linkedin image",
    },
    {
      href: "https://www.instagram.com/",
      src: "/ig.png",
      alt: "ig image",
    },
  ];
  return (
    <footer className="flex py-10 px-10 md:px-20 justify-between">
      <div>
        <p>© {new Date().getFullYear()}. All rights reserved.</p>
      </div>

      <div className="flex items-center gap-3">
        {links.map(({ href, src, alt }) => (
          <Link key={alt} href={href} className="z-[900]">
            <Image src={src} alt={alt} width={20} height={20} />
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
