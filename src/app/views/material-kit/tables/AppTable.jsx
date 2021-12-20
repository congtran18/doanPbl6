import React, { useEffect, useState }  from 'react'
import {
    Grid,
    Divider,
    Card,
    TextField,
    Icon,
    Button,
    IconButton,
    Row,
} from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Breadcrumb, SimpleCard } from 'app/components'
import SimpleTable from './SimpleTable'
import Pagination from 'app/components/Pagination/Pagination'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    Autocomplete: {
        height: 20,
    },
}))

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
]

const AppTable = () => {
    const classes = useStyles()
    const [page, setPage] = useState(1);    
    return (
        <>
        <div className="m-sm-30">
        <Card className="p-0">
            <div className="mb-1 flex justify-between items-center">
                <h4 className="font-medium">Quản lý tài khoản</h4>
            </div>

            <Divider className="mb-6" />

            <div className="flex mb-5 justify-between items-center h-full">
                <div className="flex">
                    <Autocomplete
                        options={suggestions}
                        getOptionLabel={(option) => option.label}
                        style={{ width: '12rem', marginRight: '2rem' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Quyền"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                        )
                        }
                    />
                </div>

                <div className="flex items-center">
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Tìm kiếm tài khoản..."
                        style={{ width: '20rem' }}
                        InputProps={{
                            startAdornment: (
                                <Icon className="mr-3" fontSize="small">
                                    search
                                </Icon>
                            ),
                        }}
                    />
                </div>
            </div>

            {/* <SimpleCard title="Simple Table"> */}
                <SimpleTable />
            {/* </SimpleCard> */}

            {/* <Divider className="mt-4 mb-6" /> */}

            {/* <Pagination page={1} pages={1} changePage={setPage} /> */}
        </Card>
        </div>
                {/* <OverlayTrigger
                placement='left'
                overlay={<Tooltip>Add a new user</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    // onClick={setShowAddProductModal.bind(this, true)}
                >
                    <img src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/53-256.png' alt='add-post' width='60' height='60' />
                </Button>
            </OverlayTrigger> */}
            </>
    )
}

const dummyProductList = [
    {
        id: '323sa680b32497dsfdsgga21rt47',
        imgUrl: '/assets/images/products/speaker-1.jpg',
        price: 324.0,
        amount: 10,
        title: 'Bass Speaker Black',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
    {
        id: '323sa680b324976dfgga21rt47',
        imgUrl: '/assets/images/products/speaker-2.jpg',
        price: 454.0,
        amount: 15,
        title: 'Bass Speaker',
        category: 'audio',
        brand: 'Microlab',
        item: '2019 6582 2365',
    },
]

export default AppTable
