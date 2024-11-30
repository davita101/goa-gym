import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, TextField } from '@mui/material'

export default function DialogPopup({ search, isPopup, setIsPopup, data, setAllStudent, editValue, studentIndex }) {
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
  }, [data])

  const handleClickOpen = () => {
    setIsPopup(true)
  }

  const handleClose = () => {
    setIsPopup(false)
  }

  const handleSave = () => {
    if (!change.studentName || !change.studentWeight) {
      alert("Please fill out all fields!")
      return
    }
    change.score = (change.studentPushUp * change.studentWeight) / 20
    const isNameChange = edit.filter(item => change.studentName === item.studentName)

    if(isNameChange.length  !== 1){
      window.location.reload()
    }

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
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleClose} autoFocus>
            Cancel
          </Button>
          {search.length == 0 ? (<Button variant="contained" color="warning" onClick={handleDelete} autoFocus>
            Delete
          </Button>) :
            (<Button variant="contained" color="warning" autoFocus onClick={handleDelete} disabled>
              Delete
            </Button>)
          }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
