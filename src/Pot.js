import './App.css';
import React, { useState, useRef, useEffect } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import { ReactComponent as Twitter } from './icons/twitter.svg';
import { ReactComponent as Facebook } from './icons/facebook.svg';
import { ReactComponent as Github } from './icons/github.svg';
import { ReactComponent as Instagram } from './icons/instagram.svg';
import { ReactComponent as Linkedin } from './icons/linkedin.svg';
import { useParams } from "react-router-dom"


function FadeInSection(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

function FadeInSection2(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section2 ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

function FadeInSection3(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section3 ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

function Pot() {

    const [nav, setNav] = useState()
    const [bg, setBg] = useState()

    const { name } = useParams()
    console.log(name)

    const words = [
        'I am a Software Developer',
        'I am an Editor',
        'I am a Data Analyst',
    ]

    const changeNavBg = () => {
        // console.log(window.scrollY)
        if (window.scrollY <= 500) {
            setBg({ backgroundColor: "#fba92c" })
        }
        else if (window.scrollY <= 1000) {
            setBg({ backgroundColor: "#565656" })
        }
        else if (window.scrollY <= 1500) {
            setBg({ backgroundColor: "#9e9e9e" })
        }
        else {
            setBg({ backgroundColor: "white", color: 'black' })
        }
    }


    const handleClick = (event) => {
        setNav(event.target.href.substr(22))
    }

    window.addEventListener("scroll", changeNavBg)

    return (
        <div className="App" style={bg}>
            <nav className="nav-wrapper">
                <ul className="nav" style={bg}>
                    <li>
                        <a href="#home" onClick={handleClick} className={nav === "#home" ? "active" : ""}>Home</a>
                    </li>
                    <li>
                        <a href="#career" onClick={handleClick} className={nav === "#career" ? "active" : ""}>Career</a>
                    </li>
                    <li>
                        <a href="#project" onClick={handleClick} className={nav === "#project" ? "active" : ""}>Project</a>
                    </li>
                    <li>
                        <a href="#contact" onClick={handleClick} className={nav === "#contact" ? "active" : ""}>Contact</a>
                    </li>
                </ul>
            </nav>
            <div className="main">
                <div className="home" id="home">
                    <div className="image">
                        <FadeInSection2>
                            <img src={require('./good1.svg').default} alt="PIC" />
                        </FadeInSection2>
                    </div>
                    <div className="home-text">
                        <FadeInSection>
                            <h3>
                                Badassou Mawuli
                            </h3>
                            <div>
                                <TypeWriterEffect
                                    textStyle={{
                                        fontFamily: 'Red Hat Display',
                                        color: '#f4d47c',
                                        fontWeight: 500,
                                        fontSize: '2.0em',
                                    }}
                                    startDelay={2000}
                                    cursorColor="red"
                                    multiText={words}
                                    multiTextDelay={2000}
                                    typeSpeed={30}
                                    hideCursorAfterText={true}
                                />
                            </div>
                        </FadeInSection>
                    </div>
                </div>
                <div className="career" id="career">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 style={{ borderBottom: '1px solid black' }}>Career</h3>
                    </div>
                    <div className="career-c">
                        <div className="education">
                            <FadeInSection2>
                                <h3>EDUCATION</h3>
                                <ul>
                                    <li>West Africa SHS -{">"} 2015 - 2018</li>
                                    <li>University Of Ghana -{">"} 2019 - 2023</li>
                                </ul>
                            </FadeInSection2>
                        </div>
                        <div className="work">
                            <FadeInSection>
                                <h3>WORK</h3>
                                <ul>
                                    <li>Intern at 4th-IR -{">"} 2022 - 2023</li>
                                </ul>
                            </FadeInSection>
                        </div>
                        <div className="awards">
                            <FadeInSection2>
                                <h3>AWARDS</h3>
                            </FadeInSection2>
                        </div>
                        <div className="skills">
                            <FadeInSection>
                                <h3>SKILLS</h3>
                                <ul>
                                    <li>Python Programing</li>
                                </ul>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
                <div className="project" id="project">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 style={{ borderBottom: '1px solid black' }}>Project</h3>
                    </div>
                    <div className="project-c">
                        <FadeInSection3>
                            <div className="card border-dark mb-3" style={{ maxWidth: "80%", height: "100%" }}>
                                <a href="#project" style={{ textDecoration: "none" }}>
                                    <div className="card-header" style={{ color: "black" }}>Header1</div>
                                    <div className="card-body text-dark">
                                        <h5 className="card-title">Dark card title</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </a>
                            </div>
                        </FadeInSection3>
                        <FadeInSection3>
                            <div className="card border-dark mb-3" style={{ maxWidth: "80%", height: "100%" }}>
                                <div className="card-header" style={{ color: "black" }}>Header2</div>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">Dark card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </FadeInSection3>
                        <FadeInSection3>
                            <div className="card border-dark mb-3" style={{ maxWidth: "80%", height: "100%" }}>
                                <div className="card-header" style={{ color: "black" }}>Header3</div>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">Dark card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </FadeInSection3>
                        <FadeInSection3>
                            <div className="card border-dark mb-3" style={{ maxWidth: "80%", height: "100%" }}>
                                <div className="card-header" style={{ color: "black" }}>Header4</div>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">Dark card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </FadeInSection3>
                    </div>
                </div>
                <div className="contact" id="contact">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 style={{ borderBottom: '1px solid black' }}>Contact</h3>
                    </div>
                    <div className="contact-c">
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <label>Email:</label>
                            <input type="email" style={{ width: "80%", height: 40 }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <label>Title:</label>
                            <input type="text" style={{ width: "80%", height: 40 }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <label>Message:</label>
                            <textarea type="text" style={{ width: "80%", height: 100 }} />
                        </div>
                    </div>
                    <div className="send">
                        <button title="Send" >Send</button>
                    </div>
                    <div className="social">
                        <div className="handles">
                            <a><span className='icon-button'><Linkedin /></span></a>
                        </div>
                        <div className="handles">
                            <a><span className='icon-button'><Github /></span></a>
                        </div>
                        <div className="handles">
                            <a><span className='icon-button'><Twitter /></span></a>
                        </div>
                        <div className="handles">
                            <a><span className='icon-button'><Facebook /></span></a>
                        </div>
                        <div className="handles">
                            <a><span className='icon-button'><Instagram /></span></a>
                        </div>
                    </div>
                </div>
                <div>
                    <footer>
                        Copyright 2021 {"BM Portfolio"}
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Pot;
