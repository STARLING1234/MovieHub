import React from "react";
import "./index.scss";

const index = () => {

    return (
        <div className="not-found">
            <div className="error-content">

                <h1>
                    4<span>0</span>4
                </h1>

                <h2>
                    Movie Not Found 🎬
                </h2>

                <p>
                    Looks like this page disappeared from the cinema.
                    Let's find some amazing movies instead.
                </p>

                <a href="/">
                    Back To Home
                </a>
            </div>
        </div>
    )
}


export default index;