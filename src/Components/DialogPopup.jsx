import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, TextField } from '@mui/material'

export default function DialogPopup({ isPopup, setIsPopup, data, setAllStudent, editValue, studentIndex }) {
  const [change, setChange] = React.useState({
    studentName: '',
    studentWeight: '',
    studentPushUp: '',
    score: '',
    ...data,
  })
  const [edit, setEdit] = React.useState('')

  React.useEffect(() => {
    const students = JSON.parse(localStorage.getItem("All students")) || [];
    setChange({ ...data })
    setEdit(students)
  }, [data,])

  const handleClickOpen = () => {
    setIsPopup(true)
  }

  const handleClose = () => {
    setIsPopup(false)
  }

  const handleSave = () => {
    if (!change.studentName || !change.studentWeight || !change.studentPushUp || !change.score) {
      alert("Please fill out all fields!")
      return
    }
    change.score = (change.studentPushUp * change.studentWeight) / 20

    const updatedStudents = edit.map((student) => {
      if (student.studentName === data.studentName) {
        return { ...change }
      }
      return {
        ...student,
        score: student.score || (student.studentPushUp * student.studentWeight) / 20,
      }
    })

    const sortedStudents = updatedStudents.sort((a, b) => b.score - a.score)

    localStorage.setItem("All students", JSON.stringify(sortedStudents))
    setAllStudent(sortedStudents)
    setIsPopup(false)
    editValue('')
  }
  const handleDelete = () => {
    const deletedStudent = edit.filter((item, index) => index != studentIndex).sort((a, b) => b.score - a.score)
    localStorage.setItem("All students", JSON.stringify(deletedStudent))
    window.location.reload()
    setIsPopup(false)
  }

  const handleChange = (item, value) => {
    setChange((prevState) => ({
      ...prevState,
      [item]: value,
    }))
  }


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} className="z-[-1]">
        Open alert dialog
      </Button>
      <Dialog
        open={isPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Student"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl required className="flex gap-2 w-[400px]">
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" color="warning" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
