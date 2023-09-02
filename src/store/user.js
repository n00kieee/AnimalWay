import {defineStore} from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  updateEmail,
} from "firebase/auth";
import router from "@/router";

export const useAuthStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userData: null,
    errMsg: '',
    successMsg: false,
    displayName: '',
    email: '',
    userId: '',
    emailVerified: '',
    creationTime: ''
  }),
  actions: {
    async register(email, password, name) {
      try {
        const auth = getAuth();
        const {user} = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        await sendEmailVerification(auth.currentUser);
        this.userData = {email: user.email, uid: user.uid};
        await router.push('/profile');
      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.errMsg = 'Пользователь с таким адресом электронной почты уже существует'
            break
          default:
            this.errMsg = 'Ошибка регистрации'
            break
        }
      }
    },
    async login(email, password) {
      try {
        const auth = getAuth();
        const {user} = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {email: user.email, uid: user.uid};
        await router.push("/profile");
      } catch (err) {
        switch (err.code) {
          case "auth/invalid-email":
            this.errMsg = "Неверный адрес электронной почты";
            break;
          case "auth/wrong-password":
            this.errMsg = "Неверный пароль";
            break;
          case "auth/user-not-found":
            this.errMsg = "Учетная запись с таким адресом электронной почты не найдена";
            break;
          default:
            this.errMsg = "Неправильный адрес электронной почты или пароль";
            break;
        }
      }
    },
    async forgetPass(email) {
      try {
        const auth = getAuth();
        const user = await sendPasswordResetEmail(
          auth,
          email
        );
        this.successMsg = true;
      } catch (err) {
        this.userData = null;
        switch (err.code) {
          case 'auth/user-not-found':
            this.errMsg = 'Пользователь с таким адресом электронной почты не зарегистрирован'
            break
          case 'auth/missing-email':
            this.errMsg = 'Введите адрес электронной почты'
            break
          default:
            this.errMsg = 'Адрес электронной почты неверен'
            break
        }
      }
    },
    async getUserInfo() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.userId = user.uid
        this.emailVerified = user.emailVerified;
        this.creationTime = user.metadata.creationTime
      }
    },
    async logOut() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.userData = null;
        await router.push("/");
      } catch (error) {
        console.log(error)
      }
    },
    // async updateUserData(email, name) {
    //   const auth = getAuth();
    //   updateEmail(auth.currentUser, email).then(() => {
    //     sendEmailVerification(auth.currentUser)
    //
    //   }).then(() => {
    //     updateProfile(auth.currentUser, {
    //       displayName: name
    //     })
    //   }).catch((error) => {
    //     switch (error) {
    //       case 'auth/requires-recent-login':
    //         this.errMsg = 'Для того что бы изменения вступили в силу, необходимо перезайти в лк!'
    //         break
    //       case 'auth/too-many-requests':
    //         this.errMsg = 'Слишком много запросов на сервер'
    //         break
    //       default:
    //         this.errMsg = 'Повторите позже!'
    //         break
    //     }
    //   });
    // },

    async updateUserData(name, email) {
      try {
        const auth = getAuth();
        await updateEmail(auth.currentUser, email);
        console.log(email)
        await sendEmailVerification(auth.currentUser);
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      } catch (err) {
        switch (err.code) {
          case 'auth/requires-recent-login':
            this.errMsg = 'Для того что бы изменения вступили в силу, необходимо перезайти в лк!'
            break
          case 'auth/too-many-requests':
            this.errMsg = 'Слишком много запросов на сервер'
            break
          case 'auth/invalid-email':
            this.errMsg = 'Электронный адрес некорректен'
            break
          default:
            this.errMsg = 'Повторите позже!'
            break
        }
      }
    }
  },
})
