

class Resume{
    constructor(){
        this.name ="";
        this.email="";
        this.phone="";
        this.links=[];
        this.educationList=[];
        this.experienceList=[];
    }

    addEducation(){
        const newEducation = new Education();
        this.educationList.push(newEducation);
    }

    addExperience(){
        const newExperience = new Experience();
        this.experienceList.push(newExperience);
    }

    removeEducation(id){
        const isId = (element) => element.id === id;
        const index = this.educationList.findIndex(isId);
        this.educationList.splice(index, 1);
    }

    removeEducation(id){
        const isId = (element) => element.id === id;
        const index = this.experienceList.findIndex(isId);
        this.experienceList.splice(index, 1);
    }
}

class Education{
    constructor(){
        this.school="";
        this.diploma="";
        this.startDate="";
        this.endDate="";

        this.id=crypto.randomUUID();
    }
}

class Experience{
    constructor(){
        this.title="";
        this.company="";
        this.location="";
        this.startDate="";
        this.endDate="";
        this.jobPoints=[""];

        this.id=crypto.randomUUID();
    }
}