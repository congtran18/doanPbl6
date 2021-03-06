import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../../contexts/ProductContext'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios'

const UpdateAccount = ({userId}) => {
	// Contexts
	const {
        showUpdateUserModal,
		setShowUpdateUserModal,
		setShowToast
	} = useContext(ProductContext)

	const [validated, setValidated] = useState(false);



    const [newCategory, setNewCategory] = useState(userId)

	const [select, setSelect] = useState("");
	const [imageinput, setImageinput] = useState("");
	const [categorystate, setCategorystate] = useState(0);
	const [previouscategoryProducts, setPreviouscategoryProducts] = useState("");
	const [typeProducts, setTypeProducts] = useState([]);
	const [categoryProducts, setCategoryProducts] = useState([]);

	// Add product
	const addProduct = async (_id, newCategory) => {
		try {
			const response = await axios.put(`http://localhost:5000/api/admins/${_id}`, newCategory)
			if (response.data.success) {
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}


	const getTypeProducts = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/api/products/typeProduct/type`)
			if (response.data.success) {
				setTypeProducts(response.data.typeProducts)
			}
		} catch (error) {
			setTypeProducts([])
		}
	}

	const getCategoryProducts = async (typeID) => {
		try {
			const response = await axios.get(`http://localhost:5000/api/products/categoryProduct/category?typeID=`)
			if (response.data.success) {
				setCategoryProducts(response.data.categoryProducts)
			}
		} catch (error) {
			setCategoryProducts([])
		}
	}


	useEffect(() => {
		getCategoryProducts("");
        // setCategoryProducts(userId);
        setNewCategory(userId);
        getTypeProducts();
		setValidated(false);
        console.log("+++++",userId)
	}, [showUpdateUserModal,userId])

	// useEffect(() => {
	// 	getTypeProducts();
	// 	if (select !== "") {
	// 		getCategoryProducts(select);
	// 	} else {
	// 		getCategoryProducts("");
	// 	}
	// 	setCategorystate(1)
	// 	setPreviouscategoryProducts(categoryProducts)
	// }, [select])

    const { _id ,name, email, isAdmin, password} = newCategory

	const onChangeNewProductForm = event => {
		setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
	}

	const onChangeSelectNewProductForm = event => {
		setSelect(event.target.value)
		setNewCategory({ ...newCategory, [event.target.name]: event.target.value })
	}

	const closeDialog = () => {
		resetAddProductData();
		// setValidated(false);
        // setShowUpdateCategoryModal(false)
		setCategorystate(0)
		setPreviouscategoryProducts("")
	}

	const handleKeypress = (e) => {
		const characterCode = e.key
		if (characterCode === 'Backspace') return

		const characterNumber = Number(characterCode)
		if (characterNumber >= 0 && characterNumber <= 9) {
			if (e.currentTarget.value && e.currentTarget.value.length) {
				return
			} else if (characterNumber === 0) {
				e.preventDefault()
			}
		} else {
			e.preventDefault()
		}
	}

	const checkallspace = (e) => {
		var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//ki???m tra k?? t??? ?????c bi???t
		if (e.currentTarget.value.trim().length === 0 || e.currentTarget.value.trim().replace(/ /g, "").length < 5 || format.test(e.currentTarget.value) === true) {
			e.preventDefault();
			setNewCategory({ ...newCategory, [e.target.name]: "" })
		}
	}

	const onSubmit = async event => {
		event.preventDefault()
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			// const formData = new FormData();
			// formData.append('realname', realname);
			// formData.append('type', type);
			// formData.append('category', category);
			// formData.append('status', status);
			// formData.append('discount', discount);
			// for (let i = 0; i < size.length; i++) {
			// 	formData.append('size', size[i]);
			// }
			// for (let i = 0; i < color.length; i++) {
			// 	formData.append('color', color[i]);
			// }
			// formData.append('cost', cost);
			// formData.append('description', description);
			// formData.append('image', image[0]);
			const { success, message } = await addProduct(_id, newCategory)
			resetAddProductData()
			setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		}

		setValidated(true);
	}

	const resetAddProductData = () => {
		setNewCategory({ name: '', email: '', isAdmin: true, password: '' })
		setShowUpdateUserModal(false)
		setImageinput("")
		setSelect("")
	}

	return (
		<Modal show={showUpdateUserModal} onHide={closeDialog} encType='multipart/form-data' dialogClassName="my-modal2" >
			<MDBContainer>
				<Modal.Header closeButton>
					<Modal.Title className="formtitle" >C???p nh???t danh m???c m???i</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={onSubmit} id="add">
					<Modal.Body>
						<MDBRow>
							<MDBCol md="12">
								<Form.Group controlId="validationCustom01">
									<Form.Label>T??n danh m???c</Form.Label>
									<Form.Control
										type='text'
										placeholder='T??n s???n ph???m'
										name='name'
										value={name}
										required
										onBlur={checkallspace}
										onChange={onChangeNewProductForm}
										minLength={5}
										maxLength={30}
									/>
									<Form.Control.Feedback type="invalid">
										Ch???n t??n danh m???c ??t nh???t 5 k?? t??? v?? kh??ng c?? k?? t??? ?????c bi???t
									</Form.Control.Feedback>
								</Form.Group>
                                <Form.Group controlId="validationCustom01">
									<Form.Label>Email t??i kho???n</Form.Label>
									<Form.Control
										type='text'
										placeholder='Email'
										name='email'
										value={email}
										required
										onChange={onChangeNewProductForm}
									/>
									<Form.Control.Feedback type="invalid">
										Nh???p email t??i kho???n
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom01">
									<Form.Label>M???t kh???u</Form.Label>
									<Form.Control
										type='text'
										placeholder='Password'
										name='password'
										value={password}
										required
										onChange={onChangeNewProductForm}
									/>
									<Form.Control.Feedback type="invalid">
										Nh???p m???t kh???u
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="validationCustom03">
									<Form.Label>Quy???n</Form.Label>
									<Form.Control
										as='select'
										id="isAdmin"
										name="isAdmin"
										required
										defaultValue={userId.isAdmin}
										onChange={onChangeNewProductForm}
									>
										<option value={true} selected>Admin</option>
										<option value={false}>User</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">
										Ch???n quy???n
									</Form.Control.Feedback>
								</Form.Group>

							</MDBCol>
						</MDBRow>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={closeDialog}>
							Cancel
						</Button>
						<Button variant='primary' type='submit'>
							Save!
						</Button>
					</Modal.Footer>
				</Form>
			</MDBContainer>
		</Modal>
	)
}

export default UpdateAccount
