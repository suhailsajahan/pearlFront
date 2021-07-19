import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
} from "reactstrap";

const EditCards = ({ onEdit, card }) => {
  const id = card._id;
  const [name, setName] = useState(card.name);
  const [type, setType] = useState(card.type);
  const [description, setDescription] = useState(card.description);
  // const [image, setImage] = useState('');
  const [image, setImage] = useState(card.image);
  const [price, setPrice] = useState(card.price);
  const [isModalOpen, set_isModalOpen] = useState(false);

  const toggleModal = () => {
    set_isModalOpen(!isModalOpen);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateType = (e) => {
    setType(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateImage = (base64) => {
    setImage(base64);
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  //Submit
  const onSubmit = (e) => {
    // e.preventDefault();

    if (!name || !description || !image || !price) {
      alert("Please fill the all parts");
      return;
    }

    onEdit({ card_id: id, name, type, description, price, image });

    setName("");
    setType("");
    setDescription("");
    setImage("");
    setPrice("");

    toggleModal();
  };

  return (
    <div>
      <Button className="btn-sm bg-primary" block onClick={toggleModal}>
        Edit
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit the card</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="id">Id</Label>
              <Input type="text" value={id} id="id" disabled />
              {/* innerRef={ (input) => this.username = input } */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" value={name} id="name" onChange={updateName} />
              {/* innerRef={ (input) => this.username = input } */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="type">Type</Label>
              <Input type="select" value={type} id="type" onChange={updateType}>
                <option>Wedding Invitation</option>
                <option>Conference Invitation</option>
                {/* innerRef={ (input) => this.username = input } */}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                type="textarea"
                maxLength="60"
                value={description}
                id="description"
                onChange={updateDescription}
              />
              {/* innerRef={ (input) => this.username = input } */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                value={price}
                id="price"
                onChange={updatePrice}
              />
              {/* innerRef={ (input) => this.username = input } */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="image">Image</Label>
              <br />
              {/* <Input type="file" value={image} id="image" onChange={updateImage} /> */}
              {/* innerRef={ (input) => this.username = input } */}
              <FileBase64
                value={image}
                multiple={false}
                onDone={({ base64 }) => updateImage(base64)}
              />
            </FormGroup>
            <Button
              type="submit"
              value="submit"
              className="primary"
              onClick={onSubmit}
            >
              Save changes
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditCards;
