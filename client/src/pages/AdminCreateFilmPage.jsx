import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AdminCreateFilmPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  useEffect(() => {
    if (user?.role !== "admin") {
      history.push("/");
    }
  }, []);
  
  return (
    <div className='min-h-fullHeight'>
      This is create new film page.
    </div>
  )
}

export default AdminCreateFilmPage
