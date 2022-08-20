import React, { useState, useEffect } from 'react';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { API } from 'aws-amplify';
import { withAuthenticator,Button } from '@aws-amplify/ui-react';
import { listRestaurants } from './graphql/queries';
import { createRestaurant as createRestaurantMutation, deleteRestaurant as deleteRestaurantMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '', city: '' }

function App({ signOut }) {
  const [Restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    const apiData = await API.graphql({ query: listRestaurants });
    setRestaurants(apiData.data.listRestaurants.items);
  }

  async function createRestaurant() {
    if (!formData.name || !formData.description) return;
    console.log(formData)
    await API.graphql({ query: createRestaurantMutation, variables: { input: formData } });
    setRestaurants([ ...Restaurants, formData ]);
    setFormData(initialFormState);
  }

  async function deleteRestaurant({ id }) {
    const newRestaurantsArray = Restaurants.filter(Restaurant => Restaurant.id !== id);
    setRestaurants(newRestaurantsArray);
    await API.graphql({ query: deleteRestaurantMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Restaurants App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Restaurant name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Restaurant description"
        value={formData.description}
      />
      <input
        onChange={e => setFormData({ ...formData, 'city': e.target.value})}
        placeholder="Restaurant city"
        value={formData.city}
      />
      <button onClick={createRestaurant}>Create Restaurant</button>
      <div style={{marginBottom: 30}}>
        {
          Restaurants.map(Restaurant => (
            <div key={Restaurant.id || Restaurant.name}>
              <h2>{Restaurant.name}</h2>
              <p>{Restaurant.description}</p>
              <button onClick={() => deleteRestaurant(Restaurant)}>Delete Restaurant</button>
            </div>
          ))
        }
      </div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(App);