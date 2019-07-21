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
  const hiddenInputs = [
    {
      name: 'lon',
      type: 'number',
      value: props.lon
    },
    {
      name: 'lat',
      type: 'number',
      value: props.lat
    },
  ]
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
      options: ['camping', 'bonfire', 'view']
    }
  ]
  const buttonTitle = 'Add to the map';

  return (
    context.mode === 'explore' ? null :
    <PostForm onSucessPost={onSucessPost} apiPath={apiPath}
    formTitle={formTitle} hiddenInputs={hiddenInputs}
    inputs={inputs} buttonTitle= {buttonTitle} />
  )
 
}
export default Form;