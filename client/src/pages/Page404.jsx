import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const history = useHistory();
  useEffect(() => {
    const time = setTimeout(() => {
      history.push("/");
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <div className="textCenter min-h-fullHeight flex-col">
      <h1 className="mb-6">The page you are viewing does not exist.</h1>
      <p>You will be redirected to landing page in 3 seconds.</p>
    </div>
  );
};

export default Page404;
