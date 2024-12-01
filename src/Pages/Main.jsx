import { Button, Card, Fade } from "@mui/material"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import ReactConfetti from "react-confetti"
import settingsLogo from "../../public/settings.svg"
import { Link } from "react-router-dom"


export default function Main() {
  const bronze = useRef(null)
  const silver = useRef(null)
  const gold = useRef(null)
  const [celebrate, setCelebrate] = useState(false)
  const [start, setStart] = useState(false)
  const [student, setStudents] = useState(false)


  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("All students")) || [];
    setStudents(students)
    if (start) {
      setTimeout(() => {
        setCelebrate(true)
      }, 13000);

      gsap.to(bronze.current, {
        keyframes: [
          { delay: 1,bottom: 0, rotate: 0, left: "50%", right: "50%", },
          { scale: 1.8, fontSize: "25px", },
          { left: "0", right: "50%", bottom: "-10rem", scale: 1, fontSize: "20px", delay: 1 },
          {
            rotate: -5, // Initial rotation
            x: 40, // Start position X
            y: 0, // Start position Y
          },
          {
            ease: "expo.inOut", // Smooth ease for natural movement
            y: -10, // Move up
            x: -10, // Move to the left
            rotate: 5, // Rotate to the other side
            yoyo: true, // Reverse the animation
            repeat: -1, // Infinite loop
            duration: 0.5, // Quick duration for a lively feel
          }
        ]
      })
      gsap.to(silver.current, {
        keyframes: [
          { delay: 5, bottom: "-10rem", rotate: 0, left: "50%", right: "50%", },
          { scale: 1.8, fontSize: "25px", },
          { left: "50%", right: "0", bottom: "-10rem", scale: 1, fontSize: "20px", delay: 1 },
          {
            rotate: -5, // Initial rotation
            x: 40, // Start position X
            y: 0, // Start position Y
          },
          {
            ease: "expo.inOut", // Smooth ease for natural movement
            y: -10, // Move up
            x: -10, // Move to the left
            rotate: 5, // Rotate to the other side
            yoyo: true, // Reverse the animation
            repeat: -1, // Infinite loop
            duration: 0.5, // Quick duration for a lively feel
          }
        ]
      })
      gsap.to(gold.current, {
        keyframes: [
          { delay: 10, bottom: "-10rem", rotate: 0, left: "50%", right: "50%", },
          { scale: 1.8, fontSize: "25px", },
          { left: "50%", right: "50%", bottom: "-4rem", scale: 1, fontSize: "20px", delay: 1 },
          {
            rotate: -5, // Initial rotation
            x: 40, // Start position X
            y: 0, // Start position Y
          },
          {
            ease: "expo.inOut", // Smooth ease for natural movement
            y: -10, // Move up
            x: -10, // Move to the left
            rotate: 5, // Rotate to the other side
            yoyo: true, // Reverse the animation
            repeat: -1, // Infinite loop
            duration: 0.5, // Quick duration for a lively feel
          }
        ]
      })
    }

  }, [start]);

  const handleStart = () => {
    localStorage.setItem("Ceremony is start", JSON.stringify("true"))
    setStart(true)
  }
  return (
    <>
      {student.length > 0 ? (
        <>
          {celebrate && (<ReactConfetti />)}
          {start ? (
            <>
              <div className="h-screen max-w-[900px] mx-auto flex justify-center items-end relative">
                {/* //! silver */}
                <div ref={silver} className=" z-[2] absolute bottom-[-50rem] left-[50%] right-[50%]  flex flex-col items-center">
                  <h2 className=" text-xl mb-4 font-bold text-center text-white">{student[1].studentName}</h2>
                  <Card sx={{ bgcolor: "#1979e6", boxShadow: 5 }} className="flex items-center flex-col rounded-t-[5px] p-2 w-[300px] h-[600px]">
                    <span className="text-[5rem]">🥈</span>
                    <div>
                      <p className=" font-bold text-white text-3xl">{student[1].score}</p>
                    </div>
                  </Card>
                </div>

                {/* //! bronze */}
                <div ref={bronze} className=" absolute bottom-[-50rem] left-[50%] right-[50%]  flex-col items-center flex">
                  <h2 className="font-bold mb-4 text-center text-2xl text-white">{student[2].studentName}</h2>
                  <Card sx={{ bgcolor: "#1979e6", boxShadow: 5 }} className="flex items-center flex-col rounded-t-[5px] p-2 w-[300px] h-[500px]">
                    <span className="text-[5rem]">🥉</span>
                    <div>
                      <p className=" font-bold text-white text-3xl">{student[2].score}</p>
                    </div>
                  </Card>
                </div>

                {/* //! gold */}
                <div ref={gold} className="absolute z-[9] bottom-[-50rem] left-[50%] right-[50%]  flex items-center flex-col">
                  <h2 className="text-wrap  text-2xl mb-4 font-bold text-center text-white">{student[0].studentName}</h2>
                  <Card sx={{ bgcolor: "#1979e6", boxShadow: 10 }} className="  rounded-t-[5px] flex flex-col bg-emerald-500 items-center p-2 w-[300px] h-[600px]">
                    <span className="text-[5rem]">🥇</span>
                    <div>
                      <p className=" font-bold text-white text-3xl">{student[0].score}</p>
                    </div>
                  </Card>
                </div>

                <div>

                </div>
              </div>
            </>
          ) : (
            <div className="container w-full h-screen flex items-center justify-center flex-col gap-2">
              <Fade in={true}>
                <Button variant="contained" color="secondary" onClick={() => handleStart()} sx={{ paddingBlock: "15px", paddingInline: "30px", fontSize: "20px" }}>Start Ceremony</Button>
              </Fade>
            </div>
          )}
        </>
      ) : (
        <div className='w-full container flex justify-center items-center h-screen'>
          <Fade in={true} style={{ transitionDelay: "100ms" }}>
            <Card className='w-full p-4 flex  flex-col gap-4'>
              <p className='text-[30px] font-bold'>No data please fill blanks</p>
              <div className='flex justify-center transition-all animate-spin duration-1000' >
                <img src={settingsLogo} width={"500px"} alt="settings logo" />
              </div>
              <Link to={"/members"}>
                <Button variant='contained' className='w-full'>
                  Go to page
                </Button>
              </Link>
            </Card>
          </Fade>
        </div>
      )}
    </>
  )
}