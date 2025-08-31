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
