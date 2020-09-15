import React, {useEffect, useState} from 'react';
import '../assets/css/main.css'
import ReactPlayer from "react-player";

import {CardDeck,Card} from 'react-bootstrap'
import {Weather} from './index'
import {MDBBtn} from 'mdbreact'
import {Link} from 'react-router-dom'
import axios from "axios";
const Main = () => {
    const [articlesList, setArticlesList] = useState([]);
    useEffect(() => {
        axios
            .get(`http://ip/articles/list`)
            .then(({data}) => {
                setArticlesList(data.list.slice(0,3));
            })
            .catch(error => {
                throw error;
            });
    }, []);
    const [img, setImg] =useState('')
    return (
        <>
            <main className="masthead">
                <div className="intro-text">
                    <div className="intro-lead-in">이사 견적,</div>
                    <div className="intro-lead-in">내 방에서 알아보세요!</div>
                </div>
                <Weather/>
            </main>
            <div className="video-bg">
                <ReactPlayer
                    className="video"
                    url = 'https://www.youtube.com/watch?v=fKBYdv4s20k'
                    width = '900px'
                    height = '650px'
                    playing controls/>
            </div>
            <main className="masthead">
                <div className="intro-text">
                    <div className="intro-heading text-uppercase">방문 없이 견적짜는</div><br/>
                    <Link to={"/type"}> <MDBBtn color="amber" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" >이사하러 가기
                    </MDBBtn></Link>
                </div>
            </main>
            <main className="masthead">
                <div className="intro-text">
                    <div className="intro-heading text-uppercase">후기 및 사례</div>
                </div>
                <CardDeck className="mainCard" >
                    {articlesList.map((item,i) => (
                        <Card>
                            <Card.Img variant="top" src={img} />
                            <Card.Body>
                                <Card.Text>
                                    {item.title}
                                </Card.Text>
                                <Card.Text>
                                    {item.contents}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{item.regDate}</small>
                            </Card.Footer>
                        </Card>
                    ))}
                </CardDeck>
            </main>
        </>
    );
};
export default Main;