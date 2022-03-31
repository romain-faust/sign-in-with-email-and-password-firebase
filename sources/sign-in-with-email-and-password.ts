import {
	InvalidEmailError,
	NetworkError,
	NotFoundError,
	QuotaError,
	TimeoutError,
	UnknownError,
	WrongPasswordError,
} from '@romain-faust/errors'
import type { SignInWithEmailAndPassword } from '@romain-faust/sign-in-with-email-and-password'
import {
	type Auth as FirebaseAuth,
	AuthErrorCodes,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth'
import { catchError, defer, map, throwError } from 'rxjs'

export function buildSignInWithEmailAndPassword(
	auth: FirebaseAuth,
): SignInWithEmailAndPassword {
	return function signInWithEmailAndPassword(email, password) {
		return defer(() => {
			return firebaseSignInWithEmailAndPassword(auth, email, password)
		}).pipe(
			map(() => undefined),
			catchError((error) => {
				switch (error.code) {
					case AuthErrorCodes.INVALID_EMAIL:
						return throwError(() => new InvalidEmailError())
					case AuthErrorCodes.INVALID_PASSWORD:
						return throwError(() => new WrongPasswordError())
					case AuthErrorCodes.NETWORK_REQUEST_FAILED:
						return throwError(() => new NetworkError())
					case AuthErrorCodes.QUOTA_EXCEEDED:
						return throwError(() => new QuotaError())
					case AuthErrorCodes.TIMEOUT:
						return throwError(() => new TimeoutError())
					case AuthErrorCodes.USER_DELETED:
						return throwError(() => new NotFoundError())
				}

				return throwError(() => new UnknownError(error))
			}),
		)
	}
}
