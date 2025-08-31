import { useState, Children } from 'react'
import { Icon, Plus, ChevronDown, Minimize2, Trash} from 'lucide-react';
import { Resume, Education, Experience, ContactLink, resumeApp } from './data';
import './App.css'

export function App(){
  const [resume, setResume] = useState(resumeApp);

  function handleAddEducation(){
    setResume(prev => ({
      ...prev, 
      educationList: [...prev.educationList, new Education()]
    }));
  }

  function handleRemoveEducation(obj){
    setResume(prev => ({
      ...prev, 
      educationList: prev.educationList.filter(e => e.id !== obj.id)
    }))
  }

  function generateEducationBlock(){
    return resume.educationList.map((edu) => (
      <EducationBlock 
        key={edu.id} 
        obj={edu} 
        onEdit={(updated) => handleEditEducation(edu.id, updated)} 
        removal={() => handleRemoveEducation(edu)}/>
    ))
  }

  function handleEditEducation(id, updated){
    setResume(prev => ({
      ...prev, 
      educationList: prev.educationList.map(e =>
        e.id === id ? { ...e, ...updated } : e
      )
    }));
  }

  function generateExperienceBlock(){
    return resume.experienceList.map((ex) => (
      <ExperienceBlock
        key={ex.id}
        obj={ex}
        onEdit={""}
        removal={""}
      />
    ))
  }

  function handleAddLink(){
    setResume(prev => ({
      ...prev, 
      links: [...prev.links, new ContactLink()]
    }));
  }

  function handleRemoveLink(obj){
    setResume(prev => ({
      ...prev, 
      links: prev.links.filter(e => e.id !== obj.id)
    }))
  }

  function handleEditLink(id, updated){
    setResume(prev => ({
      ...prev, 
      links: prev.links.map(e =>
        e.id === id ? { ...e, ...updated } : e
      )
    }));
  }

  function generateLinks(){
    return resume.links.map((link, index) => (
      <DeleteInput 
        key={link.id} 
        obj={link} 
        label={`link ${index + 1}`}
        onEdit={(updated) => handleEditLink(link.id, updated)} 
        deleteAction={() => handleRemoveLink(link)}/>
    ))
  }

  return (
    <>
      <CardCollapse header={'Personal Details'}>
        <PersonalDetailsBlock>
          {generateLinks()}
        </PersonalDetailsBlock> 
        <AddBtn action={handleAddLink} info={"Links"}/>
      </CardCollapse>
      <CardCollapse header={'Education'}>
        {generateEducationBlock()}
        <AddBtn action={handleAddEducation} info={"Education"} resume={resume}/>
      </CardCollapse>
       <CardCollapse header={'Experience'}>
        {generateExperienceBlock()}
        <AddBtn action={() => resumeApp.addExperience()} info={"Experience"}/>
      </CardCollapse>
    </>
  )
}

function AddBtn({ action, info }) {
  return (
    <button 
      className="primary-add-btn"
      onClick={action}
    >
      <Plus size={24} color='#333232' />
      Add {info}
    </button>
  );
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

function MedIconBtn( {action, jsxIcon: Icon, destructive=false} ){
  let classStyle = 'med-icon-btn';
  if(destructive){
    classStyle = 'med-icon-btn destruct-hover';
  }

  return(
    <div className={classStyle} onClick={action}>
      <Icon
      size={20} 
      color='#333232'
      ></Icon>
    </div>
  )
}

function SmallIconBtn( {action, jsxIcon: Icon, destructive=false} ){
  let classStyle = 'small-icon-btn';
  if(destructive){
    classStyle = 'small-icon-btn destruct-hover';
  }

  return(
    <div className={classStyle} onClick={action}>
      <Icon
      size={16}
      color='#333232'
      ></Icon>
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

function DeleteInput( {label, obj, onEdit, deleteAction} ){
  return(
    <div className="input-container">
      <label>
        <div className='space-between-container'>
          {label} 
          <SmallIconBtn action={deleteAction} jsxIcon={Trash} destructive={true}></SmallIconBtn>
        </div>
        <input 
          className='input-main' 
          type='text' 
          name='label' 
          value={obj.link} 
          onChange={(e) => onEdit({ link: e.target.value })} />
      </label>
    </div>
  )
}

function TextAreaInput( {label, deleteAction} ){
  return(
    <div className="input-container">
      <label>
      <div className='space-between-container'>
        {label}
        <SmallIconBtn action={deleteAction} jsxIcon={Trash} destructive={true}></SmallIconBtn>
      </div>  
      <textarea className='input-text-area' resize='none'></textarea>
      </label>
    </div>
  )
}

function PersonalDetailsBlock( {children} ){
  return(
    <div className="info-block">
      <MainInput label={'Name'} type={'text'}></MainInput>
      <MainInput label={'Email'} type={'email'}></MainInput>
      <MainInput label={'Phone Number'} type={'text'}></MainInput>
      {children}
    </div>
  )
}

function EducationBlock( { obj, onEdit, removal } ){
  const [isMinimized, setMinimized] = useState(false);

  function handleMinimize(){
    setMinimized(!isMinimized);
  }

  function handleChange(event){
    const { name, value } = event.target;
    onEdit({ [name]: value });
  }

  return(
    <div className="info-block">
      <div className='card-header-container'>
        <h4>{obj.title || "New Education"}</h4>
        <div className="block-action-container">
          <MedIconBtn action={handleMinimize} jsxIcon={Minimize2}></MedIconBtn>
          <MedIconBtn action={removal} jsxIcon={Trash} destructive={true}></MedIconBtn>
        </div>
      </div>  
        {!isMinimized && (
          <div className='input-block'>
            <MainInput label={'School Name'} type={'text'} name={"school"} 
              value={obj.school} onChange={handleChange}></MainInput>
            <MainInput label={'Diploma'} type={'text'} name={"diploma"} 
              value={obj.diploma} onChange={handleChange}></MainInput>
            <div className='start-end-date'>
              <MainInput label={'Start Date'} type={'text'} name={"startDate"} 
                value={obj.startDate} onChange={handleChange}></MainInput>
              <MainInput label={'End Date'} type={'text'} name={"endDate"} 
                value={obj.endDate} onChange={handleChange}></MainInput>
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
          <MedIconBtn action={removal} jsxIcon={Trash} destructive={true}></MedIconBtn>
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