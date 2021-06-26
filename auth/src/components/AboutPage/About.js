import React from 'react'
import "./About.css";

function About() {
    return (
        <div className="about-contain">
           <div className="about-title"><h1>About Me</h1></div> 
           <div className="about-main">
                {`
                    Hey! Ever wondered what happens when someone sets out on a journey to learn "Programming" 
                    with no Computer Science background what-so-ever, no curriculum, no table of Contents, no mentor, no-one to ask
                    your doubts to, just a glut of information to read, tutorials to watch and infinite hints on Stack Overflow! 
                    What I can tell you for sure is, all the talks of "Be passionate about what you do", 
                    "Work Hard, Work Smart", "Do what you Love" start to make a lot of sense. `}
                <br/>
                <br/>
                {`
                    I started learning React Js, actually Javascript itself in October 2020, and thus far I have created this.
                    My portfolio website that I have tried to make in such a way that a fresher like me can exhibit my skills 
                    as extensively as possible at a single place! My journey here has been an incomparable learning experience. 
                    One of the approaches I followed was - finding out what is to be learnt next in order to solve a particular 
                    problem. Relational Tables, password bcrypt, multer, cloudinary, using Postman are a few examples of the things I learnt in this way!
                    - which made me understand what I read more comprehensively!  
                `}
                <br/>
                <br/>
                {`
                    Other than development istself, on this odyssey, I saw myself display a great deal of perseverance, problem solving skills,
                    patience and an uncanny ability and desire to learn whatever I set my mind to. I write this on 18-06-2021, and I dare say
                    I feel absolutely ecstatic with how far I have come!
                `}
                 <br/>
                <br/>
                {`
                    I am Chhavi, a Bachelor of Accounting & Finance, a Graphic Designer, a Content Writer, 
                    a Dancer, a Film Maker and ..*drumrol*.. a Full Stack Web Developer! In the plethora of opportunities
                    the world has to offer, here's me diving right in!
                `}
           </div>
        </div>
    )
}

export default About

