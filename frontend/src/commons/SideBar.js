import React from 'react';
import '../assets/css/main.css'

const SideBar = () => {
    return (
        <>
        <nav className="sidebar sidebar-offcanvas">
            <ul className="nav">
                <li className="nav-item nav-category"><h1>게시판</h1></li>
                <li className="nav-item">
                    <a className="nav-link" href="/market">
                        <span className="menu-title">중고 게시판</span>
                    </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/review">
                        <span className="menu-title">후기</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/videocommunity">
                        <span className="menu-title">내방 견적 의뢰</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/application">
                        <span className="menu-title">App</span>
                    </a>
                </li>
            </ul>
        </nav>
        </>
    );
};

export default SideBar;