import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, TextField } from '@mui/material';

export default function AddDialog({ isPopup, setIsPopup, setAllStudent }) {


    const [change, setChange] = React.useState({
        studentName: '',
        studentWeight: '',
        studentPushUp: '',
        score: '',
    })
    const [edit, setEdit] = React.useState('')

    React.useEffect(() => {
        const students = JSON.parse(localStorage.getItem("All students")) || [];
        setChange({ ...students })
        setEdit(students)
    }, [])

    const handleClickOpen = () => {
        setIsPopup(true)
    }

    const handleClose = () => {
        setIsPopup(false)
    }

    const handleSave = () => {
        if (!change.studentName || !change.studentWeight || !change.studentPushUp) {
            alert("Please fill out all fields!")
            return
        }
        change.score = (change.studentPushUp * change.studentWeight) / 20
        const updateStudent = [...edit]
        updateStudent.push(change)
        const sortedStudents = updateStudent.sort((a, b) => b.score - a.score)

        localStorage.setItem("All students", JSON.stringify(sortedStudents))
        setAllStudent(sortedStudents)
        setIsPopup(false)
        window.location.reload()
    }

    const handleChange = (item, value) => {
        setChange((prevState) => ({
            ...prevState,
            [item]: value,
        }))
    }
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} className='z-[9]'>
                Add student
            </Button>
            <Dialog
                open={isPopup}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit Student"}</DialogTitle>
                <DialogContent>
                    <FormControl required className="flex gap-2 sm:w-[400px] w-full">
                        <TextField
                            label="Name"
                            variant="standard"
                            value={change.studentName || ''}
                            onChange={(e) => handleChange("studentName", e.target.value)}
                            sx={{ input: { textAlign: "center" } }}
                        />
                        <TextField
                            label="Weight"
                            variant="standard"
                            type="number"
                            value={change.studentWeight || ''}
                            onChange={(e) => handleChange("studentWeight", e.target.value)}
                            sx={{ input: { textAlign: "center" } }}
                        />
                        <TextField
                            label="Push up"
                            variant="standard"
                            type="number"
                            value={change.studentPushUp || ''}
                            onChange={(e) => handleChange("studentPushUp", e.target.value)}
                            sx={{ input: { textAlign: "center" } }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                    <Button type='submit' variant="contained" color="error" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}
