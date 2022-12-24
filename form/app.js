var form=document.querySelector("#userForm");
const allUsersData= [];

// function to reset the form

const resetForm=function() {
    form.classList.remove('was-validate')
    const name= document.getElementById('name');
    name.value= "";

    const address= document.getElementById('address');
    address.value= "";

    const number= document.getElementById('number');
    number.value= "";

    const email= document.getElementById('email');
    email.value= "";

    const image= document.getElementById('image');
    image.value= "";

    const genderEl = document.querySelectorAll('input[name="gender"]');
    for(const rb of genderEl){
        rb.checked=false;
    }

    const skillEl = document.querySelectorAll('input[name="skill"]');
    for(const rb of skillEl){
        rb.checked=false;
    }
};

// function to get the data of the form

const getData= function(){
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const number=document.getElementById('number').value;
    const image=document.getElementById('image').value;

    let gender;
    let skill=[];

    const genderEl=document.querySelectorAll('input[name="gender"]');
    for(const rb of genderEl){
        if (rb.checked){
            gender=rb.value;
            break;
        }
    };

    const skillEl=document.querySelectorAll('input[name="skill"]');
    for(const rb of skillEl){
        if (rb.checked){
           skill.push(rb.value);
            break;
        }
    }
     return {name,email,number,image,gender,skill};
};

//  adding event listner to the "enroll student" button with type submit to submit the form

form.addEventListener("submit", function(event){
    event.preventDefault();
    if(form.checkValidity()){
        const data = getData();
        allUsersData.push(data);
        printResult(data);
        resetForm();        
    } else {
        form.classList.add('was-validated');
    };
    removeSpan();
});

// function to remove the span tag ("fill  the form to enroll the students")

function removeSpan(){
    var span= document.getElementById("span");
    if(span){
        span.remove();
    }
};

// function to print the form data in the right side of div by generationg html elements inside the div.

function printResult(data) {
    const resultEl= document.getElementById('enrolled-students');
    let sectionHeading = null;
      if(allUsersData.length ==1){

        sectionHeading=document.createElement('div');
        const description= document.createElement('p');
        description.innerHTML="Description";
        description.className="description";

        const image=document.createElement('p'); 
        image.innerHTML="Image"
        image.className="Image";

        sectionHeading.className="sectionHeading";
        sectionHeading.append(description,image);
      };

      const wrapper = document.createElement('div');
      wrapper.className= "wrapper";
      wrapper.addEventListener('click',function(e){
        console.log(e.target.className);
        if(e.target.className.includes('userDeleteBtn')){
            console.log('aaadfasdfasdf');
            e.currentTarget.remove();
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = "+";
      deleteBtn.className="userDeleteBtn";

      const textInfoContainer = document.createElement('div');
      textInfoContainer.className="textInfoContainer";

      const imageContainer = document.createElement('div');
      imageContainer.className="imageContainer";

      const imageHyperlink = document.createElement('a');
      imageHyperlink.href=data.image;
      imageHyperlink.target="_blank";

      let name=document.createElement('p');
      name.className="infoText userName";
      name.innerHTML=data.name;

      let gender=document.createElement('p');
      gender.className="infoText gender";
      gender.innerHTML=data.gender;

      let email=document.createElement('p');
      email.className="infoText email";
      email.innerHTML=data.email;

      let skill = document.createElement('p');
      skill.className="infoText skill";
      skill.innerHTML= data.skill.join(', ');

      let userImage=document.createElement('img');
      userImage.className="userImage";
      userImage.src=data.image;

      textInfoContainer.append(name,gender,email,website,skill);
      imageHyperlink.appendChild(userImage);
      imageContainer.appendChild(imageHyperlink);

      wrapper.append(textInfoContainer,imageContainer,deleteBtn);

      if(sectionHeading== null){
        resultEl.append(wrapper);
      } else {
        resultEl.append(sectionHeading,wrapper)
      };
};

//  