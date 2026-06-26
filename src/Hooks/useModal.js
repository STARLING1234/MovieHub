import React, { useCallback, useState } from 'react'

const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
    });

    const handleClose = useCallback(() => {
        setIsOpen(false);
    });

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    });

    return {isOpen, handleOpen, handleClose, handleToggle}
}

export default useModal
