import { useState } from 'react'
import { Children } from 'react';
import { Icon, Plus, ChevronDown, Minimize2, Trash} from 'lucide-react';
import { coconut } from '@lucide/lab';
import './App.css'

export function App(){
  console.log("app component called")
  return (
    <>
      <Icon iconNode={coconut} size={48} color="white" />
      <CardCollapse header={'Personal Details'}>
        <PersonalDetailsBlock></PersonalDetailsBlock>
        <AddBtn action={""} info={"Links"}></AddBtn>
      </CardCollapse>
      <CardCollapse header={'Education'}>
        <EducationBlock></EducationBlock>
        <AddBtn action={""} info={"Education"}></AddBtn>
      </CardCollapse>
       <CardCollapse header={'Experience'}>
        <ExperienceBlock></ExperienceBlock>
        <AddBtn action={""} info={"Experience"}></AddBtn>
      </CardCollapse>
    </>
  )
}

function AddBtn( {action, info} ){
  return(<button 
    className="primary-add-btn"
    onClick={action}>
    <Plus size={24} color='#333232'></Plus>
    Add {info}
  </button>
  )
}

function JobBtn( {action} ){
    return(<button 
    className="secondary-add-btn"
    onClick={action}>
    <Plus size={24} color='#333232'></Plus>
    Add Job Point
  </button>
  )
}

function MedIconBtn( {action, jsxIcon: Icon} ){
  return(
    <div className='med-icon-btn'>
      <Icon
      size={20} 
      color='#333232'
      onClick={action}></Icon>
    </div>
  )
}

function CollapseBtn( {handleCollapse, handleRotation} ){
  return(
    <div
    className='card-collapse-btn'>
      <ChevronDown 
      size={32} 
      color='#333232'
      style={{ transform: `rotate(${handleRotation()}deg)` }}
      onClick={handleCollapse}></ChevronDown>
    </div>
  )
}

function CardCollapse( {children, header} ){
  const [isCollapsed, setCollapse] = useState(false);

  function handleCollapse(){
    setCollapse(!isCollapsed);
  }

  function handleRotation(){
    return isCollapsed ? 270 : 0;
  }

  return(<div className="card-collapse">
    <div
    className='card-header-container'>
      <h3>{header}</h3>
      <CollapseBtn handleCollapse={handleCollapse} handleRotation={handleRotation}/>
    </div>
    {!isCollapsed && (
        <>
          {children}
        </>
      )}
  </div>)
} 

function MainInput( {label, type} ){
  return(
    <div className="input-container">
      <label>
      {label}
      <input className='input-main' type={type}></input>
      </label>
    </div>
  )
}

function TextAreaInput( {label} ){
  return(
    <div className="input-container">
      <label>
      {label}
      <textarea className='input-text-area' resize='none'></textarea>
      </label>
    </div>
  )
}

function PersonalDetailsBlock( {} ){
  return(
    <div className="info-block">
      <MainInput label={'Name'} type={'text'}></MainInput>
      <MainInput label={'Email'} type={'email'}></MainInput>
      <MainInput label={'Phone Number'} type={'text'}></MainInput>
    </div>
  )
}

function EducationBlock( {removal} ){
  const [isMinimized, setMinimized] = useState(false);

  function handleMinimize(){
    setMinimized(!isMinimized);
  }

  return(
    <div className="info-block">
      <div className='card-header-container'>
        <h4>Education test</h4>
        <div className="block-action-container">
          <MedIconBtn action={handleMinimize} jsxIcon={Minimize2}></MedIconBtn>
          <MedIconBtn action={removal} jsxIcon={Trash}></MedIconBtn>
        </div>
      </div>  
        {!isMinimized && (
          <div className='input-block'>
            <MainInput label={'School Name'} type={'text'}></MainInput>
            <MainInput label={'Diploma'} type={'text'}></MainInput>
            <div className='start-end-date'>
              <MainInput label={'Start Date'} type={'text'}></MainInput>
              <MainInput label={'End Date'} type={'text'}></MainInput>
            </div>
          </div>
        )}
    </div>
  )
}

function ExperienceBlock( {removal} ){
  const [isMinimized, setMinimized] = useState(false);

  function handleMinimize(){
    setMinimized(!isMinimized);
  }

  return(
    <div className="info-block">
      <div className='card-header-container'>
        <h4>Experience test</h4>
        <div className="block-action-container">
          <MedIconBtn action={handleMinimize} jsxIcon={Minimize2}></MedIconBtn>
          <MedIconBtn action={removal} jsxIcon={Trash}></MedIconBtn>
        </div>
      </div>  
        {!isMinimized && (
          <div className='input-block'>
            <MainInput label={'Job Title'} type={'text'}></MainInput>
            <MainInput label={'Company Name'} type={'text'}></MainInput>
            <MainInput label={'Location'} type={'text'}></MainInput>
            <div className='start-end-date'>
              <MainInput label={'Start Date'} type={'text'}></MainInput>
              <MainInput label={'End Date'} type={'text'}></MainInput>
            </div>
            <TextAreaInput label={'Job Point Test'}></TextAreaInput>
            <JobBtn action={''}></JobBtn>
          </div>
        )}
    </div>
  )
}