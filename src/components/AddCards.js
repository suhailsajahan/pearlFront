import React, {useState} from 'react';
import FileBase64 from 'react-file-base64';
import { Form, FormGroup, Input, Label, Button, ModalHeader, Modal, ModalBody } from 'reactstrap';

const AddCards = ({onAdd}) => {
    
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [isModalOpen, set_isModalOpen] = useState(false);

    const toggleModal = () => {
        set_isModalOpen(!isModalOpen);
    };

    const updateName = e => {
        setName(e.target.value);
    };

    const updateType = e => {
        setType(e.target.value);
    };

    const updateDescription = e => {
        setDescription(e.target.value);
    };

    const updateImage = base64 => {
        setImage(base64);
    };

    const updatePrice = e => {
        setPrice(e.target.value);
    };


    // Submit
    const onSubmit = e => {
        e.preventDefault();

        // console.log(name, description, image, price);
        
        if(!name || !description || !image || !price){
            alert("Please fill the all parts");
            return
        }
        // console.log(`\\assets\\${(image.split('\\')[(image.split('\\')).length - 1])}`);

        // var localImgLocation = (`/assets/${(image.split('\\')[(image.split('\\')).length - 1])}`);
        // onAdd({name, type, description, price, image: localImgLocation});

        onAdd({name, type, description, price, image});

        setName('');
        setType('');
        setDescription('');
        setImage('');
        setPrice('');

        toggleModal();

    }


    return(
        <div>
        <Button className="btn mt-2 mb-2 btn-info" onClick={toggleModal}>
            <span className="fa fa-plus fa-lg"></span> Add a new card
        </Button>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Add a card</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" value={name} id="name" onChange={updateName}/>
                            {/* innerRef={ (input) => this.username = input } */}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="type">Type</Label>
                        <Input type="select" value={type} id="type" onChange={updateType} >
                            <option></option>
                            <option>Wedding Invitation</option>
                            <option>Conference Invitation</option>
                            {/* innerRef={ (input) => this.username = input } */}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="textarea" maxLength="60" value={description} id="description" onChange={updateDescription} />
                            {/* innerRef={ (input) => this.username = input } */}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="price">Price</Label>
                        <Input type="text" value={price} id="price" onChange={updatePrice}/>
                            {/* innerRef={ (input) => this.username = input } */}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="image">Image</Label>
                        <br/>
                        {/* <Input type="file" value={image} id="image" onChange={updateImage} /> */}
                            {/* innerRef={ (input) => this.username = input } */}
                        <FileBase64
                            multiple={ false }
                            onDone={({base64}) => updateImage(base64)} 
                        />
                    </FormGroup>
                    <Button type="submit" value="submit" className="primary" onClick={onSubmit}>Add the card</Button>
                </Form>
            </ModalBody>
        </Modal>
        </div>
    );
}

export default AddCards;