// libraries
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className="header">
      <a href="#" className="header-logo " onClick={() => router.push("/")}>
        <img src="/img/linq-logo.svg" alt="" />
      </a>
      <div className="burger-menu">
        <img src="/img/burger-menu.svg" alt="" />
      </div>
    </header>
  );
};

export default Navbar;
