import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const About = () => {
  return (
    <main className="min-h-fullHeight md:px-20 py-10 xl:px-40 px-10 max-w-screen-2xl m-auto flex-col bg-hero-pattern bg-no-repeat bg-right-bottom">
      <h1 className="aboutMeTextStyle text-2xl">
        This project is a student project, and created based on MERN
        stack(Mongodb, Express, React and Nodejs).
      </h1>
      <div className="pl-3">
        <p className="aboutMeTextStyle">
          The idea is to provide a forum for Ghibli films' fans to share their
          most memoriable stories and precious memories about these
          well-produced craftpieces.
        </p>
        <a
          className="aboutMeTextStyle italic underline text-primary transform hover:text-blue-800 duration-150 ease-in-out"
          href="https://www.ghibli.jp/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ghibli Studio - Official Website
        </a>
      </div>

      <h2 className="aboutMeTextStyle mt-20 text-xl">About me:</h2>
      <div className="pl-3">
        <div className="aboutMeTextStyle">
          <span>My name is Shan Mi, you may find me here:</span>
          <a
            className=""
            href="https://www.linkedin.com/in/shan-mi/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AiFillLinkedin className="inline text-2xl text-blue-700 ml-5 mr-3 transform hover:scale-110 duration-150 ease-in-out" />
          </a>
          <a
            className=""
            href="https://github.com/Shan-Mi"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AiFillGithub className="inline text-2xl transform hover:scale-110 duration-150 ease-in-out" />
          </a>
        </div>

        <p className="aboutMeTextStyle">
          I am a frontend developer, and enjoying a lot of learning and creating
          things and solving challenges.
        </p>
        <p className="aboutMeTextStyle">
          Never regret about my new career as a frontend developer.
        </p>
      </div>
    </main>
  );
};

export default About;
