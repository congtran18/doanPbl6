import React from 'react'
import {
    Grid,
    Divider,
    Card,
    TextField,
    Icon,
    // Button,
    IconButton,
    Row,
} from '@material-ui/core'
import AccountOverview from './AccountOverview'
import AccountCustomer from './AccountCustomer'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { ProductContext } from 'app/contexts/ProductContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import AddAccountModal from './AddAccountModal'
import Pagination from 'app/components/Pagination/Pagination'
import UpdateAccount from './UpdateAccount'
import { Link } from 'react-router-dom'
import axios from 'axios'


const AccountManage = () => {

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [indexpage, setIndexpage] = useState(0);
    const [previousproductslength, setPreviousproductslength] = useState("");
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [deletedProduct, setDeletedProduct] = useState(false);
    const [search, setSearch] = useState("");
    const [previoussearch, setPrevioussearch] = useState("");
    const [previoustype, setPrevioustype] = useState("");
    const [previouscategory, setPreviouscategory] = useState("");
    const [typeID, settypeID] = useState("");
    const [categoryID, setcategoryID] = useState("");
    const [typeProducts, setTypeProducts] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [userId, setUserId] = useState({});

    const {
        showAddUserModal,
        setShowAddUserModal,
        showUpdateUserModal,
        setShowUpdateUserModal,
        showToast: { show, message, type },
        setShowToast
    } = useContext(ProductContext)

    const onChangeSelectTypeProduct = (name, value) => {
        setTimeout(() => {
            if (value._id !== undefined && value._id !== 'undefined') {
                settypeID(value._id)
            }
        }, 200);
    }

    const onChangeSelectCategoryProduct = (name, value) => {
        setTimeout(() => {
            if (value._id !== undefined && value._id !== 'undefined') {
                setcategoryID(value._id)
            }
        }, 200);
    }

    const onChangesearch = event => {
        setTimeout(() => {
            setSearch(event)
        }, 500);
    }

    const getTypeProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/typeProduct/type")
            if (response.data.success) {
                setTypeProducts(response.data.typeProducts)
            }
        } catch (error) {
            setTypeProducts([])
        }
    }

    const getCategoryProducts = async (typeID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=${typeID}`)
            if (response.data.success) {
                setCategoryProducts(response.data.categoryProducts)
            }
        } catch (error) {
            setCategoryProducts([])
        }
    }

    const getUsers = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admins?page=${page}`)
            setUsers(response.data.data)
            setTotalPages(response.data.pages)
            setUsersLoading(false)
        } catch (error) {
            setUsers([])
            setUsersLoading(false)
        }
    }

    // Delete product
    const deleteProduct = async productId => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admins/track/${productId}`)
            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletProductById = async productId => {
        const confirmBox = window.confirm(
            "B???n c?? ch???c ch???n mu???n xo?? t??i kho???n?"
        )
        if (confirmBox === true) {
            const { success, message } = await deleteProduct(productId)
            setShowToast({ show: true, message: 'T??i kho???n ???????c ????a v??o th??ng r??c!', type: success ? 'success' : 'danger' })
            setDeletedProduct(true)
        }
    }

    const showUpdate = async (_id) => {
        setUserId(_id)
        setShowUpdateUserModal(true)
    }

    useEffect(() => {
        if (showAddUserModal === false || deletedProduct === true) {
            getUsers(page);
            setPages(totalPages);
            setDeletedProduct(false)
        }
    }, [page, showAddUserModal, deletedProduct, showUpdateUserModal])

    // useEffect(() =>{
    // 	getCategoryProducts()
    //     setDeletedProduct(false)
    // }, [showAddCategoryModal,deletedProduct,showUpdateCategoryModal])

    let body = null

    if (usersLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (users.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Body>
                        <Card.Title>Kh??ng c?? t??i kho???n</Card.Title>
                    </Card.Body>
                </Card>
                <Pagination page={page} pages={pages} changePage={setPage} />

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {users.map((user, index) => {
                    if (!user.isAdmin) {
                        return (
                            <>
                                <div className="py-4">
                                    <Grid container alignItems="center">
                                        <AccountOverview user={user} />
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <Button
                                                className='post-button'
                                                // to={`/updateproduct/${categoryProduct._id}`}
                                                // as={Link}
                                                onClick={showUpdate.bind(this, user)}
                                            ><img src='https://cdn0.iconfinder.com/data/icons/ui-essence/32/_8ui-128.png' alt='edit' width='24' height='24' /></Button>
                                            <Button
                                                className='post-button'
                                                onClick={deletProductById.bind(this, user._id)}
                                            ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </>

                        )
                    }
                    else {
                        return (
                            <>
                                <div className="py-4">
                                    <Grid container alignItems="center">
                                        <AccountOverview user={user} />
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                        </Grid>
                                    </Grid>
                                </div>
                            </>
                        )
                    }
                })}

                <Divider className="mt-4 mb-6" />

                {page ? (
                    <Pagination page={page} pages={totalPages} changePage={setPage} />
                ) : (
                    <Pagination page={page} pages={pages} changePage={setPage} />
                )}

                <AddAccountModal />
                <UpdateAccount userId={userId} />
            </>
        )
    }


    return (
        <div className="m-sm-30">
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    {/* <ProductOverview /> */}

                    <Card className="p-0">
                        <div className="mb-1 flex justify-between items-center">
                            <h4 className="font-medium">Qu???n l?? t??i kho???n</h4>
                        </div>

                        <Divider className="mb-6" />

                        <div className="flex mb-5 justify-between items-center h-full">
                            <div className="flex">
                                <Autocomplete
                                    options={[{ realname: "Admin", _id: "" }, { realname: "User ", _id: "" }]}
                                    getOptionLabel={(option) => option.realname}
                                    style={{ width: '12rem', marginRight: '2rem' }}
                                    // onChange={onChangeSelectTypeProduct}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="L???c"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Button variant='secondary' className="image8" to={'/users/restore'} as={Link}>
                                    Kh??i ph???c
                                </Button>
                            </div>


                            <div className="flex items-center">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="T??m ki???m t??i kho???n..."
                                    style={{ width: '20rem' }}
                                    onChange={({ target }) => setTimeout(() => {
                                        setSearch(target.value)
                                    }, 500)}


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

                        <div className="overflow-auto">
                            <div className="min-w-600">
                                <div className="py-3">
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">M?? t??i kho???n</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">T??n</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Email</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <       h6 className="m-0 font-medium">Quy???n</h6>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            className="text-center"
                                        >
                                            <h6 className="m-0 font-medium">Thao t??c</h6>
                                        </Grid>
                                    </Grid>
                                </div>

                                {body}
                            </div>
                        </div>
                    </Card>

                </Grid>
            </Grid>
            <OverlayTrigger
                placement='left'
                overlay={<Tooltip>Th??m t??i kho???n m???i</Tooltip>}
            >
                <Button
                    className='btn-floating'
                    onClick={setShowAddUserModal.bind(this, true)}
                >
                    <img src='https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/53-256.png' alt='add-post' width='60' height='60' />
                </Button>
            </OverlayTrigger>
            <Toast
                show={show}
                style={{ position: 'fixed', top: '50%', left: '50%' }}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={1500}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default AccountManage
