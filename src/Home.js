import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import './style.css'
import { ReactComponent as HomeLogo } from './logo.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(false)
    const [data, setData] = useState({
        "title": [],
        "Project": [],
        "Career": [],
        "Award": [],
        "Work": [],
        "Skill": [],
    })
    const [mail, setMail] = useState("")
    const [verifyEmail, setVerifyEmail] = useState(false)
    const [emails, setEmails] = useState()
    const [valid, setValid] = useState(false)

    const messageEmail = useRef()
    const messageTitle = useRef()
    const messageBody = useRef()

    let titleRef = useRef()
    let projectTitle = useRef()
    let projectTool = useRef()
    let projectDes = useRef()
    let projectLink = useRef()
    let careerTitle = useRef()
    let careerStart = useRef()
    let careerEnd = useRef()
    let awardTitle = useRef()
    let awardLoc = useRef()
    let awardYear = useRef()
    let workTitle = useRef()
    let workStart = useRef()
    let workEnd = useRef()
    let skill = useRef()
    let email = useRef()
    let username = useRef()
    let name = useRef()
    let github = useRef()
    let facebook = useRef()
    let instagram = useRef()
    let linkedin = useRef()
    let twitter = useRef()
    const [projectError, setProjectError] = useState("")
    const [careerError, setCareerError] = useState("")
    const [awardError, setAwardError] = useState("")
    const [workError, setWorkError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

    async function getEmails() {
        const response = await axios.get('https://portfolio-api-production-df67.up.railway.app/user/email', {
            headers: {
                'accept': 'application/json'
            }
        });

        setEmails(response.data.result);
    }


    useEffect(() => {
        getEmails()
        if (!!localStorage.getItem("param")) {
            const t = JSON.parse(localStorage.getItem('param'))
            setData(prevData => {
                return { ...prevData, ...t.parameter.data }
            })
            email.current.value = t.parameter.email
            username.current.value = t.parameter.username
            name.current.value = t.parameter.name
            github.current.value = t.parameter.socials.github
            facebook.current.value = t.parameter.socials.facebook
            instagram.current.value = t.parameter.socials.instagram
            linkedin.current.value = t.parameter.socials.linkedin
            twitter.current.value = t.parameter.socials.twitter
        }
    }, [])


    useEffect(() => {
        titleRef.current.value = "";
        projectTitle.current.value = "";
        projectTool.current.value = "";
        projectDes.current.value = "";
        projectLink.current.value = "";
        careerTitle.current.value = "";
        careerStart.current.value = "";
        careerEnd.current.value = "";
        awardTitle.current.value = "";
        awardLoc.current.value = "";
        awardYear.current.value = "";
        workTitle.current.value = "";
        workStart.current.value = "";
        workEnd.current.value = "";
        skill.current.value = "";

        if (localStorage.getItem("param") === undefined) {
            localStorage.setItem('param', JSON.stringify({
                "parameter": {
                    "name": name.current.value,
                    "email": email.current.value,
                    "username": username.current.value,
                    "socials": {
                        "github": github.current.value,
                        "linkedin": linkedin.current.value,
                        "twitter": twitter.current.value,
                        "instagram": instagram.current.value,
                        "facebook": facebook.current.value
                    },
                    "data": data
                }
            }))
        } else {
            if (data.title?.length !== 0 | data.Award?.length !== 0 | data.Career?.length !== 0 | data.Project?.length !== 0) {
                localStorage.setItem('param', JSON.stringify({
                    "parameter": {
                        "name": name.current.value,
                        "email": email.current.value,
                        "username": username.current.value,
                        "socials": {
                            "github": github.current.value,
                            "linkedin": linkedin.current.value,
                            "twitter": twitter.current.value,
                            "instagram": instagram.current.value,
                            "facebook": facebook.current.value
                        },
                        "data": data
                    }
                }))
            }
        }

    }, [data])



    const handleChange = (e) => {
        setMail(e.target.value)
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        setValid(pattern.test(e.target.value))
    }

    useEffect(() => {
        if (valid) {
            setVerifyEmail(emails?.includes(mail))
        }
    }, [valid, emails, mail])

    async function sendEmail(sender, receiver, title, body) {
        const response = await axios.post(
            'https://portfolio-api-production-df67.up.railway.app/user/send_email',
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

    const handleSendMessage = () => {
        sendEmail(messageEmail.current.value, "mawulibadassou5@gmail.com", messageTitle.current.value, messageBody.current.value)
    }

    const handleClick = () => {
        setToggle(!toggle)
        setToggle1(false)
    }
    const handleClick1 = () => {
        setToggle1(!toggle1)
        setToggle(false)
    }

    const addTitle = () => {
        if (titleRef.current.value !== "") {
            setData(prevData => {
                const updatedTitle = prevData.title ? prevData.title.concat(titleRef.current.value) : [titleRef.current.value];
                return { ...prevData, title: updatedTitle };
            })
        }
    }


    const delTitle = index => {
        setData(prevData => {
            return { ...prevData, title: prevData.title.filter((_, i) => i !== index) }
        })
    }

    const addSkill = () => {
        if (skill.current.value !== "") {
            setData(prevData => {
                return { ...prevData, Skill: prevData.Skill ? prevData.Skill.concat(skill.current.value) : [skill.current.value] }
            })
        }
    }

    const delSkill = index => {
        setData(prevData => {
            return { ...prevData, Skill: prevData.Skill.filter((_, i) => i !== index) }
        })
    }

    const addProject = () => {
        if (projectTool.current.value !== "" && projectTitle.current.value !== "" && projectDes.current.value !== "") {
            setData(prevData => {
                const updatedProject = {
                    "tool": projectTool.current.value,
                    "title": projectTitle.current.value,
                    "desc": projectDes.current.value,
                    "link": projectLink.current.value
                };
                const updatedProjects = prevData.Project ? prevData.Project.concat(updatedProject) : [updatedProject];
                return { ...prevData, Project: updatedProjects };
            })
            setProjectError("")
        } else {
            setProjectError("Fill All Inputs")
        }
    }


    const delProject = index => {
        setData(prevData => {
            return { ...prevData, Project: prevData.Project.filter((_, i) => i !== index) }
        })
    }

    const addCareer = () => {
        if (careerTitle.current.value !== "" && careerStart.current.value !== "" && careerEnd.current.value !== "") {
            setData(prevData => {
                const updatedCareer = prevData.Career ? prevData.Career.concat({
                    "title": careerTitle.current.value,
                    "start": careerStart.current.value,
                    "end": careerEnd.current.value
                }) : [{
                    "title": careerTitle.current.value,
                    "start": careerStart.current.value,
                    "end": careerEnd.current.value
                }];
                return {
                    ...prevData,
                    Career: updatedCareer
                }
            });
            setCareerError("");
        } else {
            setCareerError("Fill All Inputs");
        }
    }


    const delCareer = index => {
        setData(prevData => {
            return { ...prevData, Career: prevData.Career.filter((_, i) => i !== index) }
        })
    }


    const addAward = () => {
        if (awardTitle.current.value !== "" && awardLoc.current.value !== "" && awardYear.current.value !== "") {
            setData(prevData => {
                const updatedAward = prevData.Award ? prevData.Award.concat({
                    "title": awardTitle.current.value,
                    "loc": awardLoc.current.value,
                    "year": awardYear.current.value
                }) : [{
                    "title": awardTitle.current.value,
                    "loc": awardLoc.current.value,
                    "year": awardYear.current.value
                }];
                return { ...prevData, Award: updatedAward };
            })
            setAwardError("");
        } else {
            setAwardError("Fill All Inputs");
        }
    }


    const delAward = index => {
        setData(prevData => {
            return { ...prevData, Award: prevData.Award.filter((_, i) => i !== index) }
        })
    }

    const addWork = () => {
        if (workTitle.current.value !== "" && workStart.current.value !== "" && workEnd.current.value !== "") {
            setData(prevData => {
                const updatedWork = prevData.Work ? prevData.Work.concat({
                    "title": workTitle.current.value,
                    "start": workStart.current.value,
                    "end": workEnd.current.value
                }) : [{
                    "title": workTitle.current.value,
                    "start": workStart.current.value,
                    "end": workEnd.current.value
                }];
                return { ...prevData, Work: updatedWork };
            });
            setWorkError("");
        } else {
            setWorkError("Fill All Inputs");
        }
    };


    const delWork = index => {
        setData(prevData => {
            return { ...prevData, Work: prevData.Work.filter((_, i) => i !== index) }
        })
    }

    const code = useRef()


    async function createUser(p) {
        try {
            const response = await axios.post('https://portfolio-api-production-df67.up.railway.app/user/create', p, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                if (response.data.status === "OK") {
                    toast.success('Site Created Successfully !\n - Check Your Mail For The Link\n - Check Spam If not in Inbox', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                    getEmails()
                    setVerifyEmail(true)
                    setLoading(false)

                } else {
                    toast.info('Build Failed !\n - Check Your Internet\n - Check Your Details !', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error(error);
            toast.info('Build Failed !\n - Check Your Internet\n - Check Your Details !', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
            setLoading(false)
        }
    }


    async function updateUser(p) {
        try {
            const response = await axios.post('https://portfolio-api-production-df67.up.railway.app/user/update', p, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                if (response.data.status === "OK") {
                    toast.success('Site Updated Successfully !\n - Check Your Mail For The Link\n - Check Spam If not in Inbox', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                    getEmails()
                    setVerifyEmail(true)
                    setLoading1(false)

                } else if (response.data.status === "error") {
                    toast.info('Update Failed !\n - Wrong Secret Code', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                    setLoading1(false)
                } else {
                    toast.info('Update Failed !\n - Check Your Internet\n - Check Your Details !', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                    setLoading1(false)
                }
            }
        } catch (error) {
            console.error(error);
            toast.info('Update Failed !\n - Check Your Internet\n - Check Your Details !', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
            setLoading1(false)
        }
    }

    async function fixDetailsIn(data) {
        if (!!data) {
            name.current.value = data.name
            username.current.value = data.username
            github.current.value = data.socials.github
            facebook.current.value = data.socials.facebook
            twitter.current.value = data.socials.twitter
            instagram.current.value = data.socials.instagram
            linkedin.current.value = data.socials.linkedin
            setData(data.data)
        }
    }


    async function getUser(email, code) {
        try {
            console.log(code)
            const response = await axios.get(`https://portfolio-api-production-df67.up.railway.app/user/${email}/${code}`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!!response.data) {
                if (response.data.status === "OK") {
                    toast.success('Detail Fetched Successfully !', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });

                    fixDetailsIn(response.data.result)

                    getEmails()
                    setVerifyEmail(true)

                } else if (response.data.status === "error") {
                    toast.info('Fetch Data Failed !\n - Wrong Secret Code', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                } else {
                    toast.info('Details Fetch Failed !\n - Check Your Internet\n - Check Your Details !', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                }
            }
        } catch (error) {
            console.error(error);
            toast.info('Details Fetch Failed !\n - Check Your Internet\n - Check Your Details !', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
        }
    }

    const fetchData = () => {
        if (code.current.value !== "") {
            getUser(email.current.value, code.current.value)
        } else {
            toast.info('Enter The Secret Code', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        setLoading1(true)
        const parameter = {
            "parameter": {
                "name": name.current.value,
                "email": email.current.value,
                "username": username.current.value,
                "socials": {
                    "github": github.current.value,
                    "linkedin": linkedin.current.value,
                    "twitter": twitter.current.value,
                    "instagram": instagram.current.value,
                    "facebook": facebook.current.value
                },
                "data": data,
                "code": code.current.value
            }
        }

        updateUser(parameter)
    }

    const handleBuild = (e) => {
        e.preventDefault()
        setLoading(true)
        const parameter = {
            "parameter": {
                "name": name.current.value,
                "email": email.current.value,
                "username": username.current.value,
                "socials": {
                    "github": github.current.value,
                    "linkedin": linkedin.current.value,
                    "twitter": twitter.current.value,
                    "instagram": instagram.current.value,
                    "facebook": facebook.current.value
                },
                "data": data
            }
        }
        createUser(parameter)

    }


    return (
        <div className='App'>
            <nav className="nav-wrapper" style={{ backgroundColor: '#565656' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a className="logo" href="#home"><HomeLogo /></a>
                    <ul className="nav">
                        <li className='not-lo'>
                            <a href="#about">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='main'>
                <div className='home-home' id='home'>
                    <div className='button'>
                        <button className="btn btn-primary" onClick={handleClick} >
                            Get Started
                        </button>
                        <button className="btn btn-primary" onClick={handleClick1} >
                            Edit Portfolio
                        </button>
                    </div>
                    <div className={toggle ? 'collapse show' : 'collapse'} >
                        <form>
                            <div className='data'>
                                <div>
                                    <p className="heads">Personal Info</p>
                                    <div className='form'>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Email:</label>
                                            <input type="email" ref={email} onChange={handleChange} value={mail} style={{ width: "80%", height: 30 }} />
                                            {!valid & mail.length > 0 ? "Invalid" : ""} {verifyEmail ? "Email Already Exist" : ""}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Username:</label>
                                            <input type="text" ref={username} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Full Name:</label>
                                            <input type="text" ref={name} style={{ width: "80%", height: 30 }} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Socials</p>
                                    <div className='form'>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Github:</label>
                                            <input type="email" ref={github} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Linkedin:</label>
                                            <input type="text" ref={linkedin} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Twitter:</label>
                                            <input type="text" ref={twitter} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Facebook:</label>
                                            <input type="text" ref={facebook} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Instagram:</label>
                                            <input type="text" ref={instagram} style={{ width: "80%", height: 30 }} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Title</p>
                                    <div className='form1'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Profession:</label>
                                                    <input type="text" ref={titleRef} style={{ width: "90%", height: 30 }} placeholder='I am a Doctor' />
                                                </div>
                                                <button type='button' className="btn btn-secondary" style={{ width: "2%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                    title="eg. I am an Editor" >
                                                    !
                                                </button>
                                                <button type='button' onClick={addTitle} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.title ? data.title.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 30, fontSize: '90%' }}>
                                                                {t}
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delTitle(index)}>X</span>
                                                            </li>
                                                        )
                                                    }
                                                    ) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Skills</p>
                                    <div className='form1'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Skill:</label>
                                                    <input type="text" ref={skill} style={{ width: "90%", height: 30 }} placeholder='Java Programing' />
                                                </div>
                                                <button type='button' className="btn btn-secondary" style={{ width: "2%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                    title="eg. Python Programing" >
                                                    !
                                                </button>
                                                <button type='button' onClick={addSkill} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Skill ? data.Skill.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 30, fontSize: '90%' }}>
                                                                {t}
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delSkill(index)}>X</span>
                                                            </li>
                                                        )
                                                    }
                                                    ) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Project</p>
                                    <div className='form2'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Main Tool:</label>
                                                    <input type="text" ref={projectTool} style={{ width: "90%", height: 30 }} placeholder='React' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={projectTitle} style={{ width: "90%", height: 30 }} placeholder='Image Generator' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Descriptiion:</label>
                                                    <textarea type="text" ref={projectDes} style={{ width: "90%", height: 60 }} placeholder='Generate Images for free' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Link:</label>
                                                    <input type="text" ref={projectLink} style={{ width: "90%", height: 30 }} placeholder='Optional' />
                                                </div>
                                                <div style={{ color: 'red' }}>{projectError}</div>
                                                <button type='button' onClick={addProject} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Project ? data.Project.map((t, index) => {
                                                        return (
                                                            <li key={index} title={`${t.desc}`} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.tool}</div>
                                                                    {t.title}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delProject(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Education</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={careerTitle} style={{ width: "90%", height: 30 }} placeholder='University Of Ghana' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Start Date:</label>
                                                    <input type="date" ref={careerStart} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>End Date:</label>
                                                    <input type="date" ref={careerEnd} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ color: 'red' }}>{careerError}</div>
                                                <button type='button' onClick={addCareer} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Career ? data.Career.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.start + " to " + t.end}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delCareer(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Work</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={workTitle} style={{ width: "90%", height: 30 }} placeholder='Intern at Google' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Start Date:</label>
                                                    <input type="date" ref={workStart} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>End Date:</label>
                                                    <input type="date" ref={workEnd} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ color: 'red' }}>{workError}</div>
                                                <button type='button' onClick={addWork} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {data.Work ? data.Work.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.start + " to " + t.end}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delWork(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Awards</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={awardTitle} style={{ width: "90%", height: 30 }} placeholder='Bsc. Computer Science' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Location</label>
                                                    <input type="text" ref={awardLoc} style={{ width: "90%", height: 30 }} placeholder='University Of Ghana' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Year:</label>
                                                    <input type="number" ref={awardYear} min="1900" max={`${new Date().getFullYear()}`} step="1" style={{ width: "90%", height: 30 }} placeholder='2019' />
                                                </div>
                                                <div style={{ color: 'red' }}>{awardError}</div>
                                                <button type='button' onClick={addAward} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Award ? data.Award.map((t, index) => {
                                                        return (
                                                            <li key={index} title={`${t.year}`} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.loc}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delAward(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {valid & !verifyEmail ? <button type='submit' onClick={handleBuild} className="btn btn-primary" style={{ width: "20%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                    >{loading ? <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : "Build Site"}</button> : <button type='submit' onClick={handleBuild} className="btn btn-primary" style={{ width: "20%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                        disabled    >Build Site</button>}

                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={toggle1 ? 'collapse show' : 'collapse'} id="getinfo">
                        <form>
                            <div className='data'>
                                <div>
                                    <p className="heads">Personal Info</p>
                                    <div className='form'>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Email:</label>
                                            <input type="email" ref={email} onChange={handleChange} value={mail} style={{ width: "80%", height: 30 }} />
                                            {!valid & mail.length > 0 ? "Invalid" : ""} {!verifyEmail ? "Email Does Not Exist" : ""}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Secret Code:</label>
                                            <input type="password" ref={code} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            {valid | verifyEmail ? <button type='button' onClick={fetchData} className="btn btn-primary" style={{ width: "50%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                            >Fetch Data</button> :
                                                <button type='button' onClick={fetchData} className="btn btn-primary" style={{ width: "50%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                    disabled >Fetch Data</button>}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Username:</label>
                                            <input type="text" ref={username} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Full Name:</label>
                                            <input type="text" ref={name} style={{ width: "80%", height: 30 }} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Socials</p>
                                    <div className='form'>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Github:</label>
                                            <input type="email" ref={github} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Linkedin:</label>
                                            <input type="text" ref={linkedin} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Twitter:</label>
                                            <input type="text" ref={twitter} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Facebook:</label>
                                            <input type="text" ref={facebook} style={{ width: "80%", height: 30 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'column' }}>
                                            <label>Instagram:</label>
                                            <input type="text" ref={instagram} style={{ width: "80%", height: 30 }} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Title</p>
                                    <div className='form1'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Profession:</label>
                                                    <input type="text" ref={titleRef} style={{ width: "90%", height: 30 }} placeholder='I am a Doctor' />
                                                </div>
                                                <button type='button' className="btn btn-secondary" style={{ width: "2%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                    title="eg. I am an Editor" >
                                                    !
                                                </button>
                                                <button type='button' onClick={addTitle} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.title ? data.title.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 30, fontSize: '90%' }}>
                                                                {t}
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delTitle(index)}>X</span>
                                                            </li>
                                                        )
                                                    }
                                                    ) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Skills</p>
                                    <div className='form1'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Skill:</label>
                                                    <input type="text" ref={skill} style={{ width: "90%", height: 30 }} placeholder='Java Programing' />
                                                </div>
                                                <button type='button' className="btn btn-secondary" style={{ width: "2%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                    title="eg. Python Programing" >
                                                    !
                                                </button>
                                                <button type='button' onClick={addSkill} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Skill ? data.Skill.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 30, fontSize: '90%' }}>
                                                                {t}
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delSkill(index)}>X</span>
                                                            </li>
                                                        )
                                                    }
                                                    ) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Project</p>
                                    <div className='form2'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Main Tool:</label>
                                                    <input type="text" ref={projectTool} style={{ width: "90%", height: 30 }} placeholder='React' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={projectTitle} style={{ width: "90%", height: 30 }} placeholder='Image Generator' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Descriptiion:</label>
                                                    <textarea type="text" ref={projectDes} style={{ width: "90%", height: 60 }} placeholder='Generate Images for free' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Link:</label>
                                                    <input type="text" ref={projectLink} style={{ width: "90%", height: 30 }} placeholder='Optional' />
                                                </div>
                                                <div style={{ color: 'red' }}>{projectError}</div>
                                                <button type='button' onClick={addProject} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Project ? data.Project.map((t, index) => {
                                                        return (
                                                            <li key={index} title={`${t.desc}`} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '70%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.tool}</div>
                                                                    {t.title}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delProject(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Education</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={careerTitle} style={{ width: "90%", height: 30 }} placeholder='University Of Ghana' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Start Date:</label>
                                                    <input type="date" ref={careerStart} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>End Date:</label>
                                                    <input type="date" ref={careerEnd} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ color: 'red' }}>{careerError}</div>
                                                <button type='button' onClick={addCareer} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Career ? data.Career.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.start + " to " + t.end}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delCareer(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Work</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={workTitle} style={{ width: "90%", height: 30 }} placeholder='Intern at Google' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Start Date:</label>
                                                    <input type="date" ref={workStart} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>End Date:</label>
                                                    <input type="date" ref={workEnd} style={{ width: "90%", height: 30 }} />
                                                </div>
                                                <div style={{ color: 'red' }}>{workError}</div>
                                                <button type='button' onClick={addWork} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Work ? data.Work.map((t, index) => {
                                                        return (
                                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.start + " to " + t.end}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delWork(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="heads">Awards</p>
                                    <div className='form3'>
                                        <div className='form1-section'>
                                            <div style={{ display: "flex", flexDirection: 'column', gap: 15 }}>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Title:</label>
                                                    <input type="text" ref={awardTitle} style={{ width: "90%", height: 30 }} placeholder='Bsc. Computer Science' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Location</label>
                                                    <input type="text" ref={awardLoc} style={{ width: "90%", height: 30 }} placeholder='University Of Ghana' />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                                    <label>Year:</label>
                                                    <input type="number" ref={awardYear} min="1900" max={`${new Date().getFullYear()}`} step="1" style={{ width: "90%", height: 30 }} placeholder='2019' />
                                                </div>
                                                <div style={{ color: 'red' }}>{awardError}</div>
                                                <button type='button' onClick={addAward} className="btn btn-primary" style={{ width: "10%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                                >Add</button>
                                            </div>
                                            <div className='profession-list'>
                                                <ul className="list-group">
                                                    {!!data.Award ? data.Award.map((t, index) => {
                                                        return (
                                                            <li key={index} title={`${t.year}`} className="list-group-item d-flex justify-content-between align-items-center" style={{ width: '80%', marginLeft: 30, height: 60, fontSize: '90%' }}>
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{t.title}</div>
                                                                    {t.loc}
                                                                </div>
                                                                <span className="badge bg-primary rounded-pill" style={{ cursor: 'pointer' }} onClick={() => delAward(index)}>X</span>
                                                            </li>
                                                        )
                                                    }) : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {valid ? <button type='submit' onClick={handleUpdate} className="btn btn-primary" style={{ width: "20%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                    >{loading1 ? <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : "Update Site"}</button> : <button type='submit' onClick={handleUpdate} className="btn btn-primary" style={{ width: "20%", height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                        disabled    >Update Site</button>}

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='about' id='about'>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Getting Started
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" >
                                <div className="accordion-body">
                                    <strong>Welcome to our portfolio creation website!</strong> To get started, enter a valid email address in the provided field.<br />

                                    Make sure to enter a correct email address that you have access to. While providing additional information is recommended, it's not compulsory. However, this information can help us better serve your needs.<br />

                                    If the email address you've entered is already in use, you won't be able to use it to create a new account. Each account must have a unique email address associated with it. If you encounter this error message, try using a different email address or contact our customer support for assistance.<br />

                                    After entering a valid email address, you can begin building your portfolio. Once you've created your portfolio, you can access it at any time without needing to log in.<br />

                                    To start creating your portfolio, simply follow the instructions and prompts. When you're ready to publish your portfolio, click the "Build site" button and your portfolio will be live for the world to see!<br />

                                    <em>In summary, to get started with our portfolio creation website, enter a valid email address. Providing additional information is optional, but it can help us better serve your needs. If the email address is already in use, use a different one or contact customer support. Once you've entered a valid email address, follow the instructions to create your portfolio. When you're ready to publish your portfolio, click the "Build site" button and your portfolio will be live for the world to see!</em>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Edit Portfolio
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" >
                                <div className="accordion-body">
                                    <strong>To update your portfolio site</strong>, you'll need to have the email address you used to create the site, as well as the secret code that was sent to you upon creation.<br />

                                    Once you have those details, simply load your account using the "Fetch Data" button on the Update Portfolio Tab site on the website. From there, you can update your portfolio, change your bio, add new projects, or make any other changes you'd like.<br />

                                    Remember to keep your secret code safe and secure, as it serves as an important security measure to ensure that only you have access to your account. If you've lost your secret code, you can request a new one by contacting our customer support team.<br />

                                    We're excited to see the amazing updates you'll make to your portfolio site! If you have any questions or need assistance, don't hesitate to reach out to our support team.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Note
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" >
                                <div className="accordion-body">
                                    As part of our efforts to provide you with top-notch security, we utilize local storage to securely store your data. However, if you suspect that your secret code has been compromised, we strongly recommend that you update your portfolio to generate a new one.<br />

                                    In case you encounter any problems or have any questions about our site, please do not hesitate to contact us by sending an email. We value your feedback and look forward to hearing from you.<br />

                                    Please note that our website is still under development and we are constantly working to improve it. We appreciate your patience and understanding as we continue to refine our platform.
                                </div>
                            </div>
                        </div>
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
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
