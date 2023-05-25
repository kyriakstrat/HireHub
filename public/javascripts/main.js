



function counter(counter){
    //counts the elements that are being displayed
    let arrowLeft,arrowRight,totalApps,from,to,pageNumber,applicationsArr;
    
    arrowLeft = document.querySelector('.applications .left');
    arrowRight = document.querySelector('.applications .right');
    totalApps= document.querySelector('.applications .total-application');
    from = document.querySelector('.applications .from');
    to = document.querySelector('.applications .to');
    pageNumber = document.querySelector('.applications .page-number');
    applicationsArr = Array.from(document.querySelectorAll('.applications .application'));
    // 
    pageNumber.innerHTML = counter;
    from.innerHTML = counter*5-4;
    to.innerHTML = Math.min(counter*5,applicationsArr.length);
    console.log(applicationsArr.length);
    
    arrowLeft.addEventListener('click',()=>{
        pageNumber.innerHTML = counter;
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        
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
    })
    
}

function counter2(counter){
    //counts the elements that are being displayed
    let arrowLeft,arrowRight,totalApps,from,to,pageNumber,applicationsArr;
    
    arrowLeft = document.querySelector('.my-applications .left');
    arrowRight = document.querySelector('.my-applications .right');
    totalApps= document.querySelector('.my-applications .total-application');
    from = document.querySelector('.my-applications .from');
    to = document.querySelector('.my-applications .to');
    pageNumber = document.querySelector('.my-applications .page-number');
    applicationsArr = Array.from(document.querySelectorAll('.my-applications .application'));
    // 
    pageNumber.innerHTML = counter;
    from.innerHTML = counter*5-4;
    to.innerHTML = Math.min(counter*5,applicationsArr.length);
    console.log(applicationsArr.length);
    
    arrowLeft.addEventListener('click',()=>{
        pageNumber.innerHTML = counter;
        from.innerHTML = counter*5-4;
        to.innerHTML = Math.min(counter*5,applicationsArr.length);
        
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
if(applications.length){
    counter(1);
    counter2(1);
    statusBars();
    appsShow(applications,num1);
    // appsShow(myapplications,num2);
    // apply(applications);
    showMore();
}else{
    counter2(1);
    appsShow(applications,num1);
    statusBars();

    // appsShow(myapplications,num2);
    // apply(applications);
    showMore();

}

// counter(0,1);
// counter(1,1);
