import * as React from 'react'
import Button from '@mui/material/Button'

export default function DownloadData() {
    const handleDownload = () => {
        const students = JSON.parse(localStorage.getItem("All students"))

        if (!students) {
            alert('No data to download!')
            return
        }

        const blob = new Blob([JSON.stringify(students, null, 2)], { type: "application/json" })

        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)

        link.download = "students_data.json"
        link.click()
    }

    return (
        <React.Fragment>
            <Button 
                variant="contained" 
                color="secondary" 
                className="z-[9]" 
                onClick={handleDownload}
            >
                Save Data!
            </Button>
        </React.Fragment>
    )
}
