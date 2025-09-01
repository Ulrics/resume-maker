import { useState } from 'react'
import { Plus, ChevronDown, Minimize2, Trash, RotateCcw, NotebookText } from 'lucide-react';
import { Education, Experience, ContactLink, JobPoint, resumeApp, exampleResume  } from './data';
import './App.css'

export function App(){
  const [resume, setResume] = useState(resumeApp);

  function clearResume(){
    setResume(resumeApp);
  }
  
  function fillExample(){
    setResume(exampleResume);
  }

  return(
    <div className='flex-container'>
      <div className='resume-inputs-container'>
        <div className='card-collapse'>
          <h2>Resume Builder</h2>
          <div className='two-btn-container'>
            <GeneralBtn action={clearResume} copy={'Clear All'} Icon={RotateCcw}/>
            <GeneralBtn action={fillExample} copy={'Example Resume'} Icon={NotebookText}/>
          </div>
        </div>
        <ResumeInputs resume={resume} setResume={setResume}/>
      </div>
      <div className='resume-preview-container'>
        <ResumePreview resume={resume}/>
      </div>
    </div>
  )
}

function ResumePreview( {resume} ){
  function generateResume(obj, list, Component){
    return obj[list].map((resumePoint) => (
      <Component key={resumePoint.id} obj={resumePoint}/>
    ))
  }

  function generateLinks(obj){
    return obj.links.map((links) => (
      <p key={links.id}>{links.link}</p>
    ))
  }

  return (
    <div className='resume-preview'>
      <div>
        <h2>{resume.name}</h2>
        <div className='contact-links-container'>
          <h4 className='preview-h4'>Contact:</h4>
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
        </div>
        <div className='contact-links-container'>
          <h4 className='preview-h4'>Links:</h4>
          {generateLinks(resume)}
        </div>
      </div>
      <div>
        <SectionHeader header={"Experience"}/>
        {generateResume(resume, 'experienceList', ResumeExperiencePoint)}
      </div>
      <div>
        <SectionHeader header={"Education"}/>
        {generateResume(resume, 'educationList', ResumeEducationPoint)}
      </div>
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

    function handlePersonalEdit(updated) {
    setResume(prev => ({
      ...prev,
      ...updated, 
    }));
  }

  return (
    <>
      <CardCollapse header={'Personal Details'}>
        <PersonalDetailsBlock obj={resume} onEdit={(updated) => handlePersonalEdit(updated)} >
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
      <Plus size={24} color='#095165' />
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

function GeneralBtn( {action, copy, Icon} ){
    return(<button 
      className="secondary-add-btn"
      onClick={action}>
      <Icon size={24} color='#333232'></Icon>
      {copy}
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

function MainInput( {label, type, placeholder, value, name, onChange} ){
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

function TextAreaInput( {label, value, onChange, deleteAction} ){
  function handleChange(e) {
    onChange({ point: e.target.value }); 
  }
  return(
    <div className="input-container">
      <label>
      <div className='space-between-container'>
        {label}
        <SmallIconBtn action={deleteAction} jsxIcon={Trash} destructive={true}></SmallIconBtn>
      </div>  
      <textarea className='input-text-area' resize='none' value={value} onChange={(updated) => handleChange(updated)}></textarea>
      </label>
    </div>
  )
}

function PersonalDetailsBlock( {obj, onEdit, children} ){
  
  function handleChange(event){
    const { name, value } = event.target;
    onEdit({ [name]: value });
  }

  return(
    <div className="info-block">
      <MainInput label={'Name'} type={'text'} name={"name"} 
              value={obj.name} onChange={handleChange}/>
      <MainInput label={'Email'} type={'email'} name={"name"} 
              value={obj.email} onChange={handleChange}/>
      <MainInput label={'Phone Number'} type={'text'}name={"phone"} 
              value={obj.phone} onChange={handleChange}/>
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
        value={job.point}
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
      <h3 className='preview-h3'>{header}</h3>
      <div className='divider'/>
    </div>
  )
}

function ResumeEducationPoint( {obj} ){
  return(
    <div>
      <div className='space-between-container'>
        <h4 className='preview-h4'>{`${obj.school} - ${obj.diploma}`}</h4>
        <h4 className='preview-h4'>{`${obj.startDate} - ${obj.endDate}`}</h4>
      </div>
    </div>
  )
}

function ResumeExperiencePoint( {obj} ){
  function generateJobPoints(jobObj){
    return jobObj.jobPoints.map((jobPoint) => (
      <li key={jobPoint.id}>{jobPoint.point}</li>
    ))
  }

  return(
    <div>
      <div className='space-between-container'>
        <h4 className='preview-h4'>{obj.title}</h4>
        <h4 className='preview-h4'>{`${obj.startDate} - ${obj.endDate}`}</h4>
      </div>
      <div className='gap-container'>
        <h5>{obj.company}</h5>
        <p>{`- ${obj.location}`}</p>
      </div>
      <ul>
        {generateJobPoints(obj)}
      </ul>
    </div>
  )
}