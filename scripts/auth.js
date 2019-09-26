
auth.onAuthStateChanged(user => {
   // console.log(user)
    if (user) {
        db.collection('guides').onSnapshot(snapshot =>{
            setupGuides(snapshot.docs);
            setupUI(user);
        }).catch(err =>{
            console.log(err.message)
        });
    }else{
        setupUI();
        setupGuides([]);
    }
  });




  const createForm = document.querySelector('#create-form');
  createForm.addEventListener('submit', (e) => {
      e.preventDefault();

      db.collection('guides').add({
          title: createForm['title'].value,
          content: createForm['content'].value
        }).then(() => {
            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
            createForm.reset();
        })
  })





const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(cred =>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });

});

const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) =>{
    e.preventDefault();
    auth.signOut();
});


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(cred =>{
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
})