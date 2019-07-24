import React, { useContext } from 'react';
import { MyContext } from '../contexts/MyContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';
import PostForm from './PostForm';

function Form(props) {

  const context = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const onSucessPost = () => context.setData(null);
  const apiPath = '/api/points'
  const formTitle = 'Add new location'
  
  const additionalInputs = {
    lon: context.lon,
    lat: context.lat
  }
  
  const inputs = [
    {
      name: 'name',
      label: 'Name:',
      required: true,
      placeholder: 'place name',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description:',
      required: false,
      placeholder: 'place decription',
      type: 'text',
    },
    {
      name: 'type',
      label: 'Select type:',
      selectType: true,
      options: ['camping', 'bonfire', 'view'],
      default: 'camping'
    }
  ]
  const buttonTitle = 'Add to the map';

  return (
    context.mode === 'explore' ? null :
    <PostForm onSucessPost={onSucessPost} apiPath={apiPath}
    formTitle={formTitle} additionalInputs={additionalInputs}
    inputs={inputs} buttonTitle={buttonTitle} />
  )
 
}
export default Form;