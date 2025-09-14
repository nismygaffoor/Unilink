import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';

export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, name: string) {
    try {
      // Check if email is from a university domain
      if (!this.isUniversityEmail(email)) {
        return {
          success: false,
          error: 'Please use your university email address'
        };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update display name
      await updateProfile(user, { displayName: name });
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if email is from a university domain
  static isUniversityEmail(email: string): boolean {
    const universityDomains = [
      'university.ac.lk',
      'university.edu.lk',
      'university.lk',
      'ac.lk',
      'edu.lk',
      // Add more Sri Lankan university domains
      'mrt.ac.lk',        // University of Moratuwa
      'cmb.ac.lk',        // University of Colombo
      'pdn.ac.lk',        // University of Peradeniya
      'jfn.ac.lk',        // University of Jaffna
      'rjt.ac.lk',        // University of Rajarata
      'sab.ac.lk',        // University of Sabaragamuwa
      'ou.ac.lk',         // Open University
      'nsbm.lk',          // NSBM
      'iit.ac.lk',        // IIT
      'sliit.lk',         // SLIIT
      'icbt.lk',          // ICBT
      'apiit.lk',         // APIIT
      'kdu.ac.lk',        // KDU
      'sltc.ac.lk',       // SLTC
      'sliate.ac.lk',     // SLIATE
      'vau.ac.lk',        // Vavuniya University
      'easternuni.ac.lk', // Eastern University
      'seu.ac.lk',        // South Eastern University
      'wayamba.ac.lk',    // Wayamba University
      'uwu.ac.lk',        // Uva Wellassa University
      'uom.lk',           // University of Moratuwa (alternative)
      'ucsc.cmb.ac.lk',   // UCSC
      'uok.ac.lk',        // University of Kelaniya
      'uoc.ac.lk',        // University of Colombo (alternative)
      'uop.ac.lk',        // University of Peradeniya (alternative)
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return universityDomains.includes(domain);
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      // Check if email is from a university domain
      if (!this.isUniversityEmail(email)) {
        return {
          success: false,
          error: 'Please use your university email address'
        };
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Sign out
  static async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  static getCurrentUser() {
    return auth.currentUser;
  }
}
