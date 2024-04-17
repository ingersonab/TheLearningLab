import React, {useState} from 'react'
import '../../App.css';
import Slideshow from '../Slideshow';
import HeroSection from '../HeroSection';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function  Homepage() {
    return (
        <div className="homepage-container">
            <HeroSection/>
            <div className="cards_and_header_container">
                <h2>Add competition in the classroom using our gaming features!</h2>
                <div className="card_container">
                    <Card sx={{ maxWidth: 400 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="125"
                            image={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/coursePreview.jpeg')}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Create Courses
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Create a virtual classroom with all of your students!
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="125"
                            image="/static/images/cards/contemplative-reptile.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Interactive Games
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Select from a vast library of games and customize them with your content!
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="125"
                            image="/static/images/cards/contemplative-reptile.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                Scoreboard Tracking
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Track student progress and encourage healthy competition with the scoreboard! 
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="slideshow-container">
                <Slideshow/>
            </div>
        </div>
    )
}

export default Homepage;