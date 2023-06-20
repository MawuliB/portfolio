import './App.css';
import React, { useState, useRef, useEffect } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import { ReactComponent as Twitter } from './icons/twitter.svg';
import { ReactComponent as Facebook } from './icons/facebook.svg';
import { ReactComponent as Github } from './icons/github.svg';
import { ReactComponent as Instagram } from './icons/instagram.svg';
import { ReactComponent as Linkedin } from './icons/linkedin.svg';
import { useParams } from "react-router-dom"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function FadeInSection3(props, key) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div key={key}
            className={`fade-in-section3 ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

function Pot() {

    const generalLink = "https://portfolio-pi93.onrender.com/"
    const [nav, setNav] = useState()
    const [bg, setBg] = useState()
    const [data, setData] = useState({
        "title": [],
        "Project": [],
        "Career": [],
        "Award": [],
    })
    const [available, setAvailable] = useState(false)
    const [words, setWords] = useState([])
    const [fname, setFname] = useState()
    const [socials, setSocials] = useState({
        "github": "",
        "twitter": "",
        "linkedin": "",
        "facebook": "",
        "instagram": ""
    })
    const [email, setEmail] = useState()
    const messageEmail = useRef()
    const messageTitle = useRef()
    const messageBody = useRef()

    const [mail, setMail] = useState("")
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(true)

    const { name } = useParams()


    useEffect(() => {
        async function getUser() {
            setLoading(true)
            try {
                const response = await axios.get(`${generalLink}user/${name}`, {
                    headers: {
                        'accept': 'application/json'
                    }
                });

                if (!!response.data) {
                    if (response.data.status === "OK") {
                        setData(response.data.result.data)
                        setAvailable(true)
                        setLoading(false)
                        setWords(response.data.result.data.title)
                        setFname(response.data.result.name)
                        setSocials(response.data.result.socials)
                        setEmail(response.data.result.email)
                    } else if (response.data.status === "error") {
                        setLoading(false)
                        setAvailable(false)
                    }
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
                setAvailable(false)
            }
        }
        getUser()
    }, [name])

    async function sendEmail(sender, receiver, title, body) {
        const response = await axios.post(
            `${generalLink}user/send_email`,
            '',
            {
                params: {
                    sender: sender,
                    receiver: receiver,
                    title: title,
                    body: body
                },
                headers: {
                    'accept': 'application/json'
                }
            }
        );

        if (!!response.data) {
            if (response.data.status === "OK") {
                toast.success('Message Sent', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar'
                });
                messageTitle.current.value = ""
                messageBody.current.value = ""
            }
        }
    }

    const handleChange = (e) => {
        setMail(e.target.value)
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        setValid(pattern.test(e.target.value))
    }

    const handleSendMessage = () => {
        sendEmail(messageEmail.current.value, email, messageTitle.current.value, messageBody.current.value)
    }


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
        setNav(event.target.href.substr(53))
    }

    const handleReload = () => {
        window.location.reload();
    }

    window.addEventListener("scroll", changeNavBg)

    return (
        <div className="App" style={bg}>{available ?
            <><nav className="nav-wrapper">
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
                                    {fname}
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
                                        hideCursorAfterText={true} />
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                    <div className="career" id="career">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h3 style={{ borderBottom: '1px solid black' }}>Career</h3>
                        </div>
                        <div className="career-c">
                            {!!data.Career & data.Career?.length !== 0 ? <div className="education">
                                <FadeInSection2>
                                    <h3>EDUCATION</h3>
                                    <ul>
                                        {data.Career.map((t, index) => {
                                            return (

                                                <li key={index}>{t.title} {"from "} {t.start} {"to "} {t.end}</li>
                                            );
                                        }
                                        )}
                                    </ul>
                                </FadeInSection2>
                            </div> : ""}
                            {!!data.Work & data.Work?.length !== 0 ? <div className="work">
                                <FadeInSection>
                                    <h3>WORK</h3>
                                    <ul>{data.Work.map((t, index) => {
                                        return (

                                            <li key={index}>{t.title} {"from "} {t.start} {"to "} {t.end}</li>

                                        );
                                    }
                                    )}
                                    </ul>
                                </FadeInSection>
                            </div> : ""}
                            {!!data.Award & data.Award?.length !== 0 ? <div className="awards">
                                <FadeInSection2>
                                    <h3>AWARDS</h3>
                                    <ul>
                                        {data.Award.map((t, index) => {
                                            return (

                                                <li key={index}>{t.title} {"at "} {t.loc} {"in "} {t.year}</li>
                                            );
                                        }
                                        )}
                                    </ul>
                                </FadeInSection2>
                            </div> : ""}
                            {!!data.Skill & data.Skill?.length !== 0 ? <div className="skills">
                                <FadeInSection>
                                    <h3>SKILLS</h3>
                                    <ul>
                                        {data.Skill.map((t, index) => {
                                            return (
                                                <li key={index}>{t}</li>
                                            );
                                        }
                                        )}
                                    </ul>
                                </FadeInSection>
                            </div> : ""}
                        </div>
                    </div>
                    <div className="project" id="project">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h3 style={{ borderBottom: '1px solid black' }}>Project</h3>
                        </div>
                        <div className="project-c">
                            {!!data.Project ? data.Project.map((t, index) => {
                                return (
                                    <FadeInSection3 key={index}>
                                        <div className="card border-dark mb-3" style={{ maxWidth: "80%", height: "100%" }}>
                                            <a href={t.link} style={{ textDecoration: "none" }}>
                                                <div className="card-header" style={{ color: "black" }}>{t.tool}</div>
                                                <div className="card-body text-dark">
                                                    <h5 className="card-title">{t.title}</h5>
                                                    <p className="card-text">{t.desc}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </FadeInSection3>
                                );
                            }
                            ) : ""}
                        </div>
                    </div>
                    <div className="contact" id="contact">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h3 style={{ borderBottom: '1px solid black' }}>Contact</h3>
                        </div>
                        <div className="contact-c">
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <label>Email:</label>
                                <input ref={messageEmail} type="email" onChange={handleChange} value={mail} style={{ width: "80%", height: 40 }} />
                                {!valid & mail.length > 0 ? "Invalid" : ""}
                            </div>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <label>Title:</label>
                                <input ref={messageTitle} type="text" style={{ width: "80%", height: 40 }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <label>Message:</label>
                                <textarea ref={messageBody} type="text" style={{ width: "80%", height: 100 }} />
                            </div>
                        </div>
                        <div className="send">
                            {valid ? <button title="Send" onClick={handleSendMessage}>Send</button> :
                                <button title="Send" onClick={handleSendMessage} disabled>Send</button>}
                        </div>
                        <div className="social">
                            {socials.linkedin !== "" ? <div className="handles">
                                <a href={socials.linkedin}><span className='icon-button'><Linkedin /></span></a>
                            </div> : ""}
                            {socials.github !== "" ? <div className="handles">
                                <a href={socials.github}><span className='icon-button'><Github /></span></a>
                            </div> : ""}
                            {socials.twitter !== "" ? <div className="handles">
                                <a href={socials.twitter}><span className='icon-button'><Twitter /></span></a>
                            </div> : ""}
                            {socials.facebook !== "" ? <div className="handles">
                                <a href={socials.facebook}><span className='icon-button'><Facebook /></span></a>
                            </div> : ""}
                            {socials.instagram !== "" ? <div className="handles">
                                <a href={socials.instagram}><span className='icon-button'><Instagram /></span></a>
                            </div> : ""}
                        </div>
                    </div>
                    <div>
                        <footer>
                            Copyright 2021 {"BM Portfolio"}
                        </footer>
                    </div>
                </div><ToastContainer /></> : ""} {loading ? <><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div></> : ""
            } {!available & !loading ? <><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p><h1>Page Does Not Exist</h1>
                </p>
                <p>Or <button onClick={handleReload}>Reload</button> Once, If Not, Page Does Not Really Exist</p>
            </div></> : ""}
        </div>
    );
}

export default Pot;
