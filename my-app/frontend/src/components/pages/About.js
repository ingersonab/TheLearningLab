import React, {useState} from 'react'
import '../../App.css';
import './About.css';

function  About() {
    return (
       <>
            
            <div className="divHead">
                <center>   
                    <img src="https://res.cloudinary.com/ddzdc3usr/image/upload/LearningLabLogo.jpg" alt="Learning Lab Logo" className="small-image" />
                </center> 
                <header>
                    <center>
                        <h1>About The Learning Lab</h1>
                    </center>
                </header>
            </div>
            
            <body>
                <div className="divBody">
                    <main>
                        <center>
                            <section>
                                <h2>The Motivation</h2>
                                <p>In the modern age, technology is very prominent in schools across the United States. This technology is being used for a variety of uses, such as virtual classrooms,
                                learning management systems, collaboration, and more. These programs are useful for fostering student engagement. One of the main challenges of k-12 teachers is keeping
                                students attentive and motivated to learn. This can be solved by making the learning environment more fun. Our application, The Learning Lab, can help with that. The Learning
                                Lab offers a variety of games for teachers to choose from that they can customize with their classroom content. These include: ordering games, matching games, drag and drop, a
                                quiz maker, and more. The teacher can create a "classroom" and add all of his or her students to this classroom to share these review games with them. Each student will have
                                a profile, and as they successfully complete games, they will gain achievements. A gamified form of learning will help educators make the classroom more fun and engaging for students.
                                <br />
                                <br />
                                The motivation behind creating The Learning Lab was to create a more efficient teaching aid for educators and to help create a better learning environment for students. The method
                                that all schools use to teach has not changed. Although technology has been implemented into schools, students still have to sit for hours on end listening to an educator droning on.
                                Educators on the other hand see their students not giving their full attention and know that a student may be doing something else on their devices. Research done on the theory of
                                Gamified Learning shows that group participation and grades can improve student learning. The use of leaderboards can boost student activity and natural competitive nature.  It
                                also allows students and teachers to close that generational gap between them.
                                <br />
                                <br />
                                The Learning Lab was proposed to be a new and highly efficient gamified website that could top already existing gamified learning applications. The intent was to have an easy navigable
                                and age-appropriate site that would keep students involved and stay motivated to do their best on their courses.
                                </p>
                            </section>

                            <section>
                                <h2>Our Team</h2>
                                <img src="https://res.cloudinary.com/ddzdc3usr/image/upload/f_auto,q_auto/TheDevelopers" alt="An image of the developers." className="small-image" />
                                <p>We are a team of college seniors at the Virginia Military Institute who came up with the idea for this site as our Capstone project. From left to right is Audrey Barbaza,
                                Victoria Wright, and Alyssa Ingerson. With Alyssa as the team leader and main web developer, Audrey as the main game developer, and Victoria as the main researcher/scribe,
                                the team worked hard for almost a year to have The Learning Lab functional and usable.
                                <br />
                                <br />
                                Audrey is a 21-year-old developer that loves games that have a plot and good music. She has experience working with C#, Python, Java, JavaScript, and HTML. She has had less than a
                                year of experience creating games using C# in Unity Engine. Lots of her inspiration comes from all of the gamified sites we all used growing up including Cool Math Games. In her
                                free time, she dabbles in combat sports!
                                <br />
                                <br />
                                Alyssa is a 22-year-old full-stack developer who enjoys building websites that are easy to use and appealing to the eye. 
                                She was inspired to build this website because of her dad who is a public school teacher who is looking for alternatives to the current options in the gamified learning world. 
                                Alyssa hopes to continue to express her creativity through web development in the future!
                                <br />
                                <br />
                                Victoria is a 22-year-old IT "fix-it" computer technician who enjoys gaming, reading, and adventuring with friends. While proficient in Java, HTML, and C++, this project was the
                                first attempt at building games in Unity, though she has aspirations of continuing to build more and better games in the future.
                                </p>
                            </section>
                        </center>
                    </main>

                    <footer>
                        <p>&copy; 2024 The Learning Lab. All Rights Reserved.</p>
                    </footer>
                </div>
            </body>
        </>
    );
    
}

export default About;