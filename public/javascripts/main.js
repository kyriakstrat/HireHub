



function counter(obj,counter){
    //counts the elements that are being displayed
    let arrowLeft,arrowRight,totalApps,from,to,pageNumber,applicationsArr;
    if(obj===0){
        arrowLeft = document.querySelector('.applications .left');
        arrowRight = document.querySelector('.applications .right');
        totalApps= document.querySelector('.applications .total-application');
        from = document.querySelector('.applications .from');
        to = document.querySelector('.applications .to');
        pageNumber = document.querySelector('.applications .page-number');
        applicationsArr = applications;

    }else{
       arrowLeft = document.querySelector('.my-applications .left');
       arrowRight = document.querySelector('.my-applications .right');
       totalApps = document.querySelector('.my-applications .total-application');
       from = document.querySelector('.my-applications .from');
       to = document.querySelector('.my-applications .to');
       pageNumber = document.querySelector('.my-applications .page-number');
       applicationsArr = myapplications;
    }
    pageNumber.innerHTML = counter;
    from.innerHTML = counter*5-4;
    to.innerHTML = Math.min(counter*5,applicationsArr.length);
    totalApps.innerHTML = applicationsArr.length;
    
    arrowLeft.addEventListener('click',()=>{
        pageNumber.innerHTML = counter;
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        totalApps.innerHTML = applicationsArr.length;
        
        counter = Math.max(1,counter-1);
        appsShow(applicationsArr, counter);
        pageNumber.innerHTML = counter;
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        if(counter<=1){
            counter=1;
            arrowLeft.style.opacity='0.3';
        }
        arrowRight.style.opacity='1';
        if(obj===0) num1 = counter;
        else num2 = counter;
    })
    arrowRight.addEventListener('click',()=>{
        pageNumber.innerHTML = counter;
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        totalApps.innerHTML = applicationsArr.length;
        counter = Math.min(Math.ceil(applicationsArr.length/5),counter+1);
        appsShow(applicationsArr, counter);
        pageNumber.innerHTML = counter;      
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        if(counter*5>=applicationsArr.length){
            arrowRight.style.opacity='0.3';
        }
        arrowLeft.style.opacity='1';
        if(obj===0) num1 = counter;
        else num2 = counter;
    })
    
}

function appsShow(applications,num){
    // shows 5 out of all the elements 
    // let applications = document.querySelectorAll('.applications .application');
    
    const show = applications.slice((num-1)*5,Math.min(applications.length,(num)*5));
    applications.forEach(app => {
        app.classList.add('hide');
    });
    show.forEach(app => {
        app.classList.remove('hide');
    });
}

function apply(){
    //apply button,puts an application to "my Applications sections"
    const applyNow = document.querySelectorAll('.applications .apply');
    const myApplicationsBox = document.querySelector('.my-applications .applications-box');
    const applicationsBox = document.querySelector('.applications .applications-box');

    applyNow.forEach((but)=>{but.addEventListener('click',()=>{
        
        app = but.parentNode.parentNode.parentNode;
        
        if(but.innerHTML=='Apply now'){
            but.innerHTML = 'Applied';
            app.querySelector('#description').classList.add('less');
            but.classList.add('hide2');
            but.nextSibling.classList.remove('hide2');
            but.nextSibling.nextSibling.innerHTML='Show More';
            // applications.splice(applications.Array.indexOf(app),1);

            let index = applications.indexOf(app);
            applications.splice(index,1);
            myapplications.push(app);

            myApplicationsBox.appendChild(app);


            // appsShow(myapplications,num2);
        }
        else{
            
            but.innerHTML='Apply now';
            app.querySelector('#description').classList.add('less');
            but.classList.add('hide2');
            but.nextSibling.classList.add('hide2');
            but.nextSibling.nextSibling.innerHTML='Show More';

            let index = myapplications.indexOf(app);
            myapplications.splice(index,1);
            
            applications.push(app);
            applicationsBox.appendChild(app);

        }
        if((num1-1)*5>=applications.length)num1=Math.max(1,num1-1);
        if((num2-1)*5>=myapplications.length)num2=Math.max(1,num2-1);
        appsShow(applications,num1);
        appsShow(myapplications,num2);
        counter(0,num1);
        counter(1,num2);
        }
        )
    });
}

function showMore(){
    const links = document.querySelectorAll('.show-more .more');
    links.forEach(link => {
        // console.log('Show more!')
        link.addEventListener('click',()=>{
            // console.log(link.parentNode.previousElementSibling);
            link.parentNode.previousElementSibling.classList.toggle('less');
            // link.previousElementSibling.classList.toggle('hide2');
            if(link.innerHTML=='Show More'){
                link.innerHTML='Show Less';
            }
            else{link.innerHTML = 'Show More';}
            
            
        })
    });
}

function statusBars(){
    const statusSpan =document.querySelectorAll('.status');
    for(span of statusSpan){
        // console.log(span);
        switch (span.innerHTML){
            case '0':
                span.innerHTML = 'Pending';
                span.style.backgroundColor = 'yellow'
                break;
            case '1':
                span.innerHTML = 'Accepted';
                span.style.backgroundColor = 'green'
                break;
            case '2':
                // console.log('2');
                span.innerHTML = 'Rejected';
                span.style.backgroundColor = 'red'
                break;
        }
    }
}


// main
const applications = Array.from(document.querySelectorAll('.applications .application'));
const myapplications = Array.from(document.querySelectorAll('.my-applications .application'));
const applicationsBox = document.querySelector('.applications .applications-box');
const myApplicationsBox = document.querySelector('.my-applications .applications-box');

const arrowLeftApllications = document.querySelector('.applications .left');
const arrowRightApplications = document.querySelector('.applications .right');
const totalAppsApllicsations = document.querySelector('.applications .total-application');
const fromApllications = document.querySelector('.applications .from');
const toApllications = document.querySelector('.applications .to');
const pageNumberApllications = document.querySelector('.applications .page-number');


const myarrowLeftApllications = document.querySelector('.my-applications .left');
const myarrowRightApplications = document.querySelector('.my-applications .right');
const mytotalAppsApllications = document.querySelector('.my-applications .total-application');
const myfromApllications = document.querySelector('.my-applications .from');
const mytoApllications = document.querySelector('.my-applications .to');
const mypageNumberApllications = document.querySelector('.my-applications .page-number');

// initializations
num1=1;
num2=1;
// counter(0,1);
// counter(1,1);
statusBars();
// appsShow(applications,num1);
// appsShow(myapplications,num2);
//apply(applications);
showMore();