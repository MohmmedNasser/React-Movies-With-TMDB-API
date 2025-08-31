import { Github, Linkedin } from "lucide-react";
import ReactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <footer className="pt-10 md:pt-15 pb-5 mt-15 bg-neutral-900">
            <div className="container">
                <div className="flex items-start gap-8 md:gap-2 flex-col md:flex-row justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <img
                                src="/logo.svg"
                                alt="Filmagnet Logo"
                                className="size-9"
                            />
                            <span className="font-semibold text-lg">
                                Filmagnet
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.linkedin.com/in/mohammed-nasser93"
                                target="_blank"
                                title="Linkedin"
                            >
                                <Github className="text-neutral-400 hover:text-white transition size-5" />
                            </a>
                            <a
                                href="https://github.com/MohmmedNasser"
                                target="_blank"
                                title="Github"
                            >
                                <Linkedin className="text-neutral-400 hover:text-white transition size-5" />
                            </a>
                            <a
                                href="https://vercel.com"
                                target="_blank"
                                title="Vercel"
                            >
                                <img
                                    src="/vercel.svg"
                                    alt="vercel Logo"
                                    width="150"
                                    height="auto"
                                />
                            </a>
                        </div>
                    </div>
                    <ul className="flex items-center space-x-4 lg:space-x-10 text-sm md:self-center">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-primary transition duration-300"
                                onClick={scrollTop}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/movies"
                                className="hover:text-primary transition duration-300"
                                onClick={scrollTop}
                            >
                                Movies
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shows"
                                className="hover:text-primary transition duration-300"
                                onClick={scrollTop}
                            >
                                TV Shows
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/people"
                                className="hover:text-primary transition duration-300"
                                onClick={scrollTop}
                            >
                                People
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <p className="mb-5 flex items-center gap-3 w-max text-12 text-neutral-400">
                            <span>Made with</span>
                            <a href="https://react.dev/" target="_blank">
                                <img
                                    src={ReactLogo}
                                    alt="React Logo"
                                    loading="lazy"
                                    className="w-7"
                                />
                            </a>
                        </p>
                        <p className="flex items-center gap-3 w-max text-12 text-neutral-400">
                            <span>Data provided by</span>
                            <a
                                href="https://www.themoviedb.org/"
                                target="_blank"
                            >
                                <img
                                    src="/tmdb.svg"
                                    alt="themoviedb Logo"
                                    loading="lazy"
                                    className="w-25"
                                />
                            </a>
                        </p>
                    </div>
                </div>
                <p className="text-12 text-center text-neutral-400 mt-8 md:mt-5">
                    This project uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
