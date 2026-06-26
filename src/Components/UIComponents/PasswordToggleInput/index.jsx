import React, { useState } from 'react'
import './index.css'

const index = ({ name, value, onChange, placeholder }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="password-box auth-input-wrapper">
            <span className="auth-icon">
                <i className="fa-solid fa-lock"></i>
            </span>
            <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                style={{ paddingLeft: '45px', paddingRight: '45px' }}
            />

            <span
                className="eye-icon"
                onClick={togglePassword}
            >
                {
                    showPassword ?
                        <i className="fa-solid fa-eye"></i>
                        :
                        <i className="fa-solid fa-eye-slash"></i>
                }
            </span>
        </div>
    )
}

export default index
