import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const { user, signInWithGoogle, logout } = useAuth();

    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.log("errr", err);
        }
    };
    // console.log(user);

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
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-3 text-sm">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `text-white transition px-3 py-2 rounded-full relative  before:absolute before:start-0 before:-bottom-[1px] before:w-full before:bg-transparent before:h-[10%] before:-z-10 before:rounded-sm before:transition-all before:duration-400 hover:before:transition-all hover:before:bg-primary! ${
                                                isActive
                                                    ? "before:bg-primary! hover:before:h-full! before:h-[50%]!"
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
                                            `text-white transition px-3 py-2 rounded-full relative  before:absolute before:start-0 before:-bottom-[1px] before:w-full before:bg-transparent before:h-[10%] before:-z-10 before:rounded-sm before:transition-all before:duration-400 hover:before:transition-all hover:before:bg-primary! ${
                                                isActive
                                                    ? "before:bg-primary! hover:before:h-full! before:h-[50%]!"
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
                                            `text-white transition px-3 py-2 rounded-full relative  before:absolute before:start-0 before:-bottom-[1px] before:w-full before:bg-transparent before:h-[10%] before:-z-10 before:rounded-sm before:transition-all before:duration-400 hover:before:transition-all hover:before:bg-primary! ${
                                                isActive
                                                    ? "before:bg-primary! hover:before:h-full! before:h-[50%]!"
                                                    : ""
                                            }`
                                        }
                                    >
                                        TV Shows
                                    </NavLink>
                                </li>
                                <li className="text-neutral-600">|</li>
                                <li>
                                    <NavLink
                                        to="/people"
                                        className={({ isActive }) =>
                                            `text-white transition px-3 py-2 rounded-full relative  before:absolute before:start-0 before:-bottom-[1px] before:w-full before:bg-transparent before:h-[10%] before:-z-10 before:rounded-sm before:transition-all before:duration-400 hover:before:transition-all hover:before:bg-primary! ${
                                                isActive
                                                    ? "before:bg-primary! hover:before:h-full! before:h-[50%]!"
                                                    : ""
                                            }`
                                        }
                                    >
                                        People
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center gap-5">
                            <Link to="/search">
                                <Search className="size-5" />
                            </Link>

                            {user && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    user?.photoURL ??
                                                    "/default-avatar.png"
                                                }
                                            />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="!mt-2">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                navigate("/watchlist")
                                            }
                                        >
                                            Watchlist
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logout}>
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                            {!user && (
                                <Button
                                    variant="outline"
                                    className="rounded-full cursor-pointer"
                                    onClick={handleGoogleLogin}
                                >
                                    Sign In
                                </Button>
                            )}

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="link"
                                        className="!p-0 flex md:hidden"
                                    >
                                        <Menu className="size-6 text-white/90" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle></SheetTitle>
                                        <SheetDescription asChild>
                                            <ul className="flex flex-col items-start space-y-5 mt-10">
                                                <li>
                                                    <SheetClose asChild>
                                                        <Link
                                                            to="/"
                                                            className="text-lg text-white"
                                                        >
                                                            Home
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                                <li>
                                                    <SheetClose asChild>
                                                        <Link
                                                            to="/movies"
                                                            className="text-lg text-white"
                                                        >
                                                            Movies
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                                <li>
                                                    <SheetClose asChild>
                                                        <Link
                                                            to="/shows"
                                                            className="text-lg text-white"
                                                        >
                                                            TV Shows
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                                <li>
                                                    <SheetClose asChild>
                                                        <Link
                                                            to="/movies"
                                                            className="text-lg text-white"
                                                        >
                                                            Movies
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                                <li>
                                                    <SheetClose asChild>
                                                        <Link
                                                            to="/people"
                                                            className="text-lg text-white"
                                                        >
                                                            People
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                            </ul>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
