import React, {useEffect, useRef, useState} from "react";
import s from "./Header.module.scss";
import sub from "../../img/icon_profile.svg";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import cn from "clsx";
import Navigation from "../Navigation/Navigation";
import { useOnClickOutside } from "usehooks-ts";
import Modal from "../UI/ModalWindow/Modal";

function Header() {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        modalRef.current = document.getElementById("modal-log-in") as HTMLDialogElement | null;
    }, []); // Run this effect only once when the component mounts
    const ref = useRef(null);

    const [openMenu, setOpenMenu] = useState(false);

    const openModal = () => {
        console.log(modalRef)
        console.log('opened')
        modalRef.current?.showModal();
    };


    const handleClickOutside = () => {
        setOpenMenu(false);
    };
    useOnClickOutside(ref, handleClickOutside);
    return (
        <header>
            <Modal id="modal-log-in"/>
            <h1 className={s.h1}>Brooklyn Public Library</h1>
            <div className={s.nav_wrapper}>
                <Navigation />
            </div>
            <div className={s.menu_wrapper}>
                <div className={s.menu_icons}>
                    <div className={s.header_icon}  onClick={openModal}>
                        <img src={sub} alt="icon" />
                    </div>
                    {openMenu ? (
                        <RxCross1
                            className={s.cross}
                            onClick={() => {
                                setOpenMenu(false);
                            }}
                        />
                    ) : (
                        <RxHamburgerMenu
                            className={s.hamburger}
                            onClick={() => {
                                setOpenMenu(true);
                            }}
                        />
                    )}
                </div>{" "}
            </div>{" "}
            <div
                ref={ref}
                className={cn(s.menu, { [s.opened]: openMenu }, { [s.closed]: !openMenu })}
            >
                <Navigation />
            </div>
        </header>
    );
}

export default Header;
