import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../molecules/SearchBar";
import Button from "../../tw_components/atoms/Buttons";
import { useRecoilState, useRecoilValue } from "recoil";
import UserMenu from "../molecules/UserMenu";
import { userMenuState } from "../../recoil/userMenuState";
import { userState } from "../../recoil/userState";
import DarkmodeBtn from "../molecules/DarkmodeBtn";
import { darkModeState } from "../../recoil/darkmode";
import { FaRegBell } from "react-icons/fa6";
import { cn } from "../../utils/cn";
import { No_Profile } from "../../images";
import { FaBars } from "react-icons/fa6";
import MenuBar from "../molecules/MenuBar";
import { mobileMenuState } from "../../recoil/mobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(userMenuState);
  const [{ user }] = useRecoilState(userState);
  const [mobileMenu, setMobileMenu] = useRecoilState(mobileMenuState);
  const navigate = useNavigate();
  const darkMode = useRecoilValue(darkModeState);

  const toggleUserMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleSearch = async (query) => {
    try {
      navigate(`/search/1?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.log(`error :`, error);
    }
  };

  return (
    <>
      <div
        className={cn(
          "sticky flex flex-row items-center justify-between ",
          "w-[100%] h-[80px]",
          "top-0 border-b z-30 bg-white",
          "tablet:justify-between",
          darkMode ? "dark" : ""
        )}
      >
        <div
          className={cn(
            "w-[40%] flex flex-row items-center gap-11 px-6",
            "note:flex-row note:w-[45%]",
            "tablet:flex-col tablet:w-[33%]",
            "mobile:w-[65%]"
          )}
        >
          <Link
            to={"/"}
            className="tablet:text-3xl mobile:text-3xl font-logo text-4xl text-accent-blue"
          >
            Stacker-Labs
          </Link>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div
          className={cn(
            "flex flex-row justify-around items-center",
            "note:w-[30%]",
            "tablet:gap-4 tablet:p-2 tablet:w-[50%]"
          )}
        >
          {user?.role === "ADMIN" && (
            <Link to={"/admin"}>
              <Button variant={"white"} size={"md"}>
                Admin
              </Button>
            </Link>
          )}
          {user?.id && (
            <Link to={"/boards"}>
              <Button variant={"white"} size={"md"}>
                Create Post
              </Button>
            </Link>
          )}
          {user?.id ? (
            <Link to={"/auth/logout"}>
              <Button variant={"white"} size={"md"} className={"mobile:hidden"}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to={"/auth"}>
              <Button variant={"white"} size={"md"} className={"mobile:hidden"}>
                Login
              </Button>
            </Link>
          )}
          {!user?.id && (
            <Link to={"/auth/register"}>
              <Button variant={"white"} size={"md"} className={"mobile:hidden"}>
                Sign Up
              </Button>
            </Link>
          )}
          <DarkmodeBtn />
          <button>
            <FaRegBell className="text-2xl dark:text-white mobile:hidden" />
          </button>
          {user?.id && (
            <img
              onClick={toggleUserMenu}
              className="w-[40px] h-[40px] rounded-3xl cursor-pointer"
              src={user?.image || No_Profile}
              alt=""
            />
          )}
          {
            <FaBars
              onClick={toggleMenu}
              className="hidden mobile:inline-block mobile:text-2xl mobile:mx-5"
            />
          }
          {mobileMenu && (
            <MenuBar
              user={user}
              handleSearch={handleSearch}
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          )}
        </div>
      </div>

      {menuOpen && <UserMenu user={user} />}
    </>
  );
};

export default Header;
