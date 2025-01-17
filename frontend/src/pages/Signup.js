import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Signup.css"
import botImg from "../Assets/botImg.JPG"



function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(""); 

  //image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) { 
    const file = e.target.file[0];
    if(file.size >= 1048576){
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage(){
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset', 'l7bcejcu');
    try{
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/learn-code-10/image/upload",{
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e){
    e.preventDefault();
    if(!image) return alert('Please upload your profile picture');
    const url = await uploadImage(image);
    console.log(url);
    //signup the user
  } 
    
  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex align-iems-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <div className="signup-profile-pic__container">
              <img src={imagePreview || botImg} className="signup-profile-pic" alt="sample pic" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Form.Group>

            <Button variant="primary" type="submit">
               {uploadingImg ? "Signing you up...": "Signup"}
            </Button>
            <div className="py-4"><p className="text-center">Alredy have an account ? <Link to="/login">Login</Link></p></div>
          </Form>
        </Col>
        <Col md={5} className="Signup__bg"></Col>
      </Row>
    </Container>
  );
}

export default signup     