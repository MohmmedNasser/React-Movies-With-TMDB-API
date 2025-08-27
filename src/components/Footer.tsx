import { Github, Linkedin } from "lucide-react";
import ReactLogo from "../assets/react.svg";

const Footer = () => {
    return (
        <footer className="pt-15 pb-5 mt-15 bg-neutral-900">
            <div className="container">
                <div className="flex items-start gap-2 flex-wrap justify-between">
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
                    <div>
                        <p className="my-5 flex items-center gap-3 w-max text-12 text-neutral-400">
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

                        <p className="my-5 flex items-center gap-3 w-max text-12 text-neutral-400">
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
                <p className="text-12 text-center text-neutral-400 mt-5">
                    This project uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
