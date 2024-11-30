import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, Card, Slide, TableHead, TextField } from '@mui/material';
import { Edit, FitnessCenter, MonitorWeight, PendingActions, SportsScore } from '@mui/icons-material';
import DialogPopup from '../Components/DialogPopup';
import AddDialog from '../Components/AddDialog';
import DownloadData from '../Components/DownloadData';
import DeleteAllButton from '../Components/DeleteAllButton';
import settingsLogo from "../../public/settings.svg"


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(studentName, studentWeight, studentPushUp, score) {
    return { studentName, studentWeight, studentPushUp, score };
}



export default function CustomPaginationActionsTable() {

    // ! forms
    const [rows, setRow] = React.useState([])
    const [copyRows, setCopyRow] = React.useState([...rows])
    const [name, setName] = React.useState('');
    const [isPopup, setIsPopup] = React.useState(false);
    const [isSavePopup, setIsSavePopup] = React.useState(false)
    const [editData, setEditData] = React.useState([])
    const [studentIndex, setStudentIndex] = React.useState(0)

    React.useEffect(() => {
        const students = JSON.parse(localStorage.getItem("All students")) || [];
        const student = students.map(item => createData(item.studentName, item.studentWeight, item.studentPushUp, (item.studentPushUp * item.studentWeight) / 20)).sort((a, b) => (a.score > b.score ? -1 : 1))
        setRow(student)
        setCopyRow(student)
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // ! forms
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.length > 1) {
            const formValue = copyRows.filter(item => item.studentName.includes(name))
            setRow(formValue)
        } else {
            setRow(copyRows)
        }
    };

    const handleFormEdit = (row, index) => {
        setStudentIndex(index)
        setEditData(row)
        setIsPopup(true)
    }


    return (
        <div className='container min-h-screen h-full pb-5'>
            <div className='relative z-[-99] to-blue-500 '>
                <DialogPopup search={name} studentIndex={studentIndex} isPopup={isPopup} setIsPopup={setIsPopup} data={editData} allStudent={rows} setAllStudent={setRow} editValue={setName} />
            </div>
            <Box>
                {/* Conditionally applies the timeout prop to change the entry speed. */}
                <Slide
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 400 })}
                    direction='down'
                >
                    <Card className='relative  p-2 mt-[3rem]' sx={{ boxShadow: 5 }}>
                        <div className='flex justify-between'>
                            <AddDialog isPopup={isSavePopup} setIsPopup={setIsSavePopup} setAllStudent={setRow} />
                            <div className='flex gap-2'>
                                <DeleteAllButton />
                                <DownloadData />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                color='info'
                                label="Student name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </Card >
                </Slide>
                <Slide
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({ timeout: 400 })}
                    direction='up'
                >
                    <div>
                        {rows.length > 0 ? (<TableContainer component={Paper}
                            sx={{ boxShadow: 5 }}
                            className=" w-full h-full my-4">


                            <Table aria-label=" pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bolder" }}>Name</TableCell>
                                        <TableCell style={{ fontWeight: "bolder" }} align="right"><span>Weight</span><MonitorWeight /></TableCell>
                                        <TableCell style={{ fontWeight: "bolder" }} align="right"><span>Pushups</span> <FitnessCenter /></TableCell>
                                        <TableCell style={{ fontWeight: "bolder" }} align="right"><span>Score</span><SportsScore /></TableCell>
                                        <TableCell style={{ fontWeight: "bolder" }} align="right"><span>Action</span><PendingActions /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row, key) => (
                                        <TableRow key={`${row.name}_${key}`} >
                                            <TableCell component="th" scope="row">
                                                {row.studentName}
                                            </TableCell>
                                            <TableCell style={{ width: 160, }} align="right">
                                                {row.studentWeight}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                {row.studentPushUp}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                {row.score}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                <Edit onClick={() => handleFormEdit(row, key)} className='cursor-pointer' />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter >
                                    <TableRow >
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                            colSpan={5}
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>)
                            : (
                                <div className='w-full flex justify-center items-center mt-5'>
                                    <Card className='w-full p-4 flex  flex-col gap-4'>
                                        <p className='text-[30px] font-bold'>No data please fill blanks</p>
                                        <div className='flex justify-center transition-all animate-spin duration-1000' >
                                            <img src={settingsLogo} width={"500px"} alt="settings logo" />
                                        </div>
                                    </Card>
                                </div>
                            )}
                    </div>
                </Slide >
            </Box>
        </div>

    );
}
