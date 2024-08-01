import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import errorImg from '../assets/dummy_image.jpg'
function Product() {

    const [products, setProducts] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:1018/product")
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:1018/product/${id}`);
            if (response.status === 200) {
                const updatedProducts = products.filter(product => product._id !== id);
                setProducts(updatedProducts);
                alert('Product deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete the product');
        }
    };

    const createProduct = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formdata = {
            title: form.title.value,
            description: form.description.value,
            price: form.price.value,
            discount: form.discount.value,
            category: form.category.value,
            brand: form.brand.value
        }
        try {
            const { data } = await axios.post("http://localhost:1018/product", formdata)
            console.log(data)
            form.reset();
            new Swal({
                icon: 'success',
                title: 'Success',
                text: 'New Product Added Successfully'
            })
            fetchProduct();
        }
        catch (err) {
            new Swal({
                icon: 'error',
                title: 'Failed',
                text: 'Unable to create Product please try again'
            })
        }
    }

    const uploadProductImage = async (event, id) => {
        try {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('fileData', file);
            const { data } = await axios.post('http://localhost:1018/storage', formData);
            const response = await axios.put(`http://localhost:1018/product/${id}`, { thumbnail: data.filename });
            console.log(response.data);
            fetchProduct()
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to upload file on server'
            });
        }
    };

    //Pagination Start
    const [currentPage, setCurrentPage] = useState('1')
    const itemPerPage = 8
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <button className="btn btn-primary text-white py-2 rounded mb-4" onClick={() => openDrawer()}>
                            Add New Product
                        </button>

                        <div id="drawer" className="shadow mb-5 p-4 rounded">
                            <h1 className="text-4xl font-bold">New Product</h1>
                            <p className="text-gray-600 text-lg">Enter your product with details</p>

                            <form className="row g-3 mt-4" onSubmit={() => createProduct(event)} id="product-form">
                                <div className="col-12">
                                    <label className="form-label">Enter Product Title</label>
                                    <input type="text" name="title" placeholder="Enter Product Name"
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Price</label>
                                    <input type="number" name="price" placeholder="Enter Price"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Discount</label>
                                    <input type="number" name="discount" placeholder="Enter Discount"
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Brand</label>
                                    <select className="form-control" name="brand">
                                        <option value="brand1">Brand 1</option>
                                        <option value="brand2">Brand 2</option>
                                        <option value="brand3">Brand 3</option>
                                        <option value="brand4">Brand 4</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Category</label>
                                    <select className="form-control" name="category">
                                        <option value="category1">Category 1</option>
                                        <option value="category2">Category 2</option>
                                        <option value="category3">Category 3</option>
                                        <option value="category4">Category 4</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" placeholder="Add more about product" />
                                </div>

                                <div>
                                    <button className="btn btn-primary text-white rounded py-2 px-4 mt-3">Submit</button>
                                </div>
                            </form>

                        </div>
                    </Col>
                </Row>
            </Container>
            <Row className='position-relative'>

            </Row>
            <Container>
                <Row>
                    {
                        currentItems.map((item, index) => {
                            return (
                                <Col lg={3} md={4} sm={6} className='mb-4' key={index}>
                                    <Card className='shadow-sm rounded'>
                                        <div className="position-relative">
                                            <Card.Img
                                                variant="top"
                                                onError={(e) => e.target.src = errorImg}
                                                src={item.thumbnail ? `http://localhost:1018/${item.thumbnail}` : errorImg}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => uploadProductImage(event, item._id)}
                                                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Button className="text-rose-600 text-sm">{item.brand}</Button>
                                            <div className="d-flex gap-2 mt-1">
                                                <div className="fs-6 font-bold">₹ {item.price - item.discount}</div>
                                                <del>₹ {item.price}</del>
                                                <label className="text-gray-600">{Math.round(item.discount * 100 / item.price)}% OFF</label>
                                            </div>
                                            <div className="mt-3 d-flex items-center gap-3">
                                                <button className="text-primary p-1 px-2 font-bold rounded-circle border-primary">
                                                    <i className="ri-shopping-cart-line"></i>
                                                </button>
                                                <button className="text-danger p-1 px-2 font-bold rounded-circle border-danger" onClick={() => deleteProduct(item._id)}>
                                                    <i className="ri-delete-bin-3-line"></i>
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: Math.ceil(products.length / itemPerPage) }, (_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Row>
            </Container>
        </>
    )
}

export default Product
