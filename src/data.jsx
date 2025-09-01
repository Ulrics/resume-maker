export class Resume{
    constructor(){
        this.name ="";
        this.email="";
        this.phone="";
        this.links=[];
        this.educationList=[];
        this.experienceList=[];
    }

    addLinks(){
        const newContact = new ContactLink();
        this.links.push(newContact);
    }

    addEducation(){
        const newEducation = new Education();
        this.educationList.push(newEducation);
    }
    addExperience(){
        const newExperience = new Experience();
        this.experienceList.push(newExperience);
    }
}

export class Education{
    constructor(){
        this.school="";
        this.diploma="";
        this.startDate="";
        this.endDate="";

        this.id=crypto.randomUUID();
    }
}

export class Experience{
    constructor(){
        this.title="";
        this.company="";
        this.location="";
        this.startDate="";
        this.endDate="";
        this.jobPoints=[];

        this.id=crypto.randomUUID();
    }

    addJobPoint(){
        const newPoint = new JobPoint();
        this.jobPoints.push(newPoint);
    }
}

export class JobPoint{
    constructor(){
        this.point="";
        this.id=crypto.randomUUID();
    }
}

export class ContactLink{
    constructor(){
        this.link="";
        this.id=crypto.randomUUID();
    }
}

export const resumeApp = new Resume();
resumeApp.addEducation();
resumeApp.addExperience();
resumeApp.experienceList[0].addJobPoint();

export const exampleResume = {
    name: 'John Smith',
    email: 'email@gmail.com',
    phone: '216-555-2368',
    links: [{link: 'www.github.com', id: crypto.randomUUID()}, 
            {link: 'www.portfolio.com', id: crypto.randomUUID()}],
  educationList: [
    {
      school: 'Stanford University',
      diploma: 'Bachelor of Science in Engineering',
      startDate: '2016',
      endDate: '2020',
    }
  ],
  experienceList: [
    {
      id: crypto.randomUUID(),
      company: 'Tesla Motors',
      title: 'Mechanical Engineering Intern',
      location: 'Palo Alto, CA',
      startDate: 'June 2019',
      endDate: 'September 2019',
      jobPoints: [
        { id: crypto.randomUUID(), point: 'Designed and prototyped components for electric drivetrains using SolidWorks.' },
        { id: crypto.randomUUID(), point: 'Collaborated with cross-functional teams to improve battery module efficiency by 12%.' },
        { id: crypto.randomUUID(), point: 'Performed data analysis on component stress tests, reducing failure rate by 8%.' },
      ]
    },
    {
      id: crypto.randomUUID(),
      company: 'Google',
      title: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      startDate: 'June 2020',
      endDate: 'September 2020',
      jobPoints: [
        { id: crypto.randomUUID(), point: 'Developed internal tools in React and Node.js to automate workflow processes.' },
        { id: crypto.randomUUID(), point: 'Optimized an API endpoint that reduced query time by 40%.' },
        { id: crypto.randomUUID(), point: 'Worked closely with UX designers to implement accessible front-end components.' },
      ]
    },
    {
      id: crypto.randomUUID(),
      company: 'Lockheed Martin',
      title: 'Systems Engineer I',
      location: 'Bethesda, MD',
      startDate: '2021',
      endDate: 'Present',
      jobPoints: [
        { id: crypto.randomUUID(), point: 'Led design validation testing for avionics systems on next-gen aircraft.' },
        { id: crypto.randomUUID(), point: 'Documented and maintained system requirements to comply with FAA standards.' },
        { id: crypto.randomUUID(), point: 'Coordinated with hardware and software teams to resolve integration issues.' },
      ]
    }
  ]
}
