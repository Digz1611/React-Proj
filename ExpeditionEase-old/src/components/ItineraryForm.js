// src/components/ItineraryForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ItineraryForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const firestore = getFirestore();

  useEffect(() => {
    if (id) {
      const fetchItinerary= async () => {
        const docRef = doc(firestore, 'itinerarys', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const itinerary= docSnap.data();
          setTitle(itinerary.title);
          setIngredients(itinerary.ingredients);
          setInstructions(itinerary.instructions);
          setStatus(itinerary.status);
        }
      };
      fetchItinerary();
    }
  }, [id, firestore]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredientField = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const itineraryData = {
      title,
      ingredients,
      instructions,
      status,
      createdBy: user.uid,
      createdAt: new Date()
    };

    try {
      if (id) {
        await setDoc(doc(firestore, 'itinerarys', id), itineraryData);
      } else {
        await setDoc(doc(firestore, 'itinerarys', `${new Date().getTime()}-${user.uid}`), itineraryData);
      }
      navigate(status === 'draft' ? '/draft-itinerarys' : '/itinerarys');
    } catch (error) {
      console.error('Error saving itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>{id ? 'Edit Itinerary' : 'Add Itinerary'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Label>Ingredients</Form.Label>
        {ingredients.map((ingredient, index) => (
          <Form.Group key={index} controlId={`formIngredient${index}`}>
            <Form.Control
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <Button variant="danger" onClick={() => removeIngredientField(index)}>Remove</Button>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={addIngredientField}>Add Ingredient</Button>

        <Form.Group controlId="formInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {id ? 'Update' : 'Save'} Itinerary
        </Button>
      </Form>
    </Container>
  );
};

export default ItineraryForm;
