
import { useEffect, useRef } from "react"
import Navbar from "../../components/Navbar/Navbar"
import './Abouts.css'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


const About = () => {


    

    const pageRef = useRef<HTMLDivElement | null>(null)
    const expRef = useRef<HTMLDivElement | null>(null)
    const missionRef = useRef<HTMLDivElement | null>(null)
 
    useEffect( () => {
        
        const pageTimeout = setTimeout( () => {

            pageRef.current?.classList.add('pageLoad')

        }, 800)
        
        const expTimeout = setTimeout( () => {

            expRef.current?.classList.add('fadeDirection')

        }, 1200)

        const missionTimeout = setTimeout( () => {

            missionRef.current?.classList.add('fadeDirection')

        }, 1500)


        return () => {
            clearTimeout(pageTimeout)
            clearTimeout(expTimeout)
            clearTimeout(missionTimeout)
        }

    }, [])


    return (

        <div>
            <header>
                <Navbar />
            </header>


            <section >
                <div  ref={pageRef} className="about--us--container">
                    <div>
                        <h1>Hi, </h1>

                        <div className="about--us--intro ">
                            <p>
                                We are a team of proficient CAD modellers with extensive experience in the aerospace industry. 
                                Our journey began with a shared vision of providing high-quality CAD modelling services to meet the specific needs of MSME engineering firms. 
                                We understand the critical importance of precision, reliability, and excellence in engineering design, 
                                which is why our community-based CAD modelling service agency is dedicated to delivering top-notch solutions.
                            </p> 
                        </div>
                    </div>

                    <div className="pointer--container">
                        <div className="about--us--pointer first" ref={expRef}>
                            <div className="expertise--icons">
                                <h2>Our</h2>
                                <h2>Expertise</h2>
                            </div>
                            <p>
                                We bring a wealth of knowledge and technical expertise to every project. 
                                Our team is adept at handling complex modelling tasks, ensuring that each design is not only accurate but also optimized for performance and manufacturability. 
                                We leverage the latest CAD tools and technologies to create models that meet the highest standards of quality and precision.
                            </p> 
                        </div>

                        <div className="about--us--pointer second" ref={missionRef}>
                            <p>
                                Our mission is to empower MSME engineering firms by providing them with reliable, 
                                high-quality CAD modelling services. We strive to be a trusted partner that our clients can rely on for all their design needs, 
                                allowing them to focus on innovation and growth while we handle the intricacies of CAD modelling.</p> 
                            <div className="mission--icons">
                                <h2>Our</h2>
                                <h2>Mission</h2>
                            </div>
                        </div>

                    </div>

                    <div className="socials--container"> 
                        <div className="team--container">
                                <h2>Our Team</h2>

                                <p>Yuvraj Singh Baishya &nbsp;&nbsp;&nbsp; <a target="_blank" ><FaInstagram /></a> &nbsp; <a target="_blank" ><FaLinkedinIn /></a></p>
                                <p>Saransh Gupta &nbsp;&nbsp;&nbsp; <a target="_blank" ><FaLinkedinIn /></a> </p>
                        </div>

                        <div className="dev--container">
                            <h2>Developed by <p>Prasoon Upadhyay &nbsp;&nbsp;&nbsp; <a target="_blank" ><FaLinkedinIn /></a> &nbsp; <a target="_blank" ><FaGithub /></a>  </p>  </h2>
                        </div>
                    </div>
  
                </div>

            </section>
        </div>
    )
}

export default About