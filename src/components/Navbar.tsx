import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <>
            <header className="flex items-center absolute top-0 w-full z-10 py-5">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link to="/" className="flex items-center gap-2">
                                <img
                                    src="/logo.svg"
                                    alt="Filmagnet Logo"
                                    className="size-9"
                                />
                                <span className="font-semibold text-lg">
                                    Filmagnet
                                </span>
                            </Link>
                        </div>
                        {/* absolute left-1/2 top-[21px] -translate-x-1/2 z-10 */}
                        <nav className="">
                            <ul className="flex items-center gap-5 text-sm">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `text-white transition hover:text-white/80 px-3 py-2 rounded-full ${
                                                isActive
                                                    ? " bg-primary !hover:text-white"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="text-neutral-600">|</li>
                                <li>
                                    <NavLink
                                        to="/movies"
                                        className={({ isActive }) =>
                                            `text-white transition hover:text-white/80 px-3 py-2 rounded-full ${
                                                isActive
                                                    ? " bg-primary !hover:text-white"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Movies
                                    </NavLink>
                                </li>
                                <li className="text-neutral-600">|</li>
                                <li>
                                    <NavLink
                                        to="/shows"
                                        className={({ isActive }) =>
                                            `text-white transition hover:text-white/80 px-3 py-2 rounded-full ${
                                                isActive
                                                    ? " bg-primary !hover:text-white"
                                                    : ""
                                            }`
                                        }
                                    >
                                        TV Shows
                                    </NavLink>
                                </li>
                                {/* People */}
                            </ul>
                        </nav>
                        <div>
                            <Button
                                variant="outline"
                                className="rounded-full cursor-pointer"
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
