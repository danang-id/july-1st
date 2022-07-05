enum AuthenticationError {
	NotInitialized = "BirthdayValidationError:Client:NotInitialized",
	ClientError = "BirthdayValidationError:Client:ClientError",
	MethodNotAllowed = "BirthdayValidationError:Server:MethodNotAllowed",
	MalformedRequest = "BirthdayValidationError:Server:MalformedRequest",
	InvalidBirthday = "BirthdayValidationError:Server:InvalidBirthday",
	InvalidPasscode = "BirthdayValidationError:Server:InvalidPasscode",
}

export default AuthenticationError
