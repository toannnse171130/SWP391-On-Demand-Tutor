import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { getListWeather } from "../apis/tutor-module";
import { useAppDispatch } from "src/store";
import { hideLoading, showLoading } from "src/store/features/loadingPage";

function CollectionPage() {
  const { slug } = useParams();
  // const [listCountry, setListCountry] = useState();
  // const dispatch = useAppDispatch();

  // useQueries({
  //   queries: [
  //     {
  //       queryKey: ["getListWeather"],
  //       queryFn: async () => {
  //         const response = await getListWeather();
  //         setListCountry(response?.data);
  //         return response?.data;
  //       },
  //     },
  //   ],
  // });
  // const handleOpen = () => {
  //   console.log("Test redux-tooltip line 30");
  //   dispatch(showLoading());

  //   const resetState = setInterval(() => {
  //     dispatch(hideLoading());
  //   }, 2000);
  //   console.log("Test redux-tooltip line 37");
  //   return () => clearInterval(resetState);
  // };
  // const handleClose = () => {
  //   dispatch(hideLoading());
  // };

  const testFetch = async () => {
    const response = await fetch(
      "https://www.myodtsapi.somee.com/api/Authentication/login",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer: 123`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response: ", response);
  };
  useEffect(() => {
    testFetch();
  }, []);

  return (
    <div>
      <div>CollectionPage {slug}</div>
    </div>
  );
}

export default CollectionPage;
