import 'dotenv/config'

import { InvalidEmailError, WrongPasswordError } from '@romain-faust/errors'
import type { SignInWithEmailAndPassword } from '@romain-faust/sign-in-with-email-and-password'
import { deleteApp, type FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { buildSignInWithEmailAndPassword } from './sign-in-with-email-and-password'

const TEST_ACCOUNT_EMAIL = process.env.TEST_ACCOUNT_EMAIL
const TEST_ACCOUNT_PASSWORD = process.env.TEST_ACCOUNT_PASSWORD
const TEST_API_KEY = process.env.TEST_API_KEY

describe('uploadFile()', () => {
	let app: FirebaseApp
	let signInWithEmailAndPassword: SignInWithEmailAndPassword

	beforeAll(() => {
		app = initializeApp({
			apiKey: TEST_API_KEY,
		})
		signInWithEmailAndPassword = buildSignInWithEmailAndPassword(
			getAuth(app),
		)
	})

	afterAll(() => {
		deleteApp(app)
	})

	it('should connect the user using the given email/password credentials', (done) => {
		const nextSpy = jest.fn()

		signInWithEmailAndPassword(
			TEST_ACCOUNT_EMAIL,
			TEST_ACCOUNT_PASSWORD,
		).subscribe({
			next: nextSpy,
			error: (error) => {
				done(error)
			},
			complete: () => {
				expect(nextSpy).toHaveBeenCalledTimes(1)

				done()
			},
		})
	})

	it('should throw an `InvalidEmailError` error if the email is invalid', (done) => {
		const nextSpy = jest.fn()

		signInWithEmailAndPassword(
			'invalid_email',
			'invalid_password',
		).subscribe({
			next: nextSpy,
			error: (error) => {
				expect(nextSpy).not.toHaveBeenCalled()
				expect(error).toBeInstanceOf(InvalidEmailError)

				done()
			},
			complete: () => {
				done('Expected an `InvalidEmailError` error')
			},
		})
	})

	it('should throw a `WrongPasswordError` error if the password is invalid', (done) => {
		const nextSpy = jest.fn()

		signInWithEmailAndPassword(
			TEST_ACCOUNT_EMAIL,
			'invalid_password',
		).subscribe({
			next: nextSpy,
			error: (error) => {
				expect(nextSpy).not.toHaveBeenCalled()
				expect(error).toBeInstanceOf(WrongPasswordError)

				done()
			},
			complete: () => {
				done('Expected a `WrongPasswordError` error')
			},
		})
	})
})
