export interface LoginApiResponse {
  data: {
    token: string;
    expirationDate: string;
  };
  success: boolean;
  errorMessage: string;
}

export interface RegisterRequestBody {
  documentNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  documentType: string;
  age: string;
  confirmPassword: string;
}

export interface ResetPasswordRequestBody {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
  email: string;
}

export interface ChangePasswordRequestBody {
  email: string;
  oldPassword: string;
  newPassword: string;
}