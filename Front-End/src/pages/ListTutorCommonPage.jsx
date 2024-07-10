import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout/Layout.jsx";
import {
  faPhone,
  faLocationDot,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { PUBLIC_ROUTER } from "src/constants/RouterConstant.js";
import { Link } from "react-router-dom";

function ListTutorCommon() {
  return (
    <Layout isHomePage={true}>
      <div className="container p-20 flex justify-around flex-wrap">
        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Duy</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>06565465484</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>06565465484</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Le Dung</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0322656892</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0322656892</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Chinh Khuong Duy</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0365062443</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0365062443</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/5 border bg-zinc-900 m-4">
          <Link to={PUBLIC_ROUTER.TUTOR_DETAIL}>
            <img
              src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="text-white p-6">
              <div className="flex items-center">
                <p className="text-2xl">Nguyen Van A</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                <p>0987654321</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="mr-3" />
                <p>Đại học</p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationDot} className="mr-3" />
                <p>0987654321</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default ListTutorCommon;
