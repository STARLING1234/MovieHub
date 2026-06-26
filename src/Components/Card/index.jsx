import React from 'react'
import './index.scss'

export const Card = ({ children, onClick }) => {
    return (
        <div className='card' onClick={onClick}>
            {children}
        </div>
    )
}

export const CardTitle = ({ title }) => {
    return (
        <div className='card-title'>
            {title}
        </div>
    )
}

export const CardImage = ({ image, alt }) => {
    return (
        <img src={image} alt={alt} />
    )
}

export const CardDesc = ({ desc }) => {
    return (
        <div className='card-desc'>
            {desc}
        </div>
    )
}


