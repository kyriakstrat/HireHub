const signUpEmployer = document.querySelector("#but1");
const signUpSeeker = document.querySelector("#but2");
const logo = document.querySelector(".logo");
const lower = document.querySelectorAll(".lower");
const redirect1 = document.querySelector(".backwards1");
const redirect2 = document.querySelector(".backwards2");
const close = document.querySelector('.close');
const loginBut = document.querySelectorAll('.signIn');
const loginForm = document.querySelector('.loginFrame');

close.addEventListener('click',()=>{
    logo.classList.toggle("fade2");
    const login = document.querySelectorAll('.login');

    login.forEach((item)=>{
        item.classList.toggle('fade');
    }
    );
    loginForm.classList.toggle("fade2");
})

loginBut.forEach((but)=>{
    but.addEventListener('click', () => {
            console.log(loginBut);
            logo.classList.toggle("fade2");
            const login = document.querySelectorAll('.login');

            login.forEach((item)=>{
                item.classList.toggle('fade');
            }
            );
            loginForm.classList.toggle("fade2");
        });
}
);


signUpSeeker.addEventListener("click",()=>{
    // console.log("seeker clicked");
    logo.classList.toggle("fade");
    lower[1].classList.toggle("fade");
    const upper=document.querySelector("#item2 .login");
    const form1 = document.querySelector("#form1");
    const item1 = document.querySelector("#item1");
    // console.log(item1);
    item1.classList.toggle("fade");
    form1.style.left = "0px";
    form1.classList.toggle('hidden');
    upper.classList.toggle("translateY");
})


redirect1.addEventListener("click",()=>{
    console.log("redirect clicked");
    const form1 = document.querySelector("#form1");
    const upper=document.querySelector("#item2 .login");
    form1.style.left = "-100vw";
    form1.classList.toggle('hidden');

    logo.classList.toggle("fade");
    lower[1].classList.toggle("fade");
    const item1 = document.querySelector("#item1");
    item1.classList.toggle("fade");
    upper.classList.toggle("translateY");
})

signUpEmployer.addEventListener("click",()=>{

       console.log("recruiter clicked");
       logo.classList.toggle("fade");
       lower[0].classList.toggle("fade");
       const upper=document.querySelector("#item1 .login");
       upper.classList.toggle("translateY");
       const form2 = document.querySelector("#form2");
       const item2 = document.querySelector("#item2");
    //    console.log(item2);
       item2.classList.toggle("fade");
       form2.classList.toggle('hidden');
       form2.style.right = "0px";
    
})

redirect2.addEventListener("click",()=>{
    const form2 = document.querySelector("#form2");
    const upper=document.querySelector("#item1 .login");

    form2.style.right = "-100vw";
    form2.classList.toggle('hidden');

    logo.classList.toggle("fade");
    lower[0].classList.toggle("fade");
    const item2 = document.querySelector("#item2");
    item2.classList.toggle("fade");
    
    upper.classList.toggle("translateY");
})