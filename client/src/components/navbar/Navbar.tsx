import React, { useContext, useEffect, FC } from "react";
import { LinkIcon } from "../UI/link/link-icon/LinkIcon";
import { BtnText } from "../UI/button/btn-text/BtnText";
import { firebaseContext } from "../..";
import style from './Navbar.module.less'
import iTasks from '../../source/icons/bx-calendar-star.svg'

import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const Navbar: FC = () => {

    // const history = useNavigate()

    const links = [
        { name: 'Мои задачи', icon: iTasks, to: '/', type: 'st', disabled: false },
        { name: 'О нас', icon: iTasks, to: '/about', type: 'st', disabled: false }
    ]

    // firebaseContext
    const { auth } = useContext(firebaseContext)
    // Authorization hook firebase
    const [user, loading, error] = useAuthState(auth)

    // HANDLERS Button
    const loginHandler = async () => {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)
    }
    const logoutHandler = async () => {
        const logout = await signOut(auth)
    }



    return (
        <div className={style.container}>
            Navbar
            <div className={style.left}>
                <h2>Xostron</h2>
                {links.map((link, idx) => <LinkIcon key={idx} item={link} />)}
            </div>

            {/* <div className={style.right}>
                {user ?
                    <>
                        <div className={style.child}>
                            <div className={style.tooltipUser}>{user.email}</div>
                            <img className={style.photoUser} src={user.photoURL} alt="photo User"></img>
                        </div>
                        <BtnText onClick={logoutHandler}>
                            Выйти
                        </BtnText>
                        <div className={style.online}></div>

                    </>
                    :
                    <>
                        <BtnText onClick={loginHandler}>
                            Войти
                        </BtnText>
                        <div className={style.offline}></div>
                    </>
                }
            </div> */}
        </div>
    )
}