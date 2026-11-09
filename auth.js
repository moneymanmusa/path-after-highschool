// Thin wrapper around Firebase Auth + Firestore (compat SDK, loaded only when configured).
// Exposes window.Auth for app.js. When FIREBASE_CONFIG is null, Auth.enabled is false.
(function () {
  "use strict";
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const listeners = [];
  let user = null;
  let auth = null;
  let db = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }

  const enabled = !!window.FIREBASE_CONFIG;
  const ready = !enabled ? Promise.resolve() : (async () => {
    await loadScript(SDK + "firebase-app-compat.js");
    await loadScript(SDK + "firebase-auth-compat.js");
    await loadScript(SDK + "firebase-firestore-compat.js");
    firebase.initializeApp(window.FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    await new Promise(resolve => {
      let first = true;
      auth.onAuthStateChanged(u => {
        user = u;
        listeners.forEach(fn => fn(u));
        if (first) { first = false; resolve(); }
      });
    });
  })();

  const friendly = err => ({
    "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Use a password with at least 6 characters.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/user-not-found": "Email or password is incorrect.",
    "auth/too-many-requests": "Too many attempts. Please wait a minute and try again."
  }[err && err.code] || (err && err.message) || "Something went wrong. Please try again.");

  window.Auth = {
    enabled,
    ready,
    friendly,
    current: () => user,
    onChange: fn => { listeners.push(fn); },
    async signUp(name, email, password) {
      await ready;
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      if (name) await cred.user.updateProfile({ displayName: name });
      user = auth.currentUser;
      listeners.forEach(fn => fn(user));
      return user;
    },
    async logIn(email, password) {
      await ready;
      const cred = await auth.signInWithEmailAndPassword(email, password);
      return cred.user;
    },
    async logOut() { await ready; await auth.signOut(); },
    async resetPassword(email) { await ready; await auth.sendPasswordResetEmail(email); },
    // Saved courses live at users/{uid} → { courses: [...] }
    async loadCourses() {
      if (!user) return null;
      const snap = await db.collection("users").doc(user.uid).get();
      return snap.exists ? (snap.data().courses || []) : null;
    },
    async saveCourses(courses) {
      if (!user) return;
      await db.collection("users").doc(user.uid).set({ courses, updated: Date.now() }, { merge: true });
    }
  };
})();
