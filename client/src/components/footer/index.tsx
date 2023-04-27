import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
    return (
        <div className="text-center py-5 bg-gray-800">
            <ul className="flex justify-center list-none p-0 m-0">
                <li className="mx-3">
                    <a href="https://github.com/mfalicoff" target="_blank" className="block mb-3">
                        <Image src="/icons/github-icon.svg" alt="github" width="28" height="29" />
                    </a>
                </li>
                <li className="mx-3">
                    <a href="https://gitlab.com/mazilious" target="_blank" className="block mb-3">
                        <Image src="/icons/gitlab-icon.svg" alt="github" width="40" height="30" />
                    </a>
                </li>
                <li className="mx-3">
                    <a
                        href="https://twitter.com/mazilious007"
                        target="_blank"
                        className="block mb-3"
                    >
                        <Image src="/icons/twitter-icon.svg" alt="nextjs" width="28" height="28" />
                    </a>
                </li>
                <li className="mx-3">
                    <a
                        href="https://www.linkedin.com/in/maximiliano-falicoff-a20418195/"
                        target="_blank"
                        className="block mb-3"
                    >
                        <Image
                            src="/icons/linkedin-icon.svg"
                            alt="linkedin"
                            width="28"
                            height="32"
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};
