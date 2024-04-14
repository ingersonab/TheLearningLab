import React, {useState, useEffect, useRef} from 'react';
import './Slideshow.css';

const images = [require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/bloxorzpic..jpg'),
                require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/flappybirdpic.jpg'),
                require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/triviapic2.jpg')];
const delay = 5000;

function Slideshow(){
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout(){
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return(
        <div className="slideshow">
            <div className="slideshowSlider"
            style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}
            >
                {images.map((imageUrl, index) => (
                    <img 
                        className="slide" 
                        key={index} 
                        src={imageUrl}
                        alt={`Slide ${index + 1}`}
                    />
                ))}  
            </div>

            <div className="slideshowDots">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`slideshowDot${index === idx ? " active" : " "}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>

            <h2>Education through a growing selection of review games!</h2>
        </div>
    )
}

export default Slideshow;