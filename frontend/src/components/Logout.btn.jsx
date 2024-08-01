import React from "react";
import { logoutUser } from "../api/user.api";

export default function LogOutBtn(){

    const handelLogout= async()=>{

    }
    return (
        <>
            <button
            onClick={handelLogout}
            >
                logout
            </button>
        </>
    )
}