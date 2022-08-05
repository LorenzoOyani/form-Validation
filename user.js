const form = document.querySelector("form");
const inputUsername = document.getElementById('username');
const inputUserEmail = document.getElementById('user-email');
const inputUserPassword = document.getElementById('user-password');
const inputUserPassword2 = document.getElementById('user-pasword2');


function showError(input, message){
  const inputElement = input.parentElement;
  inputElement.className= 'user-enter errror';
  const small = document.querySelector('small');
  small.textContent = message;
}

function showSuccess(input){
const inputElement =input.parentElement;
inputElement.className = 'user-enter success'
}
function checkEmail(input){
  const regex = "^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i";
  if(regex.test(input.value.trim())){
    showSuccess(input);
  } else{
    showError(input, 'Email is not valid');
  }
}

// check required fields
function checkRequired(inputArrays){
  inputArrays.forEach(function(input){
    if(input.value.trim()=== ""){
      showError(input, `${getRequiredFieldNames(input)} is required`);

    } else{
      showSuccess(input)
    }
  });

};

function checkPasswordLength(input, min, max){
  if(input.value.length < min){
    showError(input, 
      `${getRequiredFieldNames(input)} password must be atleast ${min} characters`)

  } else if(input.value.length > max){
    showError(input,
      `${getRequiredFieldNames(input)} password must be this ${max} characters`)
  } else{
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, 'passwords do not match');
  }
}

function getRequiredFieldNames(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}

form.addEventListener('submit', function(e){
  e.preventDefault();
  checkRequired([inputUsername, inputUserEmail, inputUserPassword, inputUserPassword2])
  checkPasswordLength(inputUsername, 3, 16);
  checkPasswordLength(inputUserPassword, 6, 25)
  checkPasswordLength(inputUserPassword2, 6, 25)
  checkEmail(inputUserEmail);
  checkPasswordMatch(inputUserPassword, inputUserPassword2)
})