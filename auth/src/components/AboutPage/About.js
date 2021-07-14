import React from 'react'
import "./About.css";

function About() {
    return (
        <div className="about-contain">
           <div className="about-title"><h1>About Me</h1></div> 
           <div className="about-main">
                {`
                    Hey! Ever wondered what happens when someone sets out on a journey to learn "Programming" 
                    with no Computer Science background what-so-ever, no curriculum, no Table of Contents, no mentor, no-one to ask
                    your doubts to, just a glut of information to read, tutorials to watch and endless codes on Stack Overflow! 
                    Either you give up after a few hours of tutorials or the whole experience turns into an adrineline pumping pursuit 
                    as you crush one level after another. What I can tell you for sure is, all the talks of "Be passionate about what you do", 
                    "Work Hard, Work Smart", "Do what you Love" start to make a lot of sense.
                    `}
                <br/>
                <br/>
                {`
                    I started learning React Js, actually Javascript itself in October 2020, and thus far I have created this.
                    This portfolio website is designed in such a way that my skills can be exhibited as extensively as possible.
                    My journey here has been an incomparable learning experience. 
                    One of the approaches I followed was - finding out what is to be learnt next in order to solve a particular 
                    problem. Relational Tables, Password Bcrypt, Multer, Cloudinary, using Postman are a few examples of the things I learnt in this way! 
                `}
                <br/>
                <br/>
                {`
                    Other than development itself, on this odyssey, I found myself learning a great deal of perseverance, problem solving skills,
                    patience and realised an uncanny ability to learn whatever I set my mind to. I write this on 18-06-2021, and I dare say
                    I feel absolutely ecstatic with how far I have come!
                `}
                 <br/>
                <br/>
                {`
                    I am Chhavi, a Bachelor of Accounting & Finance, a Graphic Designer, a Content Writer, 
                    a Dancer, a Film Maker and ..*drumroll*.. a Full Stack Web Developer! In the plethora of opportunities
                    the world has to offer, here's me diving right in!
                `}
           </div>
        </div>
    )
}

export default About

