import { useState } from 'react'
import { Icon, Plus, ChevronDown, Minimize2, Trash} from 'lucide-react';
import { Education, Experience, ContactLink, JobPoint, resumeApp } from './data';
import './App.css'

export function App(){
  const [resume, setResume] = useState(resumeApp);

  return(
    <div>
      <div>
        <ResumeInputs resume={resume} setResume={setResume}/>
      </div>
      <div>
        <ResumePreview resume={resume}/>
      </div>
    </div>
  )

}

function ResumePreview( {resume} ){
  function generateExperience(obj){
    return obj.experienceList.map((experience) => (
      <ResumeExperiencePoint obj={experience}/>
    ))
  }

  return (
    <div className='resume-preview'>
      <div>
        <SectionHeader header={"Experience"}/>
        {generateExperience(resume)}
      </div>
      <SectionHeader header={"Education"}/>
    </div>
  )
}

function ResumeInputs( {resume, setResume} ){
  function handleAdd(list, classObj){
    setResume(prev => ({
      ...prev, 
      [list]: [...prev[list], new classObj()]
    }))    
  }

  function handleRemove(obj, list){
    setResume(prev => ({
      ...prev, 
      [list]: prev[list].filter(e => e.id !== obj.id)
    }))
  }

  function handleEdit(id, updated, list){
    setResume(prev => ({
      ...prev, 
      [list]: prev[list].map(e =>
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
        onEdit={(updated) => handleEdit(link.id, updated, "links")} 
        deleteAction={() => handleRemove(link, "links")}/>
    ))
  }

  function generateEducationBlock(){
    return resume.educationList.map((edu) => (
      <EducationBlock 
        key={edu.id} 
        obj={edu} 
        onEdit={(updated) => handleEdit(edu.id, updated, "educationList")} 
        removal={() => handleRemove(edu, "educationList")}/>
    ))
  }

  function generateExperienceBlock(){
    return resume.experienceList.map((ex) => (
      <ExperienceBlock
        key={ex.id}
        obj={ex}
        onEdit={(updated) => handleEdit(ex.id, updated, "experienceList")}
        removal={() => handleRemove(ex, "experienceList")}
        addJobPoint={handleAddJobPoint}
        removeJobPoint={handleRemoveJobPoint}
        handleEdit={handleEdit}
      />
    ))
  }

  function handleAddJobPoint(experienceId) {
    setResume(prev => ({
      ...prev,
      experienceList: prev.experienceList.map(ex =>
        ex.id === experienceId ? { ...ex, jobPoints: [...ex.jobPoints, new JobPoint()] }: ex
      )
    }));
  }

  function handleRemoveJobPoint(experienceId, jobPointId) {
    setResume(prev => ({
      ...prev,
      experienceList: prev.experienceList.map(ex =>
        ex.id === experienceId ? { ...ex, jobPoints: ex.jobPoints.filter(jp => jp.id !== jobPointId) }: ex
      )
    }));
  }

  return (
    <>
      <CardCollapse header={'Personal Details'}>
        <PersonalDetailsBlock>
          {generateLinks()}
        </PersonalDetailsBlock> 
        <AddBtn action={() => handleAdd("links", ContactLink)} info={"Links"}/>
      </CardCollapse>
      <CardCollapse header={'Education'}>
        {generateEducationBlock()}
        <AddBtn action={() => handleAdd("educationList", Education)} info={"Education"} resume={resume}/>
      </CardCollapse>
       <CardCollapse header={'Experience'}>
        {generateExperienceBlock()}
        <AddBtn action={() => handleAdd("experienceList", Experience)} info={"Experience"}/>
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

function MainInput( {label, type, value, name, onChange} ){
  return(
    <div className="input-container">
      <label>
      {label}
      <input className='input-main' type={type} value={value} name={name} onChange={onChange}></input>
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
        <h4>{obj.school || "New Education"}</h4>
        <div className="block-action-container">
          <MedIconBtn action={handleMinimize} jsxIcon={Minimize2}/>
          <MedIconBtn action={removal} jsxIcon={Trash} destructive={true}/>
        </div>
      </div>  
        {!isMinimized && (
          <div className='input-block'>
            <MainInput label={'School Name'} type={'text'} name={"school"} 
              value={obj.school} onChange={handleChange}/>
            <MainInput label={'Diploma'} type={'text'} name={"diploma"} 
              value={obj.diploma} onChange={handleChange}/>
            <div className='start-end-date'>
              <MainInput label={'Start Date'} type={'text'} name={"startDate"} 
                value={obj.startDate} onChange={handleChange}/>
              <MainInput label={'End Date'} type={'text'} name={"endDate"} 
                value={obj.endDate} onChange={handleChange}/>
            </div>
          </div>
        )}
    </div>
  )
}

function ExperienceBlock( { obj, onEdit, removal, addJobPoint, removeJobPoint } ){
  const [isMinimized, setMinimized] = useState(false);

  function handleMinimize(){
    setMinimized(!isMinimized);
  }

  function handleChange(event){
    const { name, value } = event.target;
    onEdit({ [name]: value });
  }

  function generateJobPoints(){
    return obj.jobPoints.map((job, index) => (
      <TextAreaInput 
        key={job.id} 
        label={`Job Point ${index + 1}`} 
        onChange={(updated) => onEdit({ jobPoints: obj.jobPoints.map(jp => 
          jp.id === job.id ? { ...jp, ...updated } : jp
        )})}
        deleteAction={() => removeJobPoint(obj.id, job.id)}/>
    ))
  }

  return(
    <div className="info-block">
      <div className='card-header-container'>
        <h4>{obj.company || "New Experience"}</h4>
        <div className="block-action-container">
          <MedIconBtn action={handleMinimize} jsxIcon={Minimize2}/>
          <MedIconBtn action={removal} jsxIcon={Trash} destructive={true}/>
        </div>
      </div>  
        {!isMinimized && (
          <div className='input-block'>
            <MainInput label={'Company Name'} type={'text'} name={'company'} 
              value={obj.company} onChange={handleChange}/>
            <MainInput label={'Job Title'} type={'text'} name={'title'} 
              value={obj.title} onChange={handleChange}/>
            <MainInput label={'Location'} type={'text'} name={'location'} 
              value={obj.location} onChange={handleChange}/>
            <div className='start-end-date'>
              <MainInput label={'Start Date'} type={'text'} name={'startDate'} 
              value={obj.startDate} onChange={handleChange}/>
              <MainInput label={'End Date'} type={'text'} name={'endDate'} 
              value={obj.endDate} onChange={handleChange}/>
            </div>
            {generateJobPoints()}
            <JobBtn action={() => addJobPoint(obj.id)}/>
          </div>
        )}
    </div>
  )
}

function SectionHeader( {header} ){
  return(
    <div>
      <h3>{header}</h3>
      <div className='divider'/>
    </div>
  )
}

function ResumeExperiencePoint( {obj} ){
  function generateJobPoints(jobObj){
    return jobObj.jobPoints.map((jobPoint) => (
      <li>{jobPoint.point}</li>
    ))
  }

  return(
    <div>
      <div>
        <h4>{obj.title}</h4>
        <h4>{`${obj.startDate} - ${obj.endDate}`}</h4>
      </div>
      <div>
        <h5>{obj.company}</h5>
        <p>{`- ${obj.location}`}</p>
      </div>
      <ul>
        {generateJobPoints(obj)}
      </ul>
    </div>
  )
}