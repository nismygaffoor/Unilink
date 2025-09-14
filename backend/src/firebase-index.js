// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { auth } = require('../firebase-config');

// const app = express();
// app.use(cors());
// app.use(express.json());



// // Users API with Firebase Firestore
// app.get('/api/users', async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection('users').orderBy('points', 'desc').get();
//     const users = [];
//     usersSnapshot.forEach(doc => {
//       users.push({ id: doc.id, ...doc.data() });
//     });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/users/:email', async (req, res) => {
//   try {
//     const userSnapshot = await db.collection('users').where('email', '==', req.params.email).get();
//     if (userSnapshot.empty) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const userDoc = userSnapshot.docs[0];
//     res.json({ id: userDoc.id, ...userDoc.data() });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Signup route with Firebase Auth
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check if email is from a university domain
//     if (!isUniversityEmail(email)) {
//       return res.status(400).json({ error: 'Please use your university email address' });
//     }

//     // Check if user already exists
//     const existingUser = await db.collection('users').where('email', '==', email).get();
//     if (!existingUser.empty) {
//       return res.status(409).json({ error: 'Email already registered' });
//     }

//     // Create user in Firebase Auth
//     const userRecord = await auth.createUser({
//       email: email,
//       password: password,
//       displayName: name
//     });

//     // Create user document in Firestore
//     const userData = {
//       name,
//       email,
//       points: 0,
//       badge: '🎓 Newcomer',
//       notes: 0,
//       events: 0,
//       forumPosts: 0,
//       createdAt: new Date().toISOString()
//     };

//     await db.collection('users').doc(userRecord.uid).set(userData);

//     res.status(201).json({ name, email, uid: userRecord.uid });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Login route - This will be handled by Firebase Auth on frontend
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password required' });
//     }

//     // Get user from Firestore
//     const userSnapshot = await db.collection('users').where('email', '==', email).get();
//     if (userSnapshot.empty) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const userDoc = userSnapshot.docs[0];
//     const userData = userDoc.data();
    
//     res.json({ 
//       name: userData.name, 
//       email: userData.email, 
//       uid: userDoc.id,
//       points: userData.points,
//       badge: userData.badge
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // University email validation function
// function isUniversityEmail(email) {
//   const universityDomains = [
//     'university.ac.lk',
//     'university.edu.lk',
//     'university.lk',
//     'ac.lk',
//     'edu.lk',
//     // Add more Sri Lankan university domains
//     'mrt.ac.lk',        // University of Moratuwa
//     'cmb.ac.lk',        // University of Colombo
//     'pdn.ac.lk',        // University of Peradeniya
//     'jfn.ac.lk',        // University of Jaffna
//     'rjt.ac.lk',        // University of Rajarata
//     'sab.ac.lk',        // University of Sabaragamuwa
//     'ou.ac.lk',         // Open University
//     'nsbm.lk',          // NSBM
//     'iit.ac.lk',        // IIT
//     'sliit.lk',         // SLIIT
//     'icbt.lk',          // ICBT
//     'apiit.lk',         // APIIT
//     'kdu.ac.lk',        // KDU
//     'sltc.ac.lk',       // SLTC
//     'sliate.ac.lk',     // SLIATE
//     'vau.ac.lk',        // Vavuniya University
//     'easternuni.ac.lk', // Eastern University
//     'seu.ac.lk',        // South Eastern University
//     'wayamba.ac.lk',    // Wayamba University
//     'uwu.ac.lk',        // Uva Wellassa University
//     'uom.lk',           // University of Moratuwa (alternative)
//     'ucsc.cmb.ac.lk',   // UCSC
//     'uok.ac.lk',        // University of Kelaniya
//     'uoc.ac.lk',        // University of Colombo (alternative)
//     'uop.ac.lk',        // University of Peradeniya (alternative)
//   ];

//   const domain = email.split('@')[1]?.toLowerCase();
//   return universityDomains.includes(domain);
// }

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Firebase backend server listening on port ${PORT}`);
// });
