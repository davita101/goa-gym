import { Box, Button, Card } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import settingsLogo from "../../public/settings.svg"
const Home = () => {
    const [row, setRow] = React.useState()
    React.useEffect(() => {
        const students = JSON.parse(localStorage.getItem("All students")) || [];
        setRow(students)
    }, []);

    return (
        <Box className="absolute right-0 left-0 top-[5.2rem] px-[1rem] container">
            {row && row.length > 0 ?
                (<Card className='px-5 py-10 h-[620px]'>
                    <h1>Goa Pushup Chart</h1>
                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={row}>
                            <CartesianGrid strokeDasharray="0" strokeWidth={1} vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                axisLine={false}
                                tickLine={false}
                                dataKey="studentName" >

                                {/* <Label value="score" offset={0} position="top" /> */}
                            </XAxis>
                            <YAxis
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            >
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" radius={[4, 4, 0, 0]} name="Score" >
                                <LabelList dataKey="score" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                ) : (
                    <div className='w-full container flex justify-center items-center h-[90vh]'>
                        <Card className='w-full p-4 flex  flex-col gap-4'>
                            <p className='text-[30px] font-bold'>No data please fill blanks</p>
                            <div  className='flex justify-center transition-all animate-spin duration-1000' >
                                <img src={settingsLogo}  width={"500px"} alt="settings logo" />
                            </div>
                            <Link to={"/members"}>
                                <Button variant='contained' className='w-full'>
                                Go to page
                                </Button>
                            </Link> 
                        </Card>
                    </div>


                )

            }
        </Box >
    );
};

export default Home;
