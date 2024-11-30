import { Card } from '@mui/material';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const studentData = [
    { studentName: 'Student29', studentWeight: 89, studentPushUp: 23, score: 102.35 },
    { studentName: 'Student49', studentWeight: 49, studentPushUp: 34, score: 83.3 },
    { studentName: 'Student33', studentWeight: 69, studentPushUp: 22, score: 75.9 },
    { studentName: 'Student18', studentWeight: 51, studentPushUp: 27, score: 68.85 },
    { studentName: 'Student24', studentWeight: 48, studentPushUp: 28, score: 67.2 },
    { studentName: 'Student45', studentWeight: 55, studentPushUp: 24, score: 66 },
];

const Home = () => {
    return (
        <div className="absolute right-0 left-0 top-[5.2rem] px-[1rem] container">
            <Card className='p-2'>
                <h1>Goa Pushup Chart</h1>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={studentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="studentName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="" name="Score" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default Home;
