import  { useEffect, useRef } from 'react'
import { gsap } from 'gsap';

import background1 from '../assets/images/background1.jpg';
import background2 from '../assets/images/background2.jpg';
import background3 from '../assets/images/background3.jpg';
import { useCookies } from 'react-cookie';
import { playOrStopThemeSound } from '../helpers/PlayAudio';

export const Intro = () => {
    const [cookies, setCookies] = useCookies(['intro', 'visited']);
    const timeline = gsap.timeline({ repeat: 0 });
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);

    const skipIntro = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(cookies.intro) {
            setCookies('visited', 1, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
            playOrStopThemeSound('stop');
        }
    }

    useEffect(() => {
        timeline
            .fromTo(image1Ref.current, { opacity: 1 }, { opacity: 1, duration: 1 })
            .to(image1Ref.current, { scale: 1.04, duration: 8 }, '-=1') // scale animáció 8 másodperc
            .fromTo(image2Ref.current, { opacity: 0 }, { opacity: 1, duration: 1 })
            .to(image2Ref.current, { scale: 1.04, duration: 8 }, '-=1') // scale animáció 8 másodperc
            .fromTo(image3Ref.current, { opacity: 0 }, { opacity: 1, duration: 1 })
            .to(image3Ref.current, { scale: 1.04, duration: 8 }, '-=1'); // scale animáció 8 másodperc
    }, [timeline]);




    
    if(cookies.visited || cookies.intro !== 1) return null;

    return (
        <>
            <div className='w-screen h-screen fixed top-0 left-0'>
                <div ref={image1Ref} className="h-full w-full absolute z-0 opacity-0">
                    <img src={background1} className="object-cover h-full w-full" alt="Background 1" />
                </div>
                <div ref={image2Ref} className="h-full w-full absolute z-10 opacity-0">
                    <img src={background2} className="object-cover h-full w-full" alt="Background 2" />
                </div>
                <div ref={image3Ref} className="h-full w-full absolute z-20 opacity-0">
                    <img src={background3} className="object-cover h-full w-full" alt="Background 3" />
                </div>
            </div>
            <div className='fixed bottom-10 right-20'>
                <button onClick={skipIntro} className='font-semibold text-mainOrange border border-mainOrange hover:bg-mainDark p-3 shadow-sm  text-xl'>Skip intro</button>
            </div>
        </>
    )
}
