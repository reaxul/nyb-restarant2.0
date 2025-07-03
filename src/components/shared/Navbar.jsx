import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets";
 
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
 
 

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Info", path: "/info" },
    { label: "Menu", path: "/menu" },
    // { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Cart", path: "/cart" },
  ];

  const authItems = user
    ? [
        ...(user.role === "admin" ? [{ label: "Dashboard", path: "/dashboard" }] : []),
        { label: "My Profile", path: "/profile" },
        { label: "Logout", onClick: handleLogout },
      ]
    : [
        { label: "Login", path: "/login" },
        // { label: "Sign Up", path: "/signup" },
      ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="md:h-24 hidden md:flex items-center bg-black text-gray-200 font-babas-neue sticky top-0 z-50 shadow-lg">
        <div className="flex w-full justify-between px-8 items-center max-w-7xl mx-auto">
          <Link to={"/"} className="transition-transform hover:scale-105">
            <img className="w-20" src={assets.logo || "/placeholder.svg"} alt="logo" />
          </Link>
          <ul className="flex font-semibold text-2xl space-x-8 uppercase justify-between">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link 
                  to={item.path}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
            {authItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.onClick ? (
                  <button 
                    onClick={item.onClick}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link 
                    to={item.path}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="relative w-full md:hidden bg-black text-gray-200 font-babas-neue sticky top-0 z-50 shadow-lg">
        <div className="flex w-full justify-between px-6 py-4 items-center">
          <Link to={"/"} className="z-20">
            <img className="w-16" src={assets.logo || "/placeholder.svg"} alt="logo" />
          </Link>

          <button
            onClick={() => setShowNav(!showNav)}
            className="z-20 p-2 focus:outline-none"
            aria-label={showNav ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  showNav ? 'rotate-45 top-2' : 'top-0'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-white top-2 transition-opacity duration-300 ${
                  showNav ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  showNav ? '-rotate-45 top-2' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out z-10 ${
            showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className={`flex flex-col items-center justify-center h-full transition-transform duration-300 ${
            showNav ? 'translate-y-0' : '-translate-y-10'
          }`}>
            <ul className="flex flex-col items-center space-y-6 text-2xl uppercase">
              {navItems.map((item) => (
                <li key={item.label} className="relative">
                  <Link 
                    to={item.path}
                    className="hover:text-white transition-colors duration-200 py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {authItems.map((item) => (
                <li key={item.label} className="relative">
                  {item.onClick ? (
                    <button 
                      onClick={item.onClick}
                      className="hover:text-white transition-colors duration-200 py-2"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link 
                      to={item.path}
                      className="hover:text-white transition-colors duration-200 py-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
