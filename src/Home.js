import React, { useEffect, useState } from "react";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import Product from "./Product";
import Axios from "./axios";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  color: blue;
`;
// border-width: 5px;

function Home() {
  const [Produc, setProduc] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const response =
    const makeReq = async () => {
      console.log("reghccykgs");
      try {
        setLoading(true);
        const res = await Axios.get("/product");
        if (!res) {
          console.log("wahala wa");
        }
        console.log("res" + res.data.message);
        // setLoading(true);
        setLoading(false);
        setProduc(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    makeReq();
    return () => {
      makeReq();
    };
  }, []);
  // console.log(`this is the prod array: ${Produc}`);
  // const { title, image, price, rating } = Produc;
  return (
    <div className="home">
      <ToastContainer />
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="contain">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              {/* <p> Loading.....</p> */}
              <ScaleLoader
                loading={loading}
                css={override}
                color="blue"
                width={140}
                radius={2}
                height={10}
              />
            </div>
          ) : (
            <div className="home__row">
              {Produc.map((p) => (
                <Product
                  id={p._id}
                  title={p.title}
                  price={p.price}
                  rating={p.ratings}
                  image={p.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
